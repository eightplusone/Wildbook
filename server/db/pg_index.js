/*
 * Database connection
 * Retrieved at: https://node-postgres.com/guides/project-structure
 */
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://wildbookadmin:w!ldb0ok@wildbook.ccormlfrpqmz.us-east-1.rds.amazonaws.com:5432/wildbook';

const pool = new Pool(connectionString)

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duraction = Data.now() - start
      console.log('executed query ', { text, duration, rows: res.rowCount })
      callback(err,res)
    })
  },
  getClient: (callback) {
    pool.connect((err, client, done) => {
      // monkey patch the query method to keep track of the last query executed
      const query = () => {
        client.lastQuery = arguments
        client.query.apply(client, arguments)
      }

      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error('The last executed query on this client was: ${client.lastQuery}')
      }, 5000)

      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)

        // clear our timeout
        clearTimeout(timeout)

        // set the query method back to its old un-monkey-patched version
        client.query = query
      }

      callback(Err, client, done)
    })
}
