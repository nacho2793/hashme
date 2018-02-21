pragma solidity ^0.4.16;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract TokenERC20 {
    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 6;
    
    uint256 public totalSupply;
    uint256 public constant RATE = 18000;
    uint256 public constant eth_to_wei = 1000000000000000000;
    
    address public owner;
    address public CEO;
    
    uint public timeZero;
    uint public timeLapse;
    bool public allowToBuy;
    
    uint public raised;
    uint public periodsRetrieved=0;
    uint public retrieveAmount;
    address public token;

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    
    modifier protected() {
        require(msg.sender == owner);
        _;
    }
    modifier buy() {
        require(allowToBuy);
        _;
    }
    modifier timeRestricted() {
        uint timePassed = block.timestamp - timeZero;
        require(timePassed>=timeLapse);
        _;
    }
    

    function () payable {
        buyTokens();
    }

    function buyTokens() public buy payable {
        require(msg.value>0);
        uint tokens = (RATE * msg.value) / 1000000000000000000;
        allowToBuy(owner, msg.sender, tokens);
        transferFrom(owner, msg.sender, tokens);
        raised += msg.value;
    }
    
    function allowToBuy(address tokenHolder, address tokenBuyer, uint value) internal {
        require(balanceOf[tokenHolder]>=value);
        allowance[tokenHolder][tokenBuyer] = value;
    }
    
    function closeFundRaising(uint lapse) protected public {
        //require(lapse > 60);
        allowToBuy = false;
        uint commision = raised * 1/20;
        owner.transfer(commision);
        raised = raised *  19/20;
        retrieveAmount = raised * 1/12;
        timeZero = block.timestamp;
        timeLapse = lapse;
        totalSupply = uint256(totalSupply - balanceOf[owner]);
    }
    
    function retrieve()  public timeRestricted returns(uint) {
        uint timePassed = block.timestamp - timeZero;
        uint periods = timePassed / timeLapse;
        uint times = periods - periodsRetrieved;
        if (times>12-periodsRetrieved) {
            times = 12-periodsRetrieved;
        }
        require(times>0);
        periodsRetrieved += times;
        uint value = retrieveAmount * times;
        CEO.transfer(value);
    }
    
    
    // This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);

    /**
     * Constructor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    function TokenERC20(
        uint256 initialSupply,
        string tokenName,
        string tokenSymbol,
        address manager,
        address startupCEO
    ) public {                           
        owner = manager;            
        name = tokenName;                                  
        symbol = tokenSymbol; 
        allowToBuy = true;
        totalSupply = initialSupply * 10 ** uint256(decimals); 
        balanceOf[owner] = totalSupply;   
        CEO = startupCEO;
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != 0x0);
        // Check if the sender has enough
        require(balanceOf[_from] >= _value);
        // Check for overflows
        require(balanceOf[_to] + _value > balanceOf[_to]);
        // Save this for an assertion in the future
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        Transfer(_from, _to, _value);
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     * Transfer tokens
     *
     * Send `_value` tokens to `_to` from your account
     *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * Send `_value` tokens to `_to` on behalf of `_from`
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
        returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    /**
     * Set allowance for other address and notify
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf, and then ping the contract about it
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     * @param _extraData some extra information to send to the approved contract
     */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
        public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }



    /**
     * Destroy tokens
     *
     * Remove `_value` tokens from the system irreversibly
     *
     * @param _value the amount of money to burn
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        Burn(msg.sender, _value);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        Burn(_from, _value);
        return true;
    }
    
}

contract TokenFactory {
    address[] public tokens;
    function newToken(uint numberOfTokens, string coinName, string coinSymbol, string description, address CEO) public {
        address newCampaign = new TokenERC20(numberOfTokens, coinName, coinSymbol,  msg.sender, CEO);
        tokens.push(newCampaign);
    }
    function getTokensDeployed() public view returns (address[]){
        return tokens;
    }
}

