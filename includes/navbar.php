<nav class="navbar navbar-default" id="navvy">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/">NYCSL</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Schools<span class="caret"></span></a>
					<ul class="dropdown-menu" id="schoolsDropdown">
						
					</ul>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right loggedOut" id="loginNav">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">Login<strong class="caret"></strong></a>
						<ul id="loginForm" class="dropdown-menu" style="padding: 10px; padding-bottom: 0px;">
							<div class="form-group label-floating is-empty">
								<label for="login_user" class="control-label">Email</label>
								<input type="email" class="form-control" id="login_user">
								<input type="submit" style="display: none;">
							</div>

							<div class="form-group label-floating is-empty">
								<label for="login_pass" class="control-label">Password</label>
								<input id="login_pass" class="form-control" type="password" size="30" >
								<span class="material-input"></span>
							</div>
							<input id="loginButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:0px" type="submit" name="commit" value="Login" />
							<button class="btn btn-secondary" data-toggle="modal" data-target="#forgotModal" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px">Forgot</button>
						</ul>
					</li>

					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">Register<strong class="caret"></strong></a>
						<ul id="registerForm" class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
							<div class="form-group label-floating is-empty">
								<label for="register_first" class="control-label">First Name</label>
								<input id="register_first" class="form-control" type="text" size="30" >
								<span class="material-input"></span>
							</div>
							<div class="form-group label-floating is-empty">
								<label for="register_last" class="control-label">Last Name</label>
								<input id="register_last" class="form-control" type="text" size="30" >
								<span class="material-input"></span>
							</div>
							<div class="form-group label-floating is-empty">
								<label for="register_email" class="control-label">Email</label>
								<input id="register_email" class="form-control" type="email" size="30" >
								<span class="help-block" id="schoolField">Enter your school email.</span>
								<span class="material-input"></span>
							</div>
							<div class="form-group label-floating is-empty">
								<label for="register_pass" class="control-label">Password</label>
								<input id="register_pass" class="form-control" type="password" size="30" >
								<span class="material-input"></span>
							</div>
							<input id="registerButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px" type="submit" name="commit" value="Register" />
						</ul>
					</li>
				</ul>
			</ul>
			<form id="submitForm">
				<ul class="nav navbar-nav navbar-right loggedIn" id="logoutNav">
				<!--<li><a href="#" id="submitButton">Submit To Current Competition</a><input type="file" id="myFile" name="outputFile" onchange="fileChanged()"></li>-->
					<li><a href="#" id="gameButton">View Gamefile</a><input type="file" id="gameFile" name="gameFile" onchange="gameFileChanged()"></li>
					<li><a href="#" id="logoutButton">Logout</a></li>
				</ul>
			</form>
		</div>
	</div>
</nav><div id="messageBox"></div>

<div class="modal fade" id="forgotModal" tabindex="-1" role="dialog" aria-labelledby="forgotModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3 class="modal-title" id="myModalLabel">Password Recovery</h3>
			</div>
			<div class="modal-body" >
					<div class="alert alert-danger" role="alert" id="noEmailRecoveryAlert" style="display:none">
						<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
						<span class="sr-only">Error:</span>
						Email could not be found in our database.
					</div>
					<p>Please enter your school email below and we will send you a recovery link.</p>
					<div class="form-group label-floating is-empty" style="text-align:left">
						<label for="forgotMail" class="control-label">Email</label>
						<input id="forgotMail" class="form-control" type="email" size="30" >
						<span class="material-input"></span>
					</div>
					<div style="text-align:center;width:100%">
						<button id="recoverButton" type="submit" class="btn btn-primary">Recover</button>
					</div>
			</div>
		</div>
	</div>
</div>