import at from './actions.js';

const INITIAL_STATE = {
  App: {
    boons: {}
  }
};

function App(prevState = INITIAL_STATE.App, action) {
  switch (action.type) {
    case at.ADD_BOON:
      const boons = prevState.boons;
      boons[action.data.position] = action.data.boon;
      return Object.assign({ ...prevState, boons });
    default:
      return prevState;
  }
}

export default {App};
