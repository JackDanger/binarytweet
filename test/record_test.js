Johnson.require("test_helper")

jspec.describe("Record", function() {
  it("loads Record", function() {
    Johnson.require("datastore");
    expect(Record.create).to("have_constructor", Function);
  });
});
