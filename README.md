#NYCSL

A monthly programming competition for high-school students in the NY area.

##About the Competition

NYCSL, or the New York Computer Science League, is a programming competition created for New York high schools students to compete against each-other while solving algorithmic computer science problems.

Each month at midnight a new challenge is posted. Programmers in NYCSL have one month to upload as many solutions as they like; only the top score is shown. Solutions are instantly graded and put up on both global and school-wide leaderboards. Problems are designed such that they are suitable for programmers of all skill levels; beginners are encouraged to participate.

NYCSL.io was created by programmers [Michael Truell](https://github.com/truell20), [Josh Gruenstein](https://github.com/joshuagruenstein), [Luca Koval](https://github.com/G4Cool), and [Ben Spector](https://github.com/Sydriax). The project began at the defhacks("Winter",2015) hackathon by CSTUY at Facebook NY. 

You may contact us at [contact@nycsl.io](mailto:contact@nycsl.io). 

###Schools

Currently the following schools are supported. If you'd like your school to be added, please contact us (or make a pull request).

- Dalton
- Horace Mann
- Stuyvesant
- Fieldston
- Trinity
- Bronx Science

## Technical

The website utilizes a LAMP backend (Linux, Apache, MySQL and PHP) for the majority of tasks.  However, problem grading is done through Python scripts called from PHP.  The backend is organized as a RESTful API.  The front-end is JavaScript + jQuery for scripting and Bootstrap 3 using FezVrasta's wonderful [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design) theme for style.

### Development

As code is deployed to the server over git, there is a `master` and a `dev` branch.  The master branch contains things that work.  The `dev` branch contains things are works in progress.  Every so often `dev` is merged into `master`, and vice versa.  Feel free to make pull requests of bugs you find and features you'd like to implement, especially if you're a NYCSL participant.

Currently NYCSL is being used and tested by the Horace Mann School programming club.  Release 1.0 will occur once NYCSL is ready for promotion to other schools.  Release 2.0 is where longer-term features should go (for the moment).

##Todo

### February Release
- ~~Fix visulizer crash on chrome reload~~
- ~~Show the player names and the winner on the game modal~~
- Keep track of who is player 1 and who is player 2
- ~~Rehash all the passwords~~
- Allow the playing of local game files on the website
- Test the starter packages locally (Ben, Luca)
- Submit bots and make sure everything is running correctly
- ~~Write logging functions (Ben, Luca)~~
- Compile submitted C++ as C++ 11
- Email heads of CS departements at Stuy, Bx, Dalton, Trinity (Ben, Luca)
- Send out email to HM Programming Club (Ben, Luca)
- Getting started video (showing how to run c++, java, python bots from environment, put trn file in visualizer, etc.) (Ben, Luca)
- Give prizes to January winners (Ben, Luca)
- ~~Decide on prizes and put them in the problem description~~
- Migrate new MySQL database structure to the production server

### March Release
- User overall score
	- Base score for competition participation + inverse of placing (1st / 30 people = 30 points)
	- Overall leaderboard
	- Badges?
- Basic chatroom for participants to discuss and collaborate in 
- Show number of submissions on the leaderboard?
- Full user settings pages
