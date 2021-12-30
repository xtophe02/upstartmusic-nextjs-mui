import { useReducer, useContext, createContext } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

const initValues = {
  page: 1,
  sort: 'name',
  order: '1',
  age: [0, 50],
  yearsActive: [0, 50],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'PAGE':
      return { ...state, page: action.payload };
    case 'SORT':
      return { ...state, sort: action.payload };
    case 'ORDER':
      return { ...state, order: action.payload };
    case 'AGE':
      return { ...state, age: action.payload };
    case 'YEARS_ACTIVE':
      return { ...state, yearsActive: action.payload };
    case 'CLEAR': {
      return initValues;
    }
    case 'SLIDER_FILTER':
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initValues);
  // console.log('CONTEXT', state);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useDispatchContext = () => useContext(DispatchContext);
