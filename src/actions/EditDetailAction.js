import * as SQLite from 'expo-sqlite';

import { NO_ERROR, EMPLOYEE_EDIT_FIELD, FORM_FIELD_ERROR, EMPLOYEE_CREATED, 
    TABLE_NAME, COLUMN_ID, 
    COLUMN_NAME, COLUMN_DESIGNATION, COLUMN_AGE
  } 
from '../utils/';

export const navigateToEditScreen = (employeeDetail, navigationObj, navigateTo) => dispatch => {
    const { id, name, designation, age } = employeeDetail;
    dispatch({ type: EMPLOYEE_EDIT_FIELD, payload: { id, name, designation, age: `${age}` } });
    navigationObj(navigateTo);
};

export const editEmployeeDetail = (employeeDetail, navigationObj, navigateTo) => dispatch => {
    const { id, name, designation, age } = employeeDetail;

    //Validation of fields
    if (!name) {
        dispatch({ type: FORM_FIELD_ERROR, payload: { prop: 'nameError', value: 'Name field is required' } });
        return;
    } else if (!designation) {
        dispatch({ type: FORM_FIELD_ERROR, payload: { prop: 'designationError', value: 'Designation field is required' } });
        return;
    } else if (!age) {
        dispatch({ type: FORM_FIELD_ERROR, payload: { prop: 'ageError', value: 'Age field is required' } });
        return;
    } else if (!/^\d+$/.test(age)) {
        dispatch({ type: FORM_FIELD_ERROR, payload: { prop: 'ageError', value: 'Age should only contain number' } });
        return;
    }
    
    dispatch({ type: NO_ERROR });
    const queryString = ` update ${TABLE_NAME} set ${COLUMN_NAME} = ?, ${COLUMN_DESIGNATION} = ?, ${COLUMN_AGE} = ? where ${COLUMN_ID} = ? `;
    const dbConn = SQLite.openDatabase('employee.db');
    dbConn.transaction(
        tx => {
            tx.executeSql(
                queryString,
                [name, designation, age, id],
                () => { 
                    dispatch({ type: EMPLOYEE_CREATED }); 
                    navigationObj(navigateTo, { toastMessage: 'Employee Detail edited successfully' }); 
                },
                (t, error) => { console.log(error); }
            );
        }
    );
};
