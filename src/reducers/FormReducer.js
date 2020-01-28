import { FORM_FIELD_UPDATE, EMPLOYEE_CREATED, EMPLOYEE_EDIT_FIELD } from '../utils';

const INITIAL_STATE = {
    id: '',
    name: '',
    designation: '',
    age: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORM_FIELD_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMPLOYEE_CREATED:
            return { ...state, ...INITIAL_STATE };
        case EMPLOYEE_EDIT_FIELD:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
