import {check} from 'meteor/check';

export default function ({Collections, Meteor}) {
  Meteor.methods({
    'leads.create'(_id, eMail) {
      check(_id, String);
      check(eMail, String);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const confirmedAt = null;
      const lead = {
        _id, eMail, createdAt, confirmedAt,
        saving: true
      };
      Collections.Leads.insert(lead);
    }
  });
}
