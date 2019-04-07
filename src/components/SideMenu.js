import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';

import StoryCreationForm from './Stories/StoryCreationForm';

import '../styles/SideMenu.scss';

class SideMenu extends Component {
  state = {
    size: 50,
    windowWidth: 0
  };

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleStateChange = state => {
    this.setState({ size: this.state.size + 5 });
    this.props.dispatch({
      type: 'SIDEMENU_SET_STATE',
      payload: state.isOpen
    });
  };

  render() {
    const { windowWidth } = this.state;
    const width = windowWidth > 675 ? '60%' : '90%';
    return (
      <Menu
        isOpen={this.props.isOpen}
        customBurgerIcon={false}
        right
        onStateChange={state => this.handleStateChange(state)}
        width={width}
      >
        <StoryCreationForm />
      </Menu>
    );
  }
}

const mapStateToProps = store => ({
  isOpen: store.SideMenuReducer.isOpen
});

export default connect(mapStateToProps)(SideMenu);
