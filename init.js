
Johnson.require('johnson/browser')
Johnson.require('johnson/browser/jquery')
Johnson.require('tojson')

Johnson.require('db/flight')
Flight.configuration = 'db/config.json'
// create the database file if it doesn't exist
if('sqlite3' == Flight.config.adapter()
   &&  !Ruby.File.send(
         "exists?",
         Flight.config.database()
       ))
  Flight.execute(Ruby.File.read('db/schema.sql'))

