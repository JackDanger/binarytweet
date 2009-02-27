
// Add the Johnson library root to LOAD_PATH so
// we can include fun parts when we want to
for (var dir in Ruby["$LOAD_PATH"])
  if(/johnson-[\d-\.]+\/lib$/.test(dir)) break
dir = dir.split('/'); dir.pop();
Ruby["$LOAD_PATH"].unshift(dir.join("/"))

// Adding the app root
Ruby["$LOAD_PATH"].unshift(Ruby.File.dirname(__FILE__))

Johnson.require('johnson/browser')
Johnson.require('johnson/browser/jquery')
Johnson.require('tojson')


Johnson.require('db/flight')
Flight.configuration = 'db/config.json'

// create the database file if it doesn't exist
if('sqlite3' == Flight.config.adapter())
  if(!Ruby.File.send("exists?",
                     Flight.config.database()
                    )){
  for each(line in Ruby.File.read('db/schema.sql').split(";"))
    Flight.execute(line)
}