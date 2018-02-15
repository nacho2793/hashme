import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import campaign from "../ethereum/campaign";

class CampaignIndex extends Component {
    static async getInitialProps() {
        let info = [];
        let _campaign = {};
        let extra;
        const campaigns = await factory.methods.getTokensDeployed().call();
        const promises = campaigns.map(async (address) => {
            const info = await campaign(address).methods.getSummary().call();
            return {
                address: address,
                name: info[0],
                symbol: info[1]
            }
        });
        return Promise.all(promises);
    }

    renderCampaigns() {
        let campaigns = [];
        let nCampaigns = 0;
        let valid = true;
        const props = this.props;
        while(valid){
            if(props[nCampaigns]){
                campaigns.push(props[nCampaigns]);
                nCampaigns+=1;
            }else{
                valid=false;
            }
        }
        const items = campaigns.map((_campaign) => {
            if(!_campaign.address){
                return null;
            }
            return {
                header: _campaign.name,
                description: (
                    <Link route={`/campaigns/${_campaign.address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });
        return <Card.Group items={items} />
    }


    render() {
        return(
            <Layout>
                <div>

                    <h3>ICOs available</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                floated="right"
                                content="Create ICO Campaign"
                                icon="add circle"
                                primary
                            />
                        </a>
                    </Link>
                    { this.renderCampaigns() }

                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;