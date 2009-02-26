Johnson.require("test_helper")

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
      Flight.transaction(function(){
        Flight.create('users', {name: 'guy'})
        expect("guy").to("==", Flight.find('users')[0].name)
      })
    })

  })
});
