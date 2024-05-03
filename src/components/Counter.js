// src/components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../store/actions';

function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
    </div>
  );
}

export default Counter;
