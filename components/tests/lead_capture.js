const { describe, it } = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import LeadCapture from '../lead_capture.jsx';

describe('components.lead_capture', () => {
  it('should show the error if there are any', () => {
    const error = 'TheError';
    const el = shallow(<LeadCapture error={error} />);
    expect(el.html()).to.match(/TheError/);
  });

  it('should display the signup form', () => {
    const el = shallow(<LeadCapture />);
    const eMail = el.find('input').first();
    // const content = el.find('textarea').first();
    const button = el.find('button').first();

    expect(eMail.node.ref).to.be.equal('eMail');
    // expect(content.node.ref).to.be.equal('contentRef');
    expect(button.prop('onClick')).to.be.a('function');
  });

  it('should create a new lead when click on the button', done => {
    // const title = 'the-title';
    const eMail = 'the-eMail';

    const onCreate = (e) => {
      // expect(t).to.be.equal(title);
      expect(e).to.be.equal(eMail);
      done();
    };

    const el = shallow(<LeadCapture create={onCreate} />);
    const instance = el.instance();

    instance.refs = {
      eMailRef: {value: eMail}
    };

    el.find('button').simulate('click');
  });
});
