// Flee the browser with an ultra-lightweight SQL ORM in Javscript

Johnson.require('johnson/browser')
Johnson.require('johnson/browser/jquery')

// Usually Flight is defined earlier on to give it configuration
var Flight = Flight || {}

$.extend(Flight,
  function(){

    var config = (function(){

      if(!Johnson.environment) Johnson.environment = 'production'

      // The Flight.configuration must be either a javascript
      // object or the path to a file containing one
      // Format: {'environment_name':
      //            {'adapter': 'sqlite3',
      //             'database': 'my_db.sqlite'}
      //         }

      if(!Flight.configuration)
        throw("Flight.configuration is not defined")

      var json_config =
        Flight.configuration && Flight.configuration.match(/\{|\}/) ?
          Flight.configuration : eval("("+Ruby.File.read(Flight.configuration)+")")
      return {
        database: function(){return json_config[Johnson.environment]['database']},
        adapter:  function(){return json_config[Johnson.environment]['adapter']}
      }
    })()

    var connect = function(fn){
      if('sqlite3' == config.adapter()) return connect_sqlite3(fn);
    }

    var connect_sqlite3 = function(fn){
      Ruby.require('rubygems')
      Ruby.require('sqlite3')
      var db = Ruby.SQLite3.Database.new(config.database())
      result = fn(db)
      db.close()
      return result;
    }

    var fields = function(model){
      if(!this.cachedFields) this.cachedFields = {}
      if(this.cachedFields[model])
        return this.cachedFields[model]

      var schema = connect(function(db){ return db.table_info(model) });
      var fields = []
      for (var row in schema) fields.push(row["name"])

      this.cachedFields[model] = fields
      return fields
    }

    var execute = function(sql){
      Ruby.puts("SQL: \""+sql+"\"")
      return connect(function(db){
        return db.execute(sql)
      })
    }

    var keys = function(obj){
      var arr = []; for(var k in obj){arr.push(k)}; return arr;
    }

    var values = function(obj){
      var arr = []; for(var k in obj){arr.push(obj[k])}; return arr;
    }

    var attributesToConditions = function(attributes){
      var conditions = []
      var where = ''
      for(var key in attributes){
        where = ' WHERE '
        conditions.push("`"+key+"` = \""+attributes[key]+"\"")
      }
      return where+conditions.join(" AND ")
    }

    var records = function(model, sql){
      ret = []
      for(var row in execute(sql))
        ret.push(instantiateRecord(model, row))
      return ret;
    }

    var instantiateRecord = function(model, row){
      var record = {}
      for(var i=0; i<row.length(); i++)
        record[fields(model)[i]] = row[i]

      return record
    }

    // create the database file if it doesn't exist
    if('sqlite3' == config.adapter())
      if(!Ruby.File.send("exists?", config.database()))
        execute(Ruby.File.read('schema.sql'))

    // return a public object
    return {
      config: config,

      create: function(model, attributes){
        return execute("INSERT INTO `"+model+"` "
                       +" (`"+keys(attributes).join('`, `')+"`) "
                       +" VALUES (\""+values(attributes).join('", "')+"\")")
      },

      find: function(model, attributes){
        return records(model, "SELECT * FROM `"+model+"` "+attributesToConditions(attributes)+" LIMIT 1")
      }
    }

  }()
)