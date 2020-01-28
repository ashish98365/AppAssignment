import * as SQLite from 'expo-sqlite';
import { EMPLOYEE_DETAILS, TABLE_NAME, COLUMN_ID } from '../utils/';

export const getEmployeeDetail = (id) => dispatch => {
    let queryString = ` select * from ${TABLE_NAME} where ${COLUMN_ID} = ${id} `;
    if (!id) {
        queryString = ` select * from ${TABLE_NAME} `;
    }

    const dbConn = SQLite.openDatabase('employee.db');
    dbConn.transaction(
        tx => {
            tx.executeSql(
                queryString,
                [],
                (_, { rows: { _array } }) => {
                    dispatch({ type: EMPLOYEE_DETAILS, payload: _array });
                }
            );
        }
    );
};
