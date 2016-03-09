export default {
  create({Meteor, LocalState}, eMail) {
    LocalState.set('CREATE_LEAD_ERROR', null);
    if (!eMail) {
      LocalState.set('CREATE_LEAD_ERROR', 'Lead eMail is required.');
      return;
    }

    const id = Meteor.uuid();
    Meteor.call('leads.create', id, eMail, (err) => {
      if (err) {
        alert(`Lead creating failed: ${err.message}`);
      }
      else {
        LocalState.set('FORM_STATUS', 'confirm');
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('CREATE_LEAD_ERROR', null);
  }
};
