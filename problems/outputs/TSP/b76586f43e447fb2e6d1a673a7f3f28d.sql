-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: 72.167.233.103
-- Generation Time: Dec 12, 2015 at 02:04 PM
-- Server version: 5.5.43
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `DefHacks`
--

-- --------------------------------------------------------

--
-- Table structure for table `Problem`
--

CREATE TABLE `Problem` (
  `problemID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `problemName` varchar(32) NOT NULL,
  `isAscending` tinyint(1) NOT NULL,
  PRIMARY KEY (`problemID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Problem`
--

INSERT INTO `Problem` VALUES(2, 'RM', 0);
INSERT INTO `Problem` VALUES(3, 'TSP', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Submission`
--

CREATE TABLE `Submission` (
  `submissionID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `userID` mediumint(8) unsigned NOT NULL,
  `problemID` mediumint(8) unsigned NOT NULL,
  `score` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`submissionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `Submission`
--

INSERT INTO `Submission` VALUES(23, 1, 3, 66651);
INSERT INTO `Submission` VALUES(24, 4, 3, 10006);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `schoolName` varchar(64) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` VALUES(3, 'lucakoval@me.com', 'asdf', 'Luca', 'Koval', 'Horace Mann School');
INSERT INTO `User` VALUES(4, 'michael_truell@horacemann.org', 'oakland2', 'Michael', 'Truell', 'Horace Mann School');
INSERT INTO `User` VALUES(5, 'joesmith@gmail.com', '1234', 'Joe', 'Smith', 'Horace Mann School');
INSERT INTO `User` VALUES(6, 'luca_koval@horacemann.org', 'lucakoval', 'Luca', 'Koval', 'Horace Mann School');
INSERT INTO `User` VALUES(7, 'HerpDerp@gmail.com', 'herpderp', 'Mr', 'Herp', 'Standard Library College');
