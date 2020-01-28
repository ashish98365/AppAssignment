import { EMPLOYEE_DETAILS } from '../utils/';

const INITIAL_STATE = {
    employeeDetail: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_DETAILS:
            return { ...state, employeeDetail: action.payload };
        default:
            return state;
    }
};
