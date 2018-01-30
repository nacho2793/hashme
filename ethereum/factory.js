import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xeCAB4A42a016ed1bC3FC62fDd160305d1246C08A'
);

export default instance;