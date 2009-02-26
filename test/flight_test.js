Johnson.require("test_helper")

jspec.describe("Flight", function() {

  Johnson.require("init");

  it("loads Flight", function() {
    expect(Flight.create).to("have_constructor", Function);
  });

  it("loads Flight config environment", function(){
    expect(Flight.config.environment()).to("==", 'test')
  })

  it("loads Flight config database", function(){
    expect(Flight.config.database()).to("==", 'sqlite.test.db')
  })
});
