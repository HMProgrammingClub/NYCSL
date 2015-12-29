-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 29, 2015 at 03:00 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `DefHacks`
--

-- --------------------------------------------------------

--
-- Table structure for table `Problem`
--

CREATE TABLE IF NOT EXISTS `Problem` (
  `problemID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `problemName` varchar(32) NOT NULL,
  `isAscending` tinyint(1) NOT NULL,
  `problemFullName` varchar(256) NOT NULL,
  `problemDescription` text NOT NULL,
  PRIMARY KEY (`problemID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Problem`
--

INSERT INTO `Problem` (`problemID`, `problemName`, `isAscending`, `problemFullName`, `problemDescription`) VALUES
(2, 'RM', 0, 'Roommate Problem', 'Pair similar roommates together in the most optimal way.'),
(4, 'ST', 1, 'Steiner Tree Problem', 'Connect the dots in the most efficient way possible.'),
(5, 'TSP', 1, 'Traveling Salesman Problem', 'Find the optimal route through a set of 500 points in 3D space.');

-- --------------------------------------------------------

--
-- Table structure for table `Submission`
--

CREATE TABLE IF NOT EXISTS `Submission` (
  `submissionID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `userID` mediumint(8) unsigned NOT NULL,
  `problemID` mediumint(8) unsigned NOT NULL,
  `score` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`submissionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=53 ;

--
-- Dumping data for table `Submission`
--

INSERT INTO `Submission` (`submissionID`, `userID`, `problemID`, `score`) VALUES
(24, 4, 5, 9989),
(25, 3, 5, 1946),
(26, 5, 5, 6754),
(28, 7, 5, 12444),
(29, 9, 5, 11043),
(31, 4, 2, 9989),
(32, 5, 2, 99954),
(33, 6, 2, 106543),
(34, 7, 2, 38352),
(36, 8, 2, 4244),
(37, 9, 2, 3246654),
(38, 8, 5, 13132),
(39, 11, 5, 1922),
(40, 11, 2, 103242),
(41, 12, 5, 8352),
(42, 12, 2, 7288),
(43, 3, 4, 10326),
(44, 4, 4, 9989),
(45, 9, 4, 22453),
(52, 11, 4, 1922);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `userID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `schoolName` varchar(64) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `email`, `password`, `firstName`, `lastName`, `schoolName`) VALUES
(3, 'lucakoval@me.com', 'fu8/UiE30TaQE', 'Luca', 'Koval', 'Horace Mann'),
(4, 'michael_truell@horacemann.org', 'fu8/UiE30TaQE', 'Michael', 'Truell', 'Horace Mann'),
(5, 'joesmith@gmail.com', 'fu8/UiE30TaQE', 'Joe', 'Smith', 'Horace Mann'),
(6, 'luca_koval@horacemann.org', 'fu8/UiE30TaQE', 'Frederic', 'Koval', 'Horace Mann'),
(7, 'HerpDerp@gmail.com', 'fu8/UiE30TaQE', 'Herbert', 'Derpert', 'Stuyvesant'),
(8, 'joshuagruenstein@gmail.com', 'fu8/UiE30TaQE', 'Joshua', 'Gruenstein', 'Horace Mann'),
(9, 'melissa@stuy.org', 'fu8/UiE30TaQE', 'Melissa', 'Goldsmith', 'Stuyvesant'),
(11, 'logins@bronx.org', 'fu8/UiE30TaQE', 'Billy', 'Logins', 'Bronx Science'),
(12, 'paul@bronxscience.org', 'fu8/UiE30TaQE', 'Paul', 'Offerson', 'Bronx Science'),
(13, 'george@horacemann.org', 'fu8/UiE30TaQE', 'George', 'Free', 'Horace Mann'),
(38, 'mark_doty@horacemann.org', 'fu8/UiE30TaQE', 'Mark', 'Doty', 'Horace Mann');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
