<?php

require_once 'API.class.php';
class DefHacksAPI extends API
{

	// The database
	private $mysqli = NULL;

	public function __construct($request, $origin) {
		$this->initDB();
		parent::__construct($request);
	}

	// Initializes and returns a mysqli object that represents our mysql database
	private function initDB() {
		$this->mysqli = new mysqli("DefHacks.db.12061709.hostedresource.com", 
			"DefHacks", 
			"***REMOVED***", 
			"DefHacks");
		
		if (mysqli_connect_errno()) { 
			echo "<br><br>There seems to be a problem with our database. Reload the page or try again later.";
			exit(); 
		}
	}

	private function select($sql) {
		$res = mysqli_query($this->mysqli, $sql);
		if($res) return mysqli_fetch_array($res, MYSQLI_ASSOC);
		else return NULL;
	}

	private function insert($sql) {
		mysqli_query($this->mysqli, $sql);
	}

	// API ENDPOINTS
	protected function user() {
		if(isset($_GET['userID']) && isset($_GET['password'])) {
			$userID = $_GET['userID'];
			$password = $_GET['password'];
			return $this->select("SELECT * FROM User WHERE userID = $userID and password = '$password'");
		} else if(isset($_GET['email']) && isset($_GET['password'])) {
			$email = $_GET['email'];
			$password = $_GET['password'];
			return $this->select("SELECT * FROM User WHERE email = '$email' and password = '$password'");
		} else if(
			isset($_POST['email']) && 
			isset($_POST['password']) &&
			isset($_POST['firstName']) &&
			isset($_POST['lastName']) &&
			isset($_POST['schoolName'])) {

			$email = $_POST['email'];
			$password = $_POST['password'];
			$firstName = $_POST['firstName'];
			$lastName = $_POST['lastName'];
			$schoolName = $_POST['schoolName'];

			$this->insert("INSERT INTO User (email, password, firstName, lastName, schoolName) VALUES ('$email', '$password', '$firstName', '$lastName', '$schoolName')");

		} else {
			return "Didnt reach an endpoint";
		}
		return "Success";
	}

	protected function problem() {
		if(isset($_GET['problemID'])) {
			$problemID = $_GET['problemID'];
			return $this->select("SELECT * FROM Problem WHERE problemID = $problemID");
		}
	}
 }

 ?>