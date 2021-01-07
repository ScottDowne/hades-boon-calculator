import boons from './data/boons.json';
const NUM_EXTRA_BOONS = 16;

// Initial state is almost always hydrated from data and query params.
// So I don't see the need in having an empty initial state.
// If there are no query params, hydratedState is essentially initial state anyway
// as it is in the initial state would would have set if we had an initial state.
// I see this as currently the most straight forward way to sync our data with query params.
// If the app becomes more complex, this may change, requiring something like React Router.
const initialState = {
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

// Add in empty generic boon positions.
for (let step = 1; step <= NUM_EXTRA_BOONS; step++) {
  initialState.App.boons[`boon${step}`] = null;
}

const hydratedState = initialState.App;
const initialParams = new URLSearchParams(window.location.search);

for (let [key, val] of initialParams.entries()) {
  const boon = boons.data.find(item => item.name === val);
  if (boon) {
    hydratedState.boons[key] = boon;
  }
}

export default {App: hydratedState};
