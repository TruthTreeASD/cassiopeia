import React from 'react';
import { shallow } from 'enzyme';
import YearSelector from '../../components/YearSelector';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  configure({ adapter: new Adapter() });
  shallow(<YearSelector />);
});
