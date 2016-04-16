$(function() {
  var tutorialDisplay = {
    init: function(problemID) {
      this.problem = getProblem(problemID);
      this.cacheDOM();
      this.render();
    },
    cacheDOM: function() {
      this.$header = $("#header");
      this.$body = $("#paragraph")
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
          hljs.initHighlighting();
				}
			});
    }
  };
  console.log(getGET("problemID"))
  if (getGET("problemID") != null) {
    tutorialDisplay.init(parseInt(getGET("problemID")));
  }
});
