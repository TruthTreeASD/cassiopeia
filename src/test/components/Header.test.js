import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

it('renders without crashing', () => {
  configure({ adapter: new Adapter() });
  shallow(<Header />);
});

it('should have a navbar component with the following properties', () => {
  const header = shallow(<Header />);
  let navbar = header.find(Navbar);
  expect(navbar.length).toEqual(1);
  expect(navbar.props().expand).toEqual('md');
  expect(navbar.props().color).toEqual('light');
});

it('should have a navbarbrand component with the following properties', () => {
  const header = shallow(<Header />);
  let navbarbrand = header.find(NavbarBrand);
  expect(navbarbrand.length).toEqual(1);
  expect(navbarbrand.childAt(0).matchesElement(<Link to="/" />));
  expect(navbarbrand.props().children[1].trim()).toEqual('TruthTree');
});

it('should have a link component with the following properties', () => {
  const header = shallow(<Header />);
  let link = header.find(Link);
  expect(link.length).toEqual(1);
  expect(link.props().replace).toEqual(false);
  expect(link.props().to).toEqual('/');
  expect(link.children().matchesElement(<img />));
});

it('should have a img component with the following properties', () => {
  const header = shallow(<Header />);
  let img = header.find(Link).children();
  expect(img.length).toEqual(1);
  expect(img.props().alt).toEqual('TruthTree logo');
  expect(img.props().className).toEqual('d-inline-block');
  expect(img.props().src).toEqual('truthtree-logo.png');
});
