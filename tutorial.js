$(function() {
  var tutorialDisplay = {
    init: function(problemID) {
      this.problem = getProblem(problemID);
      this.cacheDOM();
      this.render();
    },
    cacheDOM: function() {
      this.$header = $("jHeader");
      this.$body = $("jParagraph")
    },
    render: function() {
      this.$header.html(this.problem.problemFullName+" Tutorial")
      var result = $.ajax({
				url: "problems/tutorials/"+this.problem.problemName+".html",
				async: true,
				method: "GET",
				context: this,
				success: function(result) {
					this.$body.html(result);
				}
			});
    }
  };
  if (getGET("problemID") != null) {
    tutorialDisplay.init(parseInt(getGET("problemID")));
  }
});
