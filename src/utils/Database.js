import { SQLite } from 'expo';
import { DATABASE_NAME } from './src/utils';

module.exports = SQLite.openDatabase({ name: DATABASE_NAME });
