Johnson.require("test_helper")

jspec.describe("Flight", function() {
  it("loads Flight", function() {
    Johnson.require("db/flight");
    expect(Flight.create).to("have_constructor", Function);
  });
});
