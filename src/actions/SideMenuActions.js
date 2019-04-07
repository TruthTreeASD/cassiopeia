export const setSideMenuState = state => {
  return {
    type: 'SIDEMENU_SET_STATE',
    payload: state
  };
};

export const openSideMenu = () => {
  return {
    type: 'SIDEMENU_OPEN'
  };
};

export const closeSideMenu = () => {
  return {
    type: 'SIDEMENU_CLOSE'
  };
};
