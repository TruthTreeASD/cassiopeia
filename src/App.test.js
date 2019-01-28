import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  configure({ adapter: new Adapter() });
  shallow(<App />);
});
