import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xd040DBCDE1BF46d8a44d4E0BE76b28f83E835D34'
);

export default instance;