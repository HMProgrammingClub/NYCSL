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

	private function selectMultiple($sql) {
		$res = mysqli_query($this->mysqli, $sql);
		$finalArray = array();

		while($temp = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
			array_push($finalArray, $temp);
		}

		return $finalArray;
	}

	private function insert($sql) {
		mysqli_query($this->mysqli, $sql);
	}

	// API ENDPOINTS
	protected function session() {
		session_start();
		if($this->method == 'GET') {
			return $_SESSION;
		} else if(isset($_POST['email']) & isset($_POST['password'])) {
			$email= $_POST['email'];
			$password = $_POST['password'];
			$userIDArray = $this->select("SELECT * FROM User WHERE email = '$email' AND password = '$password'");
			$_SESSION = $userArray;
		} else if(isset($_POST['userID']) & isset($_POST['password'])) {
			$userID= $_POST['userID'];
			$password = $_POST['password'];
			$userIDArray = $this->select("SELECT * FROM User WHERE userID = '$userID' AND password = '$password'");
			$_SESSION = $userArray;
		} else if($this->method == 'DELETE') {
			session_destroy();
		} else {
			return NULL;
		}
	}

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

	protected function submission() {
		if(isset($_GET['problemID'])) {
			$problemID = $_GET['problemID'];

			$problemArray = $this->select("SELECT * FROM Problem WHERE problemID = $problemID");

			if($problemArray['isAscending'] == 0) return $this->selectMultiple("SELECT * FROM Submission WHERE problemID = $problemID ORDER BY score DESC");
			else return $this->selectMultiple("SELECT * FROM Submission WHERE problemID = $problemID ORDER BY score ASC");
		} else if(isset($_GET['userID'])) {
			$userID = $_GET['userID'];
			return $this->selectMultiple("SELECT * FROM Submission WHERE userID = $userID");
		} else if(isset($_GET['submissionID'])) {
			$submissionID = $_GET['submissionID'];
			return $this->select("SELECT * FROM Submission WHERE submissionID = $submissionID");
		} else if(
			isset($_POST['userID']) &&
			isset($_FILES['outputFile']['name'])) {

			// Parameters
			$userID = $_GET['userID'];
			//$outputFile = $this->mysqli->real_escape_string(file_get_contents($_FILES['outputFile']["tmp_name"]));

			// Last one is current one
			$problemArrayArray = $this->selectMultiple("SELECT * FROM Problem");
			$problemArray = $problemArrayArray[count($problemArrayArray)-1];
			$problemID = $problemArray['problemID'];
			$name = $problemArray['problemName'];

			$targetPath = "../problems/outputs/$problemName/";
			$ext = explode('.', basename( $_FILES['outputFile']['name']));
			$targetPath = $targetPath . md5(uniqid()) . "." . $ext[count($ext)-1];
			move_uploaded_file($_FILES['outputFile']['tmp_name'], $targetPath);

			// Pass target file to python script
			exec("python $problemName.py", $pythonOutput);
			$score = intval($pythonOutput[0]);

			$this->insert("INSERT INTO Submission (problemID, userID, score) VALUES ($problemID, $userID, $score)");
		} else {
			return "Didn't reach endpoint";
		}
		return "Success";
	}
 }

 ?>