import web3 from './web3';
import Token from './build/TokenERC20.json';

const instance = (address) => {
    new web3.eth.Contract(
        JSON.parse(Token.interface),
        address
    );
}

export default instance;