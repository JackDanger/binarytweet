Johnson.require(Ruby.File.dirname(__FILE__)+"/test_helper")

Flight.debug = false

// rollback transactions in this test
function transaction(fn){
  // FIXME: why doesn't this work?  Sqlite3 simply isn't rolling back }:(
  // Flight.connect(function(db){
  //   db.transaction()
  //   try{
  //     fn(db)
  //   }catch(err){
  //     jspec.logger(jspec.FAILURE, err + ' (ERROR) ')
  //   }
  //   db.rollback()
  // })

  // POOR MAN'S TRANSACTIONS
  Ruby.require('fileutils')
  Ruby.FileUtils.cp(Flight.config.database(), Flight.config.database()+'original')

  try{
    ret = fn()
  }catch(err){
    jspec.logger(jspec.FAILURE, err.toString() + ' (ERROR) ')
    // throw(err)
  }

  Ruby.FileUtils.mv(Flight.config.database()+'original', Flight.config.database())
  return ret
}

jspec.describe("TESTING Flight", function() {

  it("loads Flight", function() {
    expect(Flight.create).to("have_constructor", Function);
  });

  it("loads Flight config environment", function(){
    expect('test').to("==", Flight.config.environment())
  })

  it("loads Flight config database", function(){
    expect('db/sqlite.test.db').to("==", Flight.config.database())
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

    it("should return the instantiated record", function(){
      transaction(function(){
        expect('somthin').to("==",
          Flight.create(
            'tweets', {text: 'somthin', user: 'bojangles'}
          ).text
        )
      })
    })

    it("should return a Flight record", function(){
      transaction(function(){
        expect(true).to("==",
          Flight.create(
            'tweets', {text: 'somthin', user: 'bojangles'}
          ).isFlightRecord
        )
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

    it("should return records as proper objects", function(){
      transaction(function(){
        setup()
        record = Flight.find('tweets')[0]
        expect(true).to("==", record.isFlightRecord)
      })
    })

    it("should return false if nothing was found", function(){
      transaction(function(){
        records = Flight.find('tweets', {text: "never posted"})
        expect(false).to("==", records)
      })
    })

    it("should accept a limit", function(){
      transaction(function(){
        setup()
        records = Flight.find('tweets', {}, 1)
        expect(1).to("==", records.length)
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
