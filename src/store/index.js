import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // middleware и devTools автоматически настраиваются Redux Toolkit,
  // но вы можете настроить их, если нужно
});

export default store;
