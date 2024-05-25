// create and export middleware function here

export const loggerMiddleware = (store) => {
  return function (next) {
    return function (action) {
      console.log('[LOG]: ', action.type);
      next(action);
      console.log(store.getState());
    };
  };
};
