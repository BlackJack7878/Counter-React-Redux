import React, { Component } from 'react';
import './Counter.css';

import {createStore} from 'redux';

const initialState = { count: 0 };

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'plus' : return { count: state.count + action.num };
    case 'minus' : return { count: state.count - action.num };
    case 'reset' : return { count: 0 };
    default: return { count: state.count };
  }
}

const store = createStore(reducer);

// Action Generators
function incrementAction(amount) {
  return { type: 'plus', num: amount };
}

function decrementAction(amount) {
  return { type: 'minus', num: amount };
}

function resetAction() {
  return { type: 'reset', num: 0 };
}

class Counter extends Component {

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increaseCount() {
    let amount = parseInt(this.refs.amount.value || 1);
    store.dispatch(incrementAction(amount));
  }

  decreaseCount() {
    let amount = parseInt(this.refs.amount.value || 1);
    store.dispatch(decrementAction(amount));
  }

  resetCount() {
    store.dispatch(resetAction());
  }

  render() {
    const count = store.getState().count;

    return (
      <div className="Counter">
        <div className="Counter-wrapper">
          <h1>{count}</h1>
          <div className="Counter-buttons">
            <div className="Counter-button" onClick={() => this.decreaseCount()}>-</div>
            <div className="Counter-button" onClick={() => this.increaseCount()}>+</div>
            <br/>
            <div className="Counter-button" onClick={() => this.resetCount()}>Reset</div>
          </div>

          <input type="number" defaultValue="1" ref="amount" />
        </div>
      </div>
    );
  }
}

export default Counter;
