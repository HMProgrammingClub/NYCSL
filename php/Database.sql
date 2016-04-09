-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 02, 2016 at 07:23 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `Problem`
--

INSERT INTO `Problem` (`problemID`, `problemName`, `isAscending`, `problemFullName`, `problemDescription`) VALUES
(1, 'TSP', 1, 'Traveling Salesman Problem', 'Find the optimal route through a set of 500 points in 3D space.'),
(2, 'RM', 0, 'Roommate Problem', 'Pair similar roommates together in the most optimal way.');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `Submission`
--

INSERT INTO `Submission` (`submissionID`, `userID`, `problemID`, `score`) VALUES
(56, 71, 2, 12846782),
(57, 90, 2, 49268),
(58, 90, 1, 108971),
(59, 81, 1, 108827),
(60, 69, 1, 105210),
(61, 68, 1, 110446),
(62, 92, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `userID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `schoolName` varchar(64) NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=94 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `email`, `password`, `firstName`, `lastName`, `schoolName`, `isVerified`) VALUES
(68, 'gruensteinj@horacemann.org', 'fuRsgEtXRQGNA', 'Josh', 'Gruenstein', 'Horace Mann', 1),
(69, 'benjamin_spector@horacemann.org', 'fu8/UiE30TaQE', 'Ben', 'Spector', 'Horace Mann', 1),
(71, 'joshua_doolan@horacemann.org', 'fuwJrO9EKjMYE', 'Joshua', 'Doolan', 'Horace Mann', 1),
(81, 'nicholas_keirstead@horacemann.org', 'fuU4HW3xqxdsA', 'Nick', 'Keirstead', 'Horace Mann', 1),
(86, 'luca_koval@horacemann.org', 'fu8/UiE30TaQE', 'Luca', 'Koval', 'Horace Mann', 1),
(90, 'michael_truell@horacemann.org', 'fu8/UiE30TaQE', 'Michael', 'Truell', 'Horace Mann', 1),
(91, 'truellm@horacemann.org', 'fuTMLub7KuDUE', 'Michael', 'Truell', 'Horace Mann', 1),
(92, 'henry_wildermuth@horacemann.org', 'fuNA9szthqt2k', 'Henry', 'Wildermuth', 'Horace Mann', 1),
(93, 'gruenstienj@horacemann.org', 'fuNA9szthqt2k', 'Lol', 'Tehe', 'Horace Mann', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Verification`
--

CREATE TABLE IF NOT EXISTS `Verification` (
  `userID` mediumint(8) unsigned NOT NULL,
  `verificationCode` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Verification`
--

INSERT INTO `Verification` (`userID`, `verificationCode`) VALUES
(51, 45266),
(52, 57684),
(53, 70393),
(54, 8747),
(55, 51287),
(56, 68563),
(57, 89016),
(58, 78006),
(61, 48500),
(62, 68912),
(63, 89285),
(64, 87769),
(65, 56458),
(71, 99544),
(72, 16524),
(79, 9200),
(82, 62729),
(83, 78765),
(85, 30041),
(86, 15800),
(87, 22329),
(88, 45831),
(89, 19237),
(93, 98680);