Macro.add("displayTestCaseResult", {
  handler: function () {
    // Check that the correct number of arguments have been passed
    if (this.args.length !== 1) {
      return this.error("This macro requires 1 arguments: test result.");
    }

    // Get the arguments
    var result = this.args[0];

    // Use result.overall to build the id, so multiple test cases have different ids
    var id = result.overall.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-");

    // Hide the details within a collapsible section
    var text = `<<link "${result.overall}">>\
      <<toggleclass "#${id}" "hidden">>\
      <</link>>\
      <div id="${id}" class="hidden">\
      ${result.details}
      </div>`;

    // Return the value of the field
    return new Wikifier(this.output, text);
  },
});
