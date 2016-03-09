import Component from '../components/lead_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('leads.list').ready()) {
    const leads = Collections.Leads.find().fetch();
    onData(null, {leads});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component);
