import web3 from './web3';
import TokenFactory from './build/TokenFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(TokenFactory.interface),
    '0x3E1630205f6f551F3afA4B6f4445e5566e5829bB'
);

export default instance;