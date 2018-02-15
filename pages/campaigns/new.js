import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Grid, TextArea } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        name: '',
        symbol: '',
        tokens: 0,
        description: '',
        errorMessage: '',
        loading: false
    };
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true, errorMessage:''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .newToken(this.state.tokens, this.state.name, this.state.symbol, this.state.description)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false});
    };

    render() {
        return(
            <Layout>
                <h3>Create a ICO Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <Grid divided='vertically'>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <label>Number of tokens (millions)</label>
                                    <Input
                                        type="number"
                                        value={this.state.tokens}
                                        onChange={event=> this.setState({tokens:event.target.value})}
                                    />
                                    <label>Tokens: {this.state.tokens*1000000} {this.state.symbol}</label>
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Token name</label>
                                    <Input
                                        value={this.state.name}
                                        onChange={event=> this.setState({name:event.target.value})}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Token Symbol</label>
                                    <Input
                                        value={this.state.symbol}
                                        onChange={event=> this.setState({symbol:event.target.value})}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <label>Description</label>
                                    <TextArea
                                        placeholder='Tell us about what you are raising for...'
                                        value={this.state.description}
                                        onChange={event=> this.setState({description:event.target.value})}
                                        style={{ minHeight: 100 }} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form.Field>
                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;