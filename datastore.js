Ruby.require('rubygems')
Ruby.require('sqlite3')


var Record = (function(){

  var db_file = ('test' == Johnson.environment) ? 'sqlite.test.db' : 'sqlite.web.db'

  var connect = function(fn){
    var db = Ruby.SQLite3.Database.new(db_file)
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


  var publicObject = {

    create: function(model, attributes){
      return execute("INSERT INTO `"+model+"` "
                     +" (`"+keys(attributes).join('`, `')+"`) "
                     +" VALUES (\""+values(attributes).join('", "')+"\")")
    },

    find: function(model, attributes){
      return records(model, "SELECT * FROM `"+model+"` "+attributesToConditions(attributes)+" LIMIT 1")
    }
  }

  // create the database file if it doesn't exist
  if(!Ruby.File.send("exists?", db_file)){
    execute("create table users (name varchar(36) not null primary key)")
    execute("create table tweets (text varchar(140) not null primary key"
                              + ", user varchar(36) not null)")
  }

  return publicObject;

})()

