#NYCSL

A monthly programming competition for high-school students in the NY area.

##About the Competition

NYCSL, or the New York Computer Science League, is a programming competition created for New York high schools students to compete against each-other while solving algorithmic computer science problems.

Each month at midnight a new challenge is posted. Programmers in NYCSL have one month to upload as many solutions as they like; only the top score is counted. Solutions are instantly graded and put up on both global and school-wide leaderboards. Problems are designed such that they are suitable for programmers of all skill levels; beginners are encouraged to participate.

NYCSL.io was created by programmers [Josh Gruenstein](https://github.com/joshuagruenstein), [Luca Koval](https://github.com/G4Cool), [Ben Spector](https://github.com/Sydriax), and [Michael Truell](https://github.com/truell20) during the defhacks("Winter",2015) hackathon at Facebook NY. You may contact us at contact@nycsl.io. 

###Schools

Currently the following schools are supported. If you'd like your school to be added, please contact us (or make a pull request).

- Dalton
- Horace Mann
- Stuyvesant
- Fieldston
- Trinity
- Bronx Science


## Technical

The website utilizes a LAMP backend (Linux, Apache, MySQL and PHP) for the majority of tasks.  However, problem grading is done through Python scripts called from PHP.  The backend is organized as a RESTful API.

The front-end is JavaScript + jQuery for scripting and Bootstrap 3 using FezVrasta's wonderful [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design) theme for style.

##Todo

- Only load top ~20 on leaderboard
	- Button to load 10 more 
- User overall score
	- Base score for competition participation + inverse of placing (1st / 30 people) = 30 points
	- Overall leaderboard
	- Badges?
- Show number of submissions on the leaderboard
- Remove js redundancy
- Reduce backend calls
- Password recovery
