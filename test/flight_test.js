Johnson.require("test_helper")

jspec.describe("Flight", function() {
  it("loads Flight", function() {
    Johnson.require("init");
    expect(Flight.create).to("have_constructor", Function);
  });
});
