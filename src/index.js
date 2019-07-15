import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

function reducerCounter(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

function reducerName(state = { name: "", age: 0 }, action) {
  switch (action.type) {
    case "HANDLE_NAME_CHANGE":
      return {
        ...state,
        name: action.payload
      };
    case "HANDLE_AGE_CHANGE":
      return {
        ...state,
        age: action.payload
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducerCounter,
  reducerName
});

const INITIIAL_STATE = {};
const store = createStore(rootReducer, INITIIAL_STATE);

function App() {
  return (
    <div className="App">
      <Counter />
      <Name />
    </div>
  );
}

function Counter() {
  const dispatch = useDispatch();
  const { count, name } = useSelector(state => ({
    ...state.reducerCounter,
    ...state.reducerName
  }));
  function incrementCount() {
    dispatch({
      type: "INCREMENT_COUNT"
    });
  }
  function decrementCount() {
    dispatch({
      type: "DECREMENT_COUNT"
    });
  }
  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
      <div>Your name is: {name}</div>
    </>
  );
}

function Name() {
  const dispatch = useDispatch();
  function handleNameChange(event) {
    dispatch({
      type: "HANDLE_NAME_CHANGE",
      payload: event.target.value
    });
  }

  function handleAgeChange(event) {
    dispatch({
      type: "HANDLE_AGE_CHANGE",
      payload: event.target.value
    });
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="input your name"
          onChange={handleNameChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="input your age"
          onChange={handleAgeChange}
        />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
