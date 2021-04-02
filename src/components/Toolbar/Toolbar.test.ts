import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Toolbar, { title } from './Toolbar';

configure({ adapter: new Adapter() });
const shallow = createShallow({ dive: true }); // Need this to handle components with Styles
describe('Toolbar component', () => {
  it('should render Toolbar component', () => {
    expect(shallow(<Toolbar />).exists()).toBe(true);
  });

  it('should display correct title', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find(Typography).text()).toBe(title);
  });

  it('should load home page when Home button or title is clicked', () => {
    delete window.location;
    window.location = { reload: jest.fn() };
    const spy = jest.spyOn(window.location, 'reload');

    const wrapper = shallow(<Toolbar />);

    wrapper.find('div').prop('onClick')();
    expect(spy).toHaveBeenCalled();
  });
});
