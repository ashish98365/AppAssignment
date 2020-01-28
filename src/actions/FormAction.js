import * as SQLite from 'expo-sqlite';
import { FORM_FIELD_UPDATE, FORM_FIELD_ERROR, EMPLOYEE_CREATED } from '../utils';

import { NO_ERROR, TABLE_NAME, COLUMN_ID, COLUMN_NAME, COLUMN_DESIGNATION, 
    COLUMN_AGE } from '../utils/';

export const inputFieldUpdate = ({ prop, value }) => {
    return { 
        type: FORM_FIELD_UPDATE, 
        payload: { prop, value } 
    };
};

export const saveEmployeeDetail = ({ name, designation, age, navigationObj, navigateTo }) => dispatch => {

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

    const dbConn = SQLite.openDatabase('employee.db');
    const queryString = ` CREATE TABLE if not exists ${TABLE_NAME} (${COLUMN_ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${COLUMN_NAME} TEXT, ${COLUMN_DESIGNATION}  TEXT, ${COLUMN_AGE} INTEGER); `;
    dbConn.transaction(
        tx => {
            tx.executeSql(queryString);

            tx.executeSql(
                ` insert into ${TABLE_NAME} (${COLUMN_NAME}, ${COLUMN_DESIGNATION}, ${COLUMN_AGE}) values ( ?, ?, ? ) `,
                [name, designation, age],
                () => { 
                        dispatch({ type: EMPLOYEE_CREATED }); 
                        navigationObj(navigateTo, { toastMessage: 'Employee Detail added successfully' }); 
                },
                (t, error) => { console.log(error); }
            );
        }
    );
};
