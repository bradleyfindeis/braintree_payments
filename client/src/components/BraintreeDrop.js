import React from 'react';
import {
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import braintree from 'braintree-web-drop-in';
import BraintreeDropin from 'braintree-dropin-react';
import BraintreeSubmitButton from './BraintreeSubmitButton';
import axios from 'axios'

class BraintreeDrop extends React.Component {
  state = { loaded: false, token: '' }

  handlePaymentMethod = (payload) => {
    debugger
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
        dispatch(setFlash('BadStuff!', 'red'))
      })
  }

  render() {
    const { loaded, token } = this.state;

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