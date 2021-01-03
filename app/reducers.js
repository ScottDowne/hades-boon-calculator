import at from './actions.js';
import { combineReducers } from 'redux';

const NUM_EXTRA_BOONS = 16;

const INITIAL_STATE = {
  App: {
    boons: {
      // Hard code in static boon positions by type.
      attack: null,
      special: null,
      cast: null,
      dash: null,
      call: null
    }
  }
};

// Add in generic boon positions.
for (let step = 1; step <= NUM_EXTRA_BOONS; step++) {
  INITIAL_STATE.App.boons[`boon${step}`] = null;
}

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

export default combineReducers({App});
