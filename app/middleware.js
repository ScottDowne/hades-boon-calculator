import at from './actions.js';

// This keeps the URL search params in sync.
function insertUrlParam(key, value) {
  if (history.pushState) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
  }
}

function syncParams({ getState }) {
  return next => action => {
    switch (action.type) {
      case at.ADD_BOON:
        insertUrlParam(action.data.position, action.data.boon.name);
        break;
    }
    return next(action);
  }
}

export default syncParams;
