import { combineReducers } from 'redux';
import counterReducer from './couterReducer'; // Обратите внимание на правильное написание имени файла

const rootReducer = combineReducers({
    counter: counterReducer
});

export default rootReducer;
