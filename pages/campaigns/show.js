import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const accounts = await web3.eth.getAccounts();
        const balance = await campaign.methods.balanceOf(accounts[0]).call();
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            name: summary[0],
            symbol: summary[1],
            rate: summary[2],
            description: summary[3],
            balance: balance
        };
    }

    renderCards() {
        const {
            name, symbol, address, description, balance
        } = this.props;
        const items = [
            {
                header: name + ' ( '+ symbol + ' )',
                meta: address,
                description: description,
                extra: "You have "+balance+symbol+" in your account.",
                style: { overflowWrap: 'break-word'}
            }
        ];
        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;