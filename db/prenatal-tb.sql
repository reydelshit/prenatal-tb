-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2023 at 05:03 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prenatal-tb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(111) NOT NULL,
  `appointment_title` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `allDay` varchar(255) NOT NULL,
  `patient_id` int(111) NOT NULL,
  `appointment_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `appointment_title`, `start`, `end`, `allDay`, `patient_id`, `appointment_status`) VALUES
(20, 'Lebron James - Pregnant', '2023-11-07', '2023-11-08', '1', 0, ''),
(21, 'reydel reydel - Tuberculosis', '2023-11-08', '2023-11-09', '1', 29, ''),
(25, 'reyde reydeld - Tuberculosis', '2023-11-10', '2023-11-11', '1', 31, 'Done'),
(29, 'reyde reydeld - Tuberculosis', '2023-11-14', '2023-11-15', '1', 31, 'Pending'),
(30, 'reyde reydeld - Tuberculosis', '2023-11-07T06:00:00+08:00', '2023-11-07T06:30:00+08:00', '', 31, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `info_answers`
--

CREATE TABLE `info_answers` (
  `info_answer_id` int(111) NOT NULL,
  `patient_id` int(111) NOT NULL,
  `question_id` int(111) NOT NULL,
  `answer_text` text NOT NULL,
  `answer_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `info_answers`
--

INSERT INTO `info_answers` (`info_answer_id`, `patient_id`, `question_id`, `answer_text`, `answer_type`) VALUES
(5, 17, 7, 'cough', 'Tuberculosis'),
(6, 17, 8, 'i do have', 'Tuberculosis'),
(7, 17, 9, 'Kangkong', 'Tuberculosis'),
(8, 18, 7, 'fever', 'Tuberculosis'),
(9, 18, 8, 'n\\a', 'Tuberculosis'),
(10, 18, 9, 'mefenamic', 'Tuberculosis'),
(11, 22, 10, 'dasd', 'Tuberculosis'),
(12, 22, 11, 'dsada', 'Tuberculosis'),
(13, 22, 12, 'das', 'Tuberculosis'),
(14, 22, 13, 'das', 'Tuberculosis'),
(15, 27, 10, 'adad', 'Prenatal'),
(16, 27, 11, 'dsada', 'Prenatal'),
(17, 27, 12, 'dsad', 'Prenatal'),
(18, 27, 13, 'dsa', 'Prenatal'),
(19, 28, 7, 'dsada', 'Tuberculosis'),
(20, 28, 8, 'asdd', 'Tuberculosis'),
(21, 28, 9, 'dsad', 'Tuberculosis'),
(22, 29, 7, 'reydel', 'Tuberculosis'),
(23, 29, 8, 'reydel', 'Tuberculosis'),
(24, 29, 9, 'reydel', 'Tuberculosis'),
(25, 30, 7, 'nice', 'Tuberculosis'),
(26, 30, 8, 'nice', 'Tuberculosis'),
(27, 30, 9, 'nice', 'Tuberculosis'),
(28, 31, 7, 'bdjkajida', 'Tuberculosis'),
(29, 31, 8, 'bdjkajida', 'Tuberculosis'),
(30, 31, 9, 'bdjkajida', 'Tuberculosis');

-- --------------------------------------------------------

--
-- Table structure for table `medication`
--

CREATE TABLE `medication` (
  `medication_id` int(111) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `medication_name` varchar(255) NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `patient_id` int(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medication`
--

INSERT INTO `medication` (`medication_id`, `patient_name`, `medication_name`, `dosage`, `frequency`, `start`, `end`, `created_at`, `description`, `patient_id`) VALUES
(1, 'reyde reydeld', 'dasd', 'asdasd', 'Twice a day', '2023-11-15 00:00:00', '2023-11-24 00:00:00', '2023-11-11 14:00:28', 'dsada', 31);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(111) NOT NULL,
  `notification_message` text NOT NULL,
  `receiver_id` int(111) NOT NULL,
  `sender_id` int(111) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `notification_message`, `receiver_id`, `sender_id`, `created_at`) VALUES
(1, 'You have a new appointment on 2023-11-14', 31, 1, '2023-11-11 05:35:35'),
(2, 'You have a new appointment on Nov 14, 2023 12:00 AM', 31, 1, '2023-11-11 05:45:27'),
(3, 'You have a new appointment on Nov 7, 2023 6:00 AM', 31, 1, '2023-11-11 05:45:54'),
(4, 'You have a new appointment on Nov 7, 2023 8:30 AM', 31, 1, '2023-11-11 05:46:16'),
(5, 'You have a new appointment on Nov 7, 2023 10:00 AM', 31, 1, '2023-11-11 05:47:22');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `patient_middlename` varchar(255) DEFAULT NULL,
  `patient_lastname` varchar(255) NOT NULL,
  `patient_birthday` varchar(255) NOT NULL,
  `patient_age` int(111) NOT NULL,
  `patient_gender` varchar(255) NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  `patient_phone` varchar(255) NOT NULL,
  `patient_type` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `patient_name`, `patient_middlename`, `patient_lastname`, `patient_birthday`, `patient_age`, `patient_gender`, `patient_email`, `patient_phone`, `patient_type`, `created_at`) VALUES
(17, 'Lebron', 'Raymone', 'James', '2023-11-10', 66, 'Male', 'lebron@gmail.com', '1234567892', 'Tuberculosis', NULL),
(18, 'Reydel', 'Adlawan', 'Ocon', '2023-11-09', 20, 'Male', 'reyd@gmail.com', '1234567892', 'Tuberculosis', '2023-11-09 02:34:11'),
(19, 'Fater', 'Fa', 'Caruso', '2023-11-17', 66, 'Female', 'dsa@gmail.com', '231232', 'Prenatal', '2023-11-09 02:37:41'),
(30, 'reydel', 'nice', 'ocon', '2023-11-10', 66, 'Male', 'lebron@gmail.com', '3213', 'Tuberculosis', '2023-11-10 06:24:12'),
(31, 'reyde', 'dddsad', 'reydeld', '2023-11-11', 321, 'Female', 'lebron@gmail.com', '1234567892', 'Tuberculosis', '2023-11-10 06:33:08');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(111) NOT NULL,
  `question_text` text NOT NULL,
  `question_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `question_type`) VALUES
(7, 'Current symptoms (cough, fever, weight loss, etc.)', 'Tuberculosis'),
(8, '\nHistory of exposure to tuberculosis', 'Tuberculosis'),
(9, 'Previous TB treatments (if any)', 'Tuberculosis'),
(10, 'Estimated date of conception', 'Prenatal'),
(11, 'Number of previous pregnancies', 'Prenatal'),
(12, 'Any complications during previous pregnancies', 'Prenatal'),
(13, 'Current symptoms or discomforts', 'Prenatal');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(155) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `patient_id` int(111) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_type`, `user_username`, `user_password`, `patient_id`, `created_at`) VALUES
(1, 'hprovider', 'provider@gmail.com', 'provider123', 0, NULL),
(2, 'patient', 'patient@gmail.com', 'patient123', 0, NULL),
(3, 'patient', 'reydel', 'ocon', 30, '2023-11-10 06:24:12'),
(4, 'patient', 'reyde855', 'reydeld814', 31, '2023-11-10 06:33:08');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `visit_id` int(111) NOT NULL,
  `visit_date` datetime NOT NULL,
  `patient_id` int(111) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`visit_id`, `visit_date`, `patient_id`, `created_at`) VALUES
(1, '2023-11-09 11:16:38', 29, '2023-11-09 11:16:38'),
(2, '2023-11-10 06:24:12', 30, '2023-11-10 06:24:12'),
(3, '2023-11-10 06:33:08', 31, '2023-11-10 06:33:08'),
(8, '2023-11-10 08:33:32', 31, '2023-11-10 08:33:32'),
(9, '2023-11-10 08:37:38', 31, '2023-11-10 08:37:38'),
(10, '2023-11-10 08:39:26', 31, '2023-11-10 08:39:26'),
(11, '2023-11-10 08:41:07', 31, '2023-11-10 08:41:07'),
(12, '2023-11-10 08:41:53', 31, '2023-11-10 08:41:53'),
(13, '2023-11-11 03:22:08', 25, '2023-11-11 03:22:08'),
(14, '2023-11-11 03:23:05', 25, '2023-11-11 03:23:05'),
(15, '2023-11-11 03:23:46', 25, '2023-11-11 03:23:46'),
(16, '2023-11-11 03:24:41', 25, '2023-11-11 03:24:41'),
(17, '2023-11-11 03:25:57', 25, '2023-11-11 03:25:57'),
(18, '2023-11-11 04:48:21', 25, '2023-11-11 04:48:21'),
(19, '2023-11-11 04:49:02', 31, '2023-11-11 04:49:02'),
(20, '2023-11-11 04:58:07', 31, '2023-11-11 04:58:07'),
(21, '2023-11-11 05:03:53', 31, '2023-11-11 05:03:53'),
(22, '2023-11-11 05:04:51', 31, '2023-11-11 05:04:51'),
(23, '2023-11-11 05:05:24', 31, '2023-11-11 05:05:24'),
(24, '2023-11-11 05:05:31', 31, '2023-11-11 05:05:31'),
(25, '2023-12-01 23:12:41', 31, '2023-11-11 23:12:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `info_answers`
--
ALTER TABLE `info_answers`
  ADD PRIMARY KEY (`info_answer_id`);

--
-- Indexes for table `medication`
--
ALTER TABLE `medication`
  ADD PRIMARY KEY (`medication_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`visit_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `info_answers`
--
ALTER TABLE `info_answers`
  MODIFY `info_answer_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `medication`
--
ALTER TABLE `medication`
  MODIFY `medication_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `visit_id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
