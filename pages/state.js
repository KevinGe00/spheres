import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  currentAccount: "",
});

export const setCurrentAccount = (acc) => {
  setGlobalState('currentAccount', acc);
};

export { useGlobalState };