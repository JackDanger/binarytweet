// Flee the browser with an ultra-lightweight SQL ORM in Javscript

Johnson.require('johnson/browser')
Johnson.require('johnson/browser/jquery')

// Usually Flight is defined earlier on to give it configuration
var Flight = Flight || {}

$.extend(Flight,
  function(){

    var debug = function(){
      if(!Flight.debug) return
      for (var i=0;i<arguments.length;++i)
        Ruby.puts(arguments[i])
    }

    var config = (function(){

      if(!Johnson.environment) Johnson.environment = 'production'

      // The Flight.configuration must be either a javascript
      // object or the path to a file containing one
      // Format: {'environment_name':
      //            {'adapter': 'sqlite3',
      //             'database': 'db/my_db.sqlite'}
      //         }

      var json_config
      var parse_config = function(){
        if(!Flight.configuration)
          throw("Flight.configuration is not defined")

        if(json_config) return json_config
        json_config = 
          Flight.configuration && Flight.configuration.match(/\{|\}/) ?
            Flight.configuration : eval("("+Ruby.File.read(Flight.configuration)+")")
        return json_config
      }
      return {
        environment:  function(){return Johnson.environment},
        database:     function(){return parse_config()[Johnson.environment]['database']},
        adapter:      function(){return parse_config()[Johnson.environment]['adapter']}
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

      debug("Retrieving Schema for: "+model)
      var schema = connect(function(db){ return db.table_info(model) });
      var fields = []
      for (var row in schema) fields.push(row["name"])

      this.cachedFields[model] = fields
      return fields
    }

    var execute = function(sql){
      debug("SQL: \""+sql+"\"")
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
      return ret
    }

    var instantiateRecord = function(model, row){
      var record = {model: model, isFlightRecord: true}
      for(var i=0; i<row.length(); i++)
        record[fields(model)[i]] = row[i]

      return record
    }

    // return a public object
    return {
      execute:     execute,
      config:      config,

      create: function(model, attributes){
        execute("INSERT INTO `"+model+"` "
               +" (`"+keys(attributes).join('`, `')+"`) "
               +" VALUES (\""+values(attributes).join('", "')+"\")")
        return $.extend(attributes, {model: model, isFlightRecord: true})
      },

      find: function(model, attributes, limit){
        limit = limit ? ' LIMIT '+limit : ''
        instantiated = records(model, "SELECT * FROM `"+model+"` "+attributesToConditions(attributes)+limit)
        return instantiated.length ? instantiated : false
      }
    }

  }()
)
