require('dotenv').config();
export default {
    database: {
        host: process.env.HOSTNAME,
        user: /*process.env.USERNAME || */'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }

}