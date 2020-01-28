import { FORM_FIELD_ERROR, NO_ERROR } from '../utils';

const INITIAL_STATE = {
    nameError: '',
    designationError: '',
    ageError: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORM_FIELD_ERROR:
            return { ...INITIAL_STATE, [action.payload.prop]: action.payload.value };
        case NO_ERROR:
            return { ...INITIAL_STATE };
        default:
            return INITIAL_STATE;
    }
};
