import at from './actions.js';

// This keeps the URL search params in sync.
function insertUrlParam(key, value) {
  if (history.pushState) {
    let newurl = new URL(window.location);
    if (value) {
      newurl.searchParams.set(key, value);
    } else {
      newurl.searchParams.delete(key);
    }
    newurl = newurl.toString();
    window.history.pushState({path: newurl}, '', newurl);
  }
}

function syncParams({ getState }) {
  return next => action => {
    switch (action.type) {
      case at.ADD_BOON:
        insertUrlParam(action.data.position, action.data.boon?.name);
        break;
    }
    return next(action);
  }
}

export default syncParams;
