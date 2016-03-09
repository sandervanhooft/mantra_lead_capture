const { describe, it } = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../leads';

describe('actions.leads', () => {
  describe('create', () => {
    it('should reject if eMail is not there', () => {
      const LocalState = {set: spy()};
      actions.create({LocalState}, null, 'eMail');
      const args = LocalState.set.args[0];

      // expect(args[0]).to.be.equal('SAVING_ERROR');
      expect(args[0]).to.be.equal('CREATE_LEAD_ERROR');
      expect(args[1]).to.match(/required/);
    });

    // it('should clear older LocalState for SAVING_ERROR', () => {
    it('should clear older LocalState for CREATE_LEAD_ERROR', () => {
      const Meteor = {uuid: spy(), call: spy()};
      const LocalState = {set: spy()};
      const FlowRouter = {go: spy()};

      actions.create({LocalState, Meteor, FlowRouter}, 'e');
      expect(LocalState.set.args[0]).to.deep.equal([ 'CREATE_LEAD_ERROR', null ]);
    });

    it('should call Meteor.call to save the post', () => {
      const Meteor = {uuid: () => 'id', call: spy()};
      const LocalState = {set: spy()};
      const FlowRouter = {go: spy()};

      actions.create({LocalState, Meteor, FlowRouter}, 'e');
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs.slice(0, 4)).to.deep.equal([
        'leads.create', 'id', 'e'
      ]);
      expect(methodArgs[4]).to.be.a('function');
    });

    // it('should redirect user to the post', () => {
    //   const id = 'dsds';
    //   const Meteor = {uuid: () => id, call: stub()};
    //   const LocalState = {set: spy()};
    //   const FlowRouter = {go: spy()};
    //   Meteor.call.callsArg(4);
    //
    //   actions.create({Meteor, LocalState, FlowRouter}, 't', 'c');
    //   expect(FlowRouter.go.args[0][0]).to.be.equal(`/post/${id}`);
    // });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CREATE_LEAD_ERROR with the error message', () => {
        // it('should set SAVING_ERROR with the error message', () => {
          const Meteor = {uuid: () => 'id', call: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: spy()};
          const err = {message: 'Oops'};
          Meteor.call.callsArgWith(4, err);

          actions.create({Meteor, LocalState, FlowRouter}, 'e');
          expect(LocalState.set.args[1]).to.deep.equal([ 'CREATE_LEAD_ERROR', err.message ]);
          // expect(LocalState.set.args[1]).to.deep.equal([ 'SAVING_ERROR', err.message ]);
        });
      });
    });
  });

  describe('clearErrors', () => {
    it('should clear CREATE_LEAD_ERROR local state', () => {
    // it('should clear SAVING_ERROR local state', () => {
      const LocalState = {set: spy()};
      actions.clearErrors({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'CREATE_LEAD_ERROR', null ]);
    });
  });
});
