import React from 'react';
import {
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import braintree from 'braintree-web-drop-in';
import BraintreeDropin from 'braintree-dropin-react';
import BraintreeSubmitButton from './BraintreeSubmitButton';
import { Redirect } from 'react-router-dom';

class BraintreeDrop extends React.Component {
  state = { 
    loaded: false, 
    token: '' ,
    redirect: false,
    transactionID: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;

    axios.get('/api/braintree_token')
      .then( ({ data: token, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ token, loaded: true })
      })
      .catch( ({ headers }) => {
        dispatch(setHeaders(headers))
        dispatch(setFlash('Bad Stuff!', 'red'))
      })
  }

  handlePaymentMethod = (payload) => {
    const { dispatch, amount } = this.props;
    axios.post('/api/payment', { amount, ...payload } )
      .then( ({ data: transactionID, headers }) => {
        dispatch(setHeaders(headers));
        this.setState({ transactionID, redirect: true })
      })
  }

  render() {
    const { 
      loaded, 
      token,
      redirect, 
      transactionID, 
    } = this.state;

    if (redirect)
    return (
      <Redirect to={{ 
        pathname: '/payment_success',
        state: { amount: this.props.amount, transactionID}
        }}
      />
    )

    if (loaded)
      return (
        <Segment basic textAlign="center">
          <BraintreeDropin
            braintree={braintree}
            authorizationToken={token}
            handlePaymentMethod={this.handlePaymentMethod}
            renderSubmitButton={BraintreeSubmitButton}
          />
        </Segment>
      )
    else
      return (
        <Dimmer active>
          <Loader>
            Loading payment experience...
          </Loader>
        </Dimmer>
      )
  }
}

export default connect()(BraintreeDrop);