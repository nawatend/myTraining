-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 29, 2020 at 11:29 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_my_training`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardio_level` int(11) NOT NULL,
  `muscle_level` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_info` json DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `trainer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `title`, `image_path`, `video_path`, `cardio_level`, `muscle_level`, `type`, `main_info`, `description`, `trainer_id`) VALUES
(1, 'Running', 'running.jpg', 'running.mp4', 4, 1, 'time', '{\"time\": \"20 min\"}', 'Running is boring on threadmill.Running is boring on threadmill.Running is boring on threadmill.Running is boring on threadmill.Running is boring on threadmill.', 2),
(2, 'Squat', 'squat.jpg', 'squat.mp4', 2, 5, 'reps', '{\"set\": \"3-4\", \"reps\": \"6 - 8\", \"rest\": \"2 min\"}', 'Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. Squat is good for everything. ', 1),
(3, 'Pull Up', 'pull_up.jpg', 'pull_up.mp4', 1, 4, 'reps', '{\"reps\": \"6-8\", \"rest\": \"2 min\", \"sets\": \"3-4\"}', 'Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.Pull up is best army training.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `exercise_workout_session`
--

CREATE TABLE `exercise_workout_session` (
  `exercise_id` int(11) NOT NULL,
  `workout_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `workout_session_id` int(11) NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `seen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20200315201000', '2020-03-15 20:10:23'),
('20200315201232', '2020-03-15 20:12:40'),
('20200316212809', '2020-03-16 21:28:34'),
('20200316212947', '2020-03-16 21:29:53'),
('20200316213244', '2020-03-16 21:32:49'),
('20200316213856', '2020-03-16 21:39:03'),
('20200316214454', '2020-03-16 21:45:00'),
('20200316220522', '2020-03-16 22:05:27'),
('20200323225949', '2020-03-23 22:59:56'),
('20200326184410', '2020-03-26 18:44:18'),
('20200329103503', '2020-03-29 10:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `sporter_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sporter`
--

CREATE TABLE `sporter` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_days_trained` int(11) NOT NULL,
  `days_trained_streak` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `goals` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sporter`
--

INSERT INTO `sporter` (`id`, `user_id`, `total_days_trained`, `days_trained_streak`, `weight`, `height`, `goals`) VALUES
(1, 2, 0, 0, 75, 175, '[\"fatloss\",\"cardio\"]'),
(2, 5, 0, 0, 80, 165, '[\"fatloss\"]'),
(3, 8, 0, 0, 70, 178, '[\"fatloss\",\"muscle\"]');

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`id`, `user_id`, `description`, `address`, `mobile`) VALUES
(1, 4, 'Training is stupid. Training is stupid. Training is stupid. Training is stupid. Training is stupid. Training is stupid. Training is stupid. ', 'Training Address', '04 77 66 437'),
(2, 6, 'test Description', 'Training Address', '04 77 66 442'),
(3, 7, 'test Description', 'Training Address', '04 77 66 442');

-- --------------------------------------------------------

--
-- Table structure for table `trainer_sporter`
--

CREATE TABLE `trainer_sporter` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `sporter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainer_sporter`
--

INSERT INTO `trainer_sporter` (`id`, `trainer_id`, `sporter_id`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `nickname`, `first_name`, `last_name`, `avatar`) VALUES
(1, 'admin@gmail.com', '[\"ROLE_ADMIN\"]', '$argon2id$v=19$m=65536,t=4,p=1$cjBXS2k4MjRpa3dTblBTMQ$QJqWb1vTNi6sVWQXABNrjLWStj75GMqtlX9hHiLEAEQ', 'LT. Future', 'Nawang', 'Tendar', NULL),
(2, 's@gmail.com', '[\"ROLE_SPORTER\"]', '$argon2id$v=19$m=65536,t=4,p=1$cnlRYkhTRExZSDdNUzRKbw$o9RFDgHr6YYcCbLzkB88y+fb1eQeioiDYxuWYIy1AZY', 'Little John', 'Sporteriis', 'Nucleas', NULL),
(4, 't@gmail.com', '[\"ROLE_TRAINER\"]', '$argon2id$v=19$m=65536,t=4,p=1$UXV2UXlHTjdhWUhJNFlxWA$0g5P25ElcEVbtdShgaFlBoFBWJXrPaw8zjMHG78sHXQ', 'trainer test update', 'Sporteriis', 'Nucleas', NULL),
(5, 's2@gmail.com', '[\"ROLE_SPORTER\"]', '$argon2id$v=19$m=65536,t=4,p=1$LjFob0JLeldpL1FJUThVVQ$mcY1G56D6OaTawb+1fWVFp7qrLyrGjWlulILxT6xog8', 'API Sport', 'Mr API', 'REST', NULL),
(6, 't2@gmail.com', '[\"ROLE_TRAINER\"]', '$argon2id$v=19$m=65536,t=4,p=1$S2lZRE1LSDl0V092a0FyYg$Y+ov9m+XsUfSeZmmxlI2CTju5T/WLPKZH3VArF27fwg', 'Trainer 2', 'Sporteriis', 'Nucleas', NULL),
(7, 't3@gmail.com', '[\"ROLE_TRAINER\"]', '$argon2id$v=19$m=65536,t=4,p=1$c093UGFsU2FyOFJsRjBPVA$8jcOvLBL83TGUbwFo91JGpdmOwbEsMtxgJzZqmfAZwQ', 'Trainer 3', 'Little', 'Nucleas', NULL),
(8, 's3@gmail.com', '[\"ROLE_SPORTER\"]', '$argon2id$v=19$m=65536,t=4,p=1$NVpObVJMbGZMbEh6Lm51Ng$kP55YMceUoL0TfvOsA2miPFb2ucAC13cslrYsIklVow', 'Tick ', 'Hello', 'REST', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workout_session`
--

CREATE TABLE `workout_session` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardio_level` int(11) NOT NULL,
  `muscle_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workout_session_sporter`
--

CREATE TABLE `workout_session_sporter` (
  `id` int(11) NOT NULL,
  `workoutsession_id` int(11) NOT NULL,
  `sporter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_AEDAD51CFB08EDF6` (`trainer_id`);

--
-- Indexes for table `exercise_workout_session`
--
ALTER TABLE `exercise_workout_session`
  ADD PRIMARY KEY (`exercise_id`,`workout_session_id`),
  ADD KEY `IDX_FC788572E934951A` (`exercise_id`),
  ADD KEY `IDX_FC788572D1BA355` (`workout_session_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D2294458F624B39D` (`sender_id`),
  ADD KEY `IDX_D2294458D1BA355` (`workout_session_id`);

--
-- Indexes for table `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_2201F246E53C25F2` (`sporter_id`),
  ADD KEY `IDX_2201F246E934951A` (`exercise_id`);

--
-- Indexes for table `sporter`
--
ALTER TABLE `sporter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_64E3DFFCA76ED395` (`user_id`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_C5150820A76ED395` (`user_id`);

--
-- Indexes for table `trainer_sporter`
--
ALTER TABLE `trainer_sporter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_A8DCE633E53C25F2` (`sporter_id`),
  ADD KEY `IDX_A8DCE633FB08EDF6` (`trainer_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- Indexes for table `workout_session`
--
ALTER TABLE `workout_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_AC82B97CFB08EDF6` (`trainer_id`);

--
-- Indexes for table `workout_session_sporter`
--
ALTER TABLE `workout_session_sporter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B8167769E792A96` (`workoutsession_id`),
  ADD KEY `IDX_B8167769E53C25F2` (`sporter_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sporter`
--
ALTER TABLE `sporter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trainer_sporter`
--
ALTER TABLE `trainer_sporter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `workout_session`
--
ALTER TABLE `workout_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workout_session_sporter`
--
ALTER TABLE `workout_session_sporter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `FK_AEDAD51CFB08EDF6` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`);

--
-- Constraints for table `exercise_workout_session`
--
ALTER TABLE `exercise_workout_session`
  ADD CONSTRAINT `FK_FC788572D1BA355` FOREIGN KEY (`workout_session_id`) REFERENCES `workout_session` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_FC788572E934951A` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `FK_D2294458D1BA355` FOREIGN KEY (`workout_session_id`) REFERENCES `workout_session` (`id`),
  ADD CONSTRAINT `FK_D2294458F624B39D` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `FK_2201F246E53C25F2` FOREIGN KEY (`sporter_id`) REFERENCES `sporter` (`id`),
  ADD CONSTRAINT `FK_2201F246E934951A` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`id`);

--
-- Constraints for table `sporter`
--
ALTER TABLE `sporter`
  ADD CONSTRAINT `FK_64E3DFFCA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `trainer`
--
ALTER TABLE `trainer`
  ADD CONSTRAINT `FK_C5150820A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `trainer_sporter`
--
ALTER TABLE `trainer_sporter`
  ADD CONSTRAINT `FK_A8DCE633E53C25F2` FOREIGN KEY (`sporter_id`) REFERENCES `sporter` (`id`),
  ADD CONSTRAINT `FK_A8DCE633FB08EDF6` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`);

--
-- Constraints for table `workout_session`
--
ALTER TABLE `workout_session`
  ADD CONSTRAINT `FK_AC82B97CFB08EDF6` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`);

--
-- Constraints for table `workout_session_sporter`
--
ALTER TABLE `workout_session_sporter`
  ADD CONSTRAINT `FK_B8167769E53C25F2` FOREIGN KEY (`sporter_id`) REFERENCES `sporter` (`id`),
  ADD CONSTRAINT `FK_B8167769E792A96` FOREIGN KEY (`workoutsession_id`) REFERENCES `workout_session` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
