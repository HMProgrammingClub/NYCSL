# NYCSL

NYCSL is a monthly programming competition for high-school students in the NY area run by a group of students from [the Horace Mann School](http://www.horacemann.org/).

## About the Competition

NYCSL, or the New York Computer Science League, was a programming competition created for New York high schools students to compete against each-other while solving algorithmic computer science problems.

Each month at midnight a new challenge is posted. Programmers in NYCSL have one month to upload as many solutions as they like; only the top score is shown. Solutions are instantly graded and put up on both global and school-wide leaderboards. Problems are designed such that they are suitable for programmers of all skill levels; beginners are encouraged to participate.

## Technical

The website utilizes a LAMP backend (Linux, Apache, MySQL and PHP) for the majority of tasks.  However, problem grading is done through Python scripts called from PHP.  The backend is organized as a RESTful API.  The front-end is JavaScript + jQuery for scripting and Bootstrap 3 using FezVrasta's wonderful [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design) theme for style.

## Folder Contents

- `img/` - All of the images used on the site.
- `includes/` - Common html elements that are included throughout the site.
- `lib/` - Any js libraries used on the site.
- `php/` - Our RESTFul API.
- `problems/` - Competition specific content.
- `script/` - Frontend javascript.
- `style/` - CSS.
- `tests/` - Unit tests written in QUnit.

## Contributing

Send us a pull request. If you are looking for things to do, check out the repo's open issues. We will be happy to add you as a contributor and credit you in the README.

If you find a bug or have any trouble with the website, please open an issue. We are happy to help you out.

### Authors

NYCSL was created by [Michael Truell](https://github.com/truell20), [Joshua Gruenstein](https://github.com/joshuagruenstein), [Ben Spector](https://github.com/Sydriax), and [Luca Koval](https://github.com/G4Cool) for the Horace Mann Programming Club.
