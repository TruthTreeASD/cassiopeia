import React from 'react';
import { shallow } from 'enzyme';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Home from '../../components/Explore/Home';
import LeftSideBar from '../../components/Explore/LeftSideBar';
import DisplayComponent from '../../components/Explore/DisplayComponent';
import Filters from '../../components/Explore/AttributeRange';
import YearSelector from '../../components/Explore/YearSelector';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  configure({ adapter: new Adapter() });
  let props = { params: { level: 'State' } };
  shallow(<Home match={props} />);
});

it('should have a container component with the following properties', () => {
  let props = { params: { level: 'State' } };
  const home = shallow(<Home match={props} />);
  expect(home.length).toEqual(1);
  //expect(home.name()).toEqual('Container');
  //expect(home.props().fluid).toEqual(true);
  //expect(home.children().matchesElement(<Row />));
});

// it('should have a leftsidebar and a div with all other components', () => {
//   let props = { params: { level: 'State' } };
//   const home = shallow(<Home match={props} />);
//   let row = home.find(Row);
//   expect(
//     row
//       .first()
//       .childAt(0)
//       .matchesElement(<LeftSideBar />)
//   );
//   expect(
//     row
//       .first()
//       .childAt(1)
//       .matchesElement(<div />)
//   );
//   expect(
//     row
//       .first()
//       .childAt(1)
//       .hasClass('align-items-center')
//   );
//   expect(
//     row
//       .first()
//       .childAt(1)
//       .hasClass('col-md-10')
//   );
//   expect(
//     row
//       .first()
//       .childAt(1)
//       .hasClass('col-12 ')
//   );
// });

// it('should have all other components in main div', () => {
//   let props = { params: { level: 'State' } };
//   const home = shallow(<Home match={props} />);
//   let mainDiv = home
//     .find(Row)
//     .first()
//     .childAt(1);
//   expect(mainDiv.children().length).toEqual(3);
//   expect(mainDiv.childAt(0).matchesElement(<Card />));
//   expect(mainDiv.childAt(1).matchesElement(<Card />));
// });

/* Commenting it for now, working on time series. Will update test once the component is completed
it('should have the display component as first card', () => {
  let props = { params: { level: 'State', id: 1 } };
  const home = shallow(<Home match={props} />);
  let card = home.find(Card).first();
  expect(card.children().length).toEqual(1);
  expect(card.children().matchesElement(<DisplayComponent />));
  expect(card.children().props().id).toEqual(1);
  expect(card.children().props().level).toEqual('State');
});
*/

// it('should have the display component details as second card', () => {
//   let props = { params: { level: 'State', id: 1, name: 'myName' } };
//   const home = shallow(<Home match={props} />);
//   let card = home.find(Card).last();
//   expect(card.children().length).toEqual(2);
//   expect(card.childAt(0).matchesElement(<CardHeader />));
//   expect(card.childAt(0).children().length).toEqual(1);
//   expect(
//     card
//       .childAt(0)
//       .children()
//       .props().children[0]
//   ).toEqual('Selected Location: ');
//   expect(
//     card
//       .childAt(0)
//       .children()
//       .props().children[1]
//   ).toEqual(<b>myName</b>);
//   expect(card.childAt(1).matchesElement(<CardBody />));
//   expect(card.childAt(1).children().length).toEqual(1);
//   expect(
//     card
//       .childAt(1)
//       .childAt(0)
//       .matchesElement(<Row />)
//   );
// });

// it('should have the year and other details details as second card row content', () => {
//   let props = { params: { level: 'State', id: 1, name: 'myName' } };
//   const home = shallow(<Home match={props} />);
//   let cardBody = home.find(CardBody).find(Row);
//   expect(cardBody.children().length).toEqual(2);
//   expect(cardBody.childAt(0).matchesElement(<Col />));
//   expect(cardBody.childAt(0).hasClass('border-right'));
//   expect(cardBody.childAt(0).children().length).toEqual(1);
//   expect(
//     cardBody
//       .childAt(0)
//       .children()
//       .matchesElement(<Filters />)
//   );
//   expect(
//     cardBody
//       .childAt(0)
//       .children()
//       .props().level
//   ).toEqual('State');
//   expect(
//     cardBody
//       .childAt(0)
//       .children()
//       .props().location
//   ).toEqual('myName');
//   expect(
//     cardBody
//       .childAt(0)
//       .children()
//       .props().locationId
//   ).toEqual(1);
//   expect(cardBody.childAt(1).matchesElement(<Col />));
//   expect(cardBody.childAt(1).children().length).toEqual(1);
//   expect(
//     cardBody
//       .childAt(1)
//       .children()
//       .matchesElement(<YearSelector />)
//   );
//});
