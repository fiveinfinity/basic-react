const reducers = (state = {}, action) => {
  switch (action.type) {
    case 'GENERIC_ACTION':
      return {...state, ...action.data}
    default:
      return state
  }
}

export const reducer = (state, action) => {
  if (action.type === 'RESET') state = {};
  return reducers(state, action);
}