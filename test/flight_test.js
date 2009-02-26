Johnson.require("test_helper")

// rollback transactions in this test
function transaction(fn){
  // FIXME: why doesn't this work?  Sqlite3 simply isn't rolling back }:(
  // Flight.connect(function(db){
  //   db.transaction()
  //   fn(db)
  //   db.rollback()
  // })

  // POOR MAN'S TRANSACTIONS
  Ruby.require('fileutils')
  Ruby.FileUtils.cp(Flight.config.database(), Flight.config.database()+'original')
  ret = fn()
  Ruby.FileUtils.mv(Flight.config.database()+'original', Flight.config.database())
  return ret
}

jspec.describe("Flight", function() {

  Johnson.require("init");

  it("loads Flight", function() {
    expect(Flight.create).to("have_constructor", Function);
  });

  it("loads Flight config environment", function(){
    expect('test').to("==", Flight.config.environment())
  })

  it("loads Flight config database", function(){
    expect('sqlite.test.db').to("==", Flight.config.database())
  })

  jspec.describe("creating records", function(){

    it("should save a new user record", function(){
      transaction(function(){
        Flight.create('users', {name: 'BruceCampbell'})
        expect("BruceCampbell").to("==", Flight.find('users')[0].name)
      })
    })

    it("should not save a user record if name is missing", function(){
      transaction(function(){
        try{Flight.create('users')}
        catch(err){
          expect("SQLite3::SQLException").to("==", err.class().toString())
        }
      })
    })
  })

  jspec.describe("finding records", function(){

    var setup = function(){
      Flight.create('users',  {name: 'harmony'})
      Flight.create('tweets', {user: 'harmony', text: 'I love waffles'})
      Flight.create('tweets', {user: 'harmony', text: "what's Javascript?"})
    }

    it("should find all records by default", function(){
      transaction(function(){
        setup()
        records = Flight.find('tweets')
        expect(2).to("==", records.length)
      })
    })

    it("should understand conditions", function(){
      transaction(function(){
        setup()
        records = Flight.find('tweets', {text: "I love waffles"})
        expect(1).to("==", records.length)
      })
    })

    it("should understand complex conditions", function(){
      transaction(function(){
        setup()
        records = Flight.find('tweets', {user: 'harmony', text: "what's Javascript?"})
        expect(1).to("==", records.length)
      })
    })

  })
});
