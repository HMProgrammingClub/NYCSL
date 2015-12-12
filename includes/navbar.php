<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/"><img height="20px" src="img/Logo.png"></a>
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
						<ul class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
							<div class="form-group">
								<label for="login_user">Email</label><br />
								<input id="login_user"  type="email" size="30" />
							</div>
							<div class="form-group">
								<label for="login_pass">Password</label><br />
								<input id="login_pass"  type="password" size="30" />
							</div>

							<input id="loginButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px" type="submit" name="commit" value="Login" />
						</ul>
					</li>

					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">Register<strong class="caret"></strong></a>
						<ul class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
							<div class="form-group">
								<label for="register_first">First Name</label><br />
								<input id="register_first"  type="text" size="30" />
							</div>
							<div class="form-group">
								<label for="register_last">Last Name</label><br />
								<input id="register_last"  type="text" size="30" />
							</div>
							<div class="form-group">
								<label for="register_school">School</label><br />
								<input id="register_school" type="text" size="30" />
							</div>
							<div class="form-group">
								<label for="register_email">Email</label><br />
								<input id="register_email"  type="email" size="30" />
							</div>
							<div class="form-group">
								<label for="register_pass">Password</label><br />
								<input id="register_pass"  type="password" size="30" />
							</div>
							<input id="registerButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px" type="submit" name="commit" value="Register" />
						</ul>
					</li>
				</ul>
			</ul>
			<form id="submitForm">
				<ul class="nav navbar-nav navbar-right loggedIn" id="logoutNav">
					<li><a href="#" id="submitButton">Submit</a><input type="file" id="myFile" name="outputFile" onchange="fileChanged()"></li>
					<li><a href="#" id="logoutButton">Logout</a></li>
				</ul>
			</form>
		</div>
	</div>
</nav><div id="errorBox"></div>