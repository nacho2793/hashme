import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import campaign from "../ethereum/campaign";

class CampaignIndex extends Component {
    static async getInitialProps() {
        let camp = [];
        const campaigns = await factory.methods.getTokensDeployed().call();
        console.log(campaigns);
        return {campaigns};
    }
    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
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