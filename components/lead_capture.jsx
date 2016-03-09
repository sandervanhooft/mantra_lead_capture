import React from 'react';
import LeadList from '../containers/lead_list.js';

class LeadCapture extends React.Component {

  render() {
    const {error, formStatus} = this.props;
    // var formStatus = 'init';

    return (
      <div className="lead_capture">
          {error ? this._renderError(error) : null}
          <p>formStatus: {formStatus}</p>
          {formStatus === 'confirm' ? this._renderConfirmation() : this._renderEmailForm() }
        <LeadList />
      </div>
    );
  }

  _renderEmailForm() {
    return (
      <div className="lead_capture form">
        <input
          type='text'
          ref='eMail'
          placeholder='E-Mail'
        />
        <button onClick={this._signUp.bind(this)}>Sign up</button>
      </div>
    );
  }

  _renderConfirmation(eMail) {
    return (
      <div className='lead_capture confirmation'>
        Thank you for subscribing!
      </div>
    );
  }

  _renderError(error) {
    return (
      <div className='error'>
        {error}
      </div>
    );
  }

  _signUp() {

    const eMail = this.refs.eMail.value;
    const {create} = this.props;
    create(eMail);
    this.refs.eMail.value = ''; //TODO: prettify User experience
  }

}

export default LeadCapture;
