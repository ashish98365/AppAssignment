import { combineReducers } from 'redux';
import FormReducer from './FormReducer';
import ValidationReducer from './ValidationReducer';
import DetailReducer from './DetailReducer';

export default combineReducers({
    formReducer: FormReducer,
    validationError: ValidationReducer,
    employeeDetail: DetailReducer
});
