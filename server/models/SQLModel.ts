const {Pool} = require('pg');

const PG_URI = 'postgres://xrrshibi:cS1MpjW4sXntSQmGb0Woa44EsdQ9zqeE@bubble.db.elephantsql.com/xrrshibi';

const pool = new Pool({
    connectionString: PG_URI,
});

module.exports = {
    query: (text:string, params:any, callback:any)=> {
        console.log('executed query', text);
        return pool.query(text, params, callback)
    }
}