import React, { Component } from 'react';
import { Header, Segment, Input, Label, Divider, Image } from 'semantic-ui-react';
import BriantreeDrop from './BraintreeDrop';

class Home extends Component {
  state = { amount: 150.5 };

  render() {
    const { amount } = this.state;

    return (
      <Segment basic textAlign='center'>
        <Header as='h1' textAlign='center'>React Payments</Header>
        <Image centered size='small' src='http://www.homedeliveryscript.com/uploads/general-store.jpg' />
        <Label color='green'>Payment Amount</Label>
        <Input value={amount} disabled style={{ fontSize: '18px' }} />
        <Divider />
        <BriantreeDrop amount={amount} />
      </Segment>
    );
  }
}

export default Home;
