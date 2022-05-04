import mysql from 'mysql2';
import keys from './keys';

const pool = mysql.createConnection(keys.database);

pool.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Connected to MYSQL");
    }
});

export default pool;
