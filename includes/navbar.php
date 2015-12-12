<nav class="navbar navbar-default">
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
					<ul class="dropdown-menu">
						<li><a href="#">Horace Mann</a></li>
						<li><a href="#">Stuyvesant</a></li>
						<li><a href="#">Bronx Science</a></li>
					</ul>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right loggedOut" id="loginNav">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">Login<strong class="caret"></strong></a>
						<ul class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
							<div class="form-group">
								<label for="login_user">Email</label>
								<input id="login_user"  type="email" size="30" />
							</div>
							<div class="form-group">
								<label for="login_pass">Password</label>
								<input id="login_pass"  type="password" size="30" />
							</div>

							<input id="loginButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px" type="submit" name="commit" value="Login" />
						</ul>
					</li>

					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">Register<strong class="caret"></strong></a>
						<ul class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
							<div class="form-group">
								<label for="register_user">Email</label>
								<input id="register_user"  type="email" size="30" />
							</div>
							<div class="form-group">
								<label for="register_pass">Password</label>
								<input id="register_pass"  type="password" size="30" />
							</div>

							<input id="registerButton" class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px; margin-bottom:15px" type="submit" name="commit" value="Register" />
						</ul>
					</li>
				</ul>
			</ul>
			<form id="submitForm">
				<ul class="nav navbar-nav navbar-right loggedIn" id="logoutNav">
					<li><a href="#" id="submitButton">Submit</a><input type="file" id="myFile" name="outputFile"></li>
					<li><a href="#" id="logoutButton">Logout</a></li>
				</ul>
			</form>
		</div>
	</div>
</nav>