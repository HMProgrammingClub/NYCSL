QUnit.test( "backend", function( assert ) {
	assert.ok(getUser(null, "michael_truell@horacemann.org"), "Found michael user with email");
	
	var user = getUser(90);
	assert.ok(user, "Found michael user with userID");
	assert.ok(user.firstName && user.lastName && user.email && user.schoolName && user.userID, "User has necessary fields");


	var problem = getProblem(2);
	console.log(problem);
	assert.ok(problem, "Problem is not null");
	assert.ok(problem.doReset &&problem.isAscending && problem.problemName &&problem.problemFullName && problem.problemID && problem.problemDescription && problem.submissions, "Problem has necessary fields");

	var submission = problem.submissions[0];
	assert.ok(submission, "Problem submission is not null");
	assert.ok(submission.isReady && submission.mu && submission.problemID && submission.score && submission.sigma && submission.submissionID && submission.user, "Problem submission has fields");
});