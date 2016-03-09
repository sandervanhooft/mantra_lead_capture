const { describe, it } = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../lead_list';

describe('containers.lead_list', () => {
  describe('composer', () => {
    it('should subscribe to leads.list', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});

      const context = () => ({Meteor});
      const onData = spy();

      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'leads.list'
      ]);
    });

    describe('after subscribed', () => {
      it('should fetch data from all leads & pass to onData', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});

        const leads = [ {_id: 'aa'} ];
        const Collections = {Leads: {find: stub()}};
        Collections.Leads.find.returns({fetch: () => leads});

        const context = () => ({Meteor, Collections});
        const onData = spy();

        composer({context}, onData);
        expect(onData.args[0]).to.deep.equal([ null, {leads} ]);
      });
    });
  });
});
