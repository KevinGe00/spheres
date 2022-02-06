import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  currentAccount: "",
  currentCollection: ""
});

export const setCurrentAccount = (acc) => {
  setGlobalState('currentAccount', acc);
};

export const setCurrentCollection = (col) => {
  setGlobalState('currentCollection', col);
};

export { useGlobalState };