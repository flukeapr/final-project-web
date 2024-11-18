-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2024 at 12:59 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `happymind`
--
CREATE DATABASE IF NOT EXISTS `happymind` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `happymind`;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int NOT NULL,
  `user_from` int NOT NULL,
  `user_to` int NOT NULL,
  `sender` int NOT NULL,
  `message` varchar(400) NOT NULL,
  `is_read` varchar(50) NOT NULL DEFAULT 'false',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `user_from`, `user_to`, `sender`, `message`, `is_read`, `create_at`) VALUES
(1, 9, 5, 9, 'hii', 'true', '2024-08-15 21:41:05'),
(2, 5, 9, 5, 'hello', 'true', '2024-08-15 21:52:53'),
(3, 9, 5, 9, 'gg', 'true', '2024-08-15 22:14:43'),
(4, 9, 5, 9, 'ss', 'true', '2024-08-15 22:19:42'),
(5, 7, 9, 7, 'hello', 'true', '2024-08-15 22:32:51'),
(6, 9, 5, 9, 'kub', 'true', '2024-08-15 23:28:41'),
(7, 13, 9, 13, 'hi ser', 'false', '2024-08-15 23:50:08'),
(8, 9, 5, 9, 'test', 'true', '2024-08-16 10:27:50'),
(9, 9, 7, 9, 'hello', 'true', '2024-08-16 10:42:03'),
(10, 7, 9, 7, 'สวัสดีครับ', 'true', '2024-08-24 21:48:03'),
(11, 9, 7, 9, 'มีเรื่องไม่สบายใจหรือเปล่าครับ', 'true', '2024-08-24 21:53:37'),
(12, 7, 9, 7, 'มีครับ', 'true', '2024-08-24 22:07:54'),
(13, 7, 9, 7, 'แบบ', 'true', '2024-08-24 22:08:29'),
(14, 7, 9, 7, 'จ', 'true', '2024-08-24 22:08:55'),
(15, 7, 9, 7, 'งง', 'true', '2024-08-24 22:09:45'),
(16, 9, 5, 9, 'ทดสอบบ', 'true', '2024-09-04 17:17:38'),
(17, 9, 5, 9, 'gmllllll', 'true', '2024-09-04 17:18:04'),
(18, 9, 5, 9, 'assss', 'true', '2024-09-04 17:18:38'),
(19, 9, 5, 9, 'dddd', 'true', '2024-09-04 17:18:39'),
(20, 9, 5, 9, 'sss', 'true', '2024-09-04 17:18:40'),
(21, 9, 5, 9, 'f', 'true', '2024-09-04 17:25:59'),
(22, 9, 7, 9, 'fluke', 'true', '2024-09-04 22:40:23'),
(23, 9, 7, 9, 'fluke test', 'true', '2024-09-04 22:40:35'),
(24, 9, 7, 9, 'test ja', 'true', '2024-09-04 22:44:53'),
(25, 9, 7, 9, 'สวัสดีครับ', 'true', '2024-09-15 13:40:09'),
(26, 9, 5, 9, 'test', 'true', '2024-09-15 13:41:29'),
(27, 9, 5, 9, 'สวัสดีครับ', 'true', '2024-09-15 15:04:14'),
(28, 9, 5, 9, 'hh', 'true', '2024-09-15 15:28:24'),
(29, 7, 9, 7, 'ทดสอบครับ', 'true', '2024-09-29 15:56:26'),
(30, 9, 7, 9, 'ว่าไงครับผม', 'true', '2024-09-29 15:56:45'),
(43, 7, 9, 7, 'testAdmin', 'true', '2024-09-30 18:34:25'),
(44, 7, 20, 7, 'testAdmin', 'false', '2024-09-30 18:34:25'),
(45, 7, 36, 7, 'testAdmin', 'false', '2024-09-30 18:34:25'),
(46, 7, 9, 7, 'Gg', 'true', '2024-10-01 14:40:19'),
(47, 7, 20, 7, 'Gg', 'false', '2024-10-01 14:40:19'),
(48, 7, 36, 7, 'Gg', 'false', '2024-10-01 14:40:19'),
(49, 7, 9, 7, 'T', 'true', '2024-10-14 13:41:33'),
(50, 7, 20, 7, 'T', 'false', '2024-10-14 13:41:33'),
(51, 7, 36, 7, 'T', 'false', '2024-10-14 13:41:33'),
(52, 7, 9, 7, 'G', 'false', '2024-10-14 13:44:04'),
(53, 7, 20, 7, 'G', 'false', '2024-10-14 13:44:04'),
(54, 7, 36, 7, 'G', 'false', '2024-10-14 13:44:04'),
(55, 38, 9, 38, 'Hello', 'false', '2024-10-24 01:17:38'),
(56, 38, 20, 38, 'Hello', 'false', '2024-10-24 01:17:38'),
(57, 38, 36, 38, 'Hello', 'false', '2024-10-24 01:17:38'),
(58, 28, 9, 28, 'Hello', 'false', '2024-10-24 01:34:51'),
(59, 28, 20, 28, 'Hello', 'false', '2024-10-24 01:34:51'),
(60, 28, 36, 28, 'Hello', 'false', '2024-10-24 01:34:51'),
(61, 39, 9, 39, 'hello', 'true', '2024-10-24 09:11:18'),
(62, 39, 20, 39, 'hello', 'false', '2024-10-24 09:11:18'),
(63, 39, 36, 39, 'hello', 'false', '2024-10-24 09:11:18'),
(64, 7, 9, 7, 'Test', 'false', '2024-11-16 16:28:37'),
(65, 7, 20, 7, 'Test', 'false', '2024-11-16 16:28:37'),
(66, 7, 36, 7, 'Test', 'false', '2024-11-16 16:28:37');

-- --------------------------------------------------------

--
-- Table structure for table `chat-ai`
--

CREATE TABLE `chat-ai` (
  `id` int NOT NULL,
  `user_from` int NOT NULL,
  `user_to` int NOT NULL,
  `message` varchar(1000) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `chat_view`
-- (See below for the actual view)
--
CREATE TABLE `chat_view` (
`create_at` datetime
,`id` int
,`image` varchar(255)
,`message` varchar(400)
,`name` varchar(255)
,`sender` int
,`user_from` int
,`user_to` int
);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `postId` int NOT NULL,
  `userId` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `image` int DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postId`, `userId`, `text`, `image`, `create_at`) VALUES
(1, 2, 7, 'hello  commnet', NULL, '2024-08-19 01:03:56'),
(2, 2, 5, 'hello  commnet again', NULL, '2024-08-19 01:07:50'),
(3, 1, 9, 'sawaddee', NULL, '2024-08-19 21:32:01'),
(5, 1, 7, 'เทส', NULL, '2024-08-24 22:36:39'),
(6, 25, 7, 'เทสคอมเม้นจากโทรศัพท์', NULL, '2024-08-27 15:45:18'),
(9, 36, 9, 'test', NULL, '2024-09-13 11:14:38'),
(10, 52, 9, 'น่ากิน', NULL, '2024-09-15 13:39:12'),
(11, 52, 9, 'น่าอร่อย', NULL, '2024-09-15 15:03:12'),
(12, 1, 20, 'เทส', NULL, '2024-09-24 22:11:34'),
(13, 54, 9, 'Tets', NULL, '2024-10-14 14:22:52'),
(14, 2, 28, 'Gg', NULL, '2024-10-24 08:53:09'),
(15, 54, 39, 'd', NULL, '2024-10-24 09:10:24'),
(16, 2, 7, 'Hi', NULL, '2024-11-16 16:28:26');

-- --------------------------------------------------------

--
-- Table structure for table `fighting`
--

CREATE TABLE `fighting` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(400) NOT NULL,
  `create_by` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fighting`
--

INSERT INTO `fighting` (`id`, `title`, `text`, `create_by`, `create_at`) VALUES
(1, '“What doesn’t kill you, makes you stronger. ”', ' ปัญหาต่าง ๆ ที่เกิดขึ้นอาจจะทำให้เรารู้สึกท้อแท้และสิ้นหวัง แต่เราจะไม่มีวันรู้สึกเช่นนั้นอีกเป็นครั้งที่ 2 เพราะเราได้เรียนรู้แนวทางและวิธีคิดจากปัญหาที่เกิดขึ้นแล้ว เราได้เรียนรู้ว่าวิธีการที่ดีที่สุด เราก็จะเก่งและเข้มแข็งขึ้นอย่างแน่นอน', 9, '2024-07-30 16:15:20'),
(7, '\"Difficulties might bring us down momentarily, but they also teach us resilience. Every challenge makes us more capable of handling the next.\"', '\"ความยากลำบากอาจทำให้เรารู้สึกอ่อนแอชั่วคราว แต่พวกมันก็สอนเราให้มีความยืดหยุ่น ปัญหาทุกอย่างที่ผ่านเข้ามาทำให้เราพร้อมรับมือกับสิ่งที่ตามมาได้มากขึ้น\"', 9, '2024-10-16 06:52:22'),
(8, '\"Challenges may discourage us, but once we\'ve learned from them, we won\'t feel defeated the same way again. We grow stronger and wiser with each experience.\"', '\"ปัญหาอาจทำให้เรารู้สึกท้อแท้ แต่เมื่อเราได้เรียนรู้จากมันแล้ว เราจะไม่รู้สึกพ่ายแพ้แบบเดิมอีก เราจะเติบโตและแข็งแกร่งขึ้นจากประสบการณ์นั้นอย่างแน่นอน\"', 9, '2024-10-16 06:52:22'),
(9, '\"After overcoming obstacles, we emerge stronger. Each hardship is a lesson that builds both our strength and wisdom.\"', '\"หลังจากเราผ่านอุปสรรคไปแล้ว เราจะออกมาแข็งแกร่งขึ้น ปัญหาแต่ละอย่างคือบทเรียนที่สร้างทั้งความแข็งแรงและปัญญาให้กับเรา\"', 9, '2024-10-16 06:52:22'),
(10, '\"Every setback teaches us something new. We grow more resilient and better equipped to face future challenges because we’ve learned from the past.\"', '\"ทุกความล้มเหลวสอนเราในสิ่งใหม่ เราจะเติบโตเป็นคนที่แข็งแกร่งขึ้นและพร้อมเผชิญกับปัญหาในอนาคต เพราะเราได้เรียนรู้จากอดีต\"', 9, '2024-10-16 06:52:22'),
(11, '\"Adversity helps us discover our inner strength. Each time we overcome a struggle, we gain confidence that we can face whatever comes next.\"', '\"ความทุกข์ยากทำให้เราได้ค้นพบพลังในตัวเอง ทุกครั้งที่เราผ่านพ้นปัญหา เราจะมีความมั่นใจเพิ่มขึ้นว่าเราสามารถเผชิญหน้ากับสิ่งที่จะเกิดขึ้นต่อไปได้\"', 9, '2024-10-16 06:52:22');

-- --------------------------------------------------------

--
-- Stand-in structure for view `full_post_view`
-- (See below for the actual view)
--
CREATE TABLE `full_post_view` (
`comment_create_at` datetime
,`comment_id` int
,`comment_image` int
,`comment_text` varchar(255)
,`comment_user_image` varchar(255)
,`comment_user_name` varchar(255)
,`comment_userId` int
,`post_create_at` timestamp
,`post_id` int
,`post_image` varchar(255)
,`post_likes` bigint
,`post_text` varchar(255)
,`post_user_image` varchar(255)
,`post_user_name` varchar(255)
,`post_userId` int
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `full_userquiz_view`
-- (See below for the actual view)
--
CREATE TABLE `full_userquiz_view` (
`age` varchar(30)
,`answers` json
,`create_at` timestamp
,`education` varchar(20)
,`email` varchar(255)
,`encouragement` float
,`faculty` varchar(100)
,`gender` varchar(30)
,`id` int
,`image` varchar(255)
,`major` varchar(100)
,`obstacle` float
,`pressure` float
,`question` json
,`quizId` int
,`quizName` varchar(255)
,`quizType` varchar(100)
,`risk` varchar(100)
,`total` float
,`userId` int
,`username` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `userId`, `postId`, `create_at`) VALUES
(13, 7, 54, '2024-10-01 14:18:54'),
(20, 9, 52, '2024-10-16 00:54:25'),
(22, 9, 54, '2024-10-22 16:12:22'),
(27, 38, 54, '2024-10-24 01:15:43'),
(28, 28, 54, '2024-10-24 01:33:57'),
(29, 39, 54, '2024-10-24 09:10:18'),
(30, 7, 2, '2024-11-16 16:28:29'),
(31, 40, 106, '2024-11-16 19:58:53');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int NOT NULL,
  `title` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `video` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `title`, `content`, `url`, `image`, `video`, `type`, `create_at`) VALUES
(18, 'กรมสุขภาพจิต เผยปัญหาสุขภาพจิตแรงงานไทยกลับจากอิสราเอลสูงกว่า 8,500ราย', '', 'https://www.hfocus.org/content/2023/11/28878', '/media/uploads/image/media-55.jpg', '', 'OUT', '2024-08-27 16:14:15'),
(19, 'Motion Graphic 5 ด. ดูแลใจ กำจัดด้วยหัวใจ...ไม่เครียด', '', 'https://www.springnews.co.th/lifestyle/lifestyle/831011', '/media/uploads/image/media-19.jpg', '', 'OUT', '2024-08-13 18:14:51'),
(20, 'ปัญหาสุขภาพจิต ประสบกับผู้คนมากกว่า 792 ล้านคนทั่วโลก', '', 'https://www.springnews.co.th/infographic/813868', '/media/uploads/image/media-20.jpg', '', 'OUT', '2024-08-13 18:15:20'),
(80, 'สมาธิ', '  หลายคนยังมองว่าการนั่งสมาธิเป็นเรื่องของพระภิกษุที่ต้องนั่งทุกวัน แล้วฆราวาสอย่างเรามีความจำเป็นมากน้อยแค่ไหนที่จะต้องนั่งสมาธิทุกวันเหมือนกับพระภิกษุ แล้วถ้าทำอย่างนั้นได้จริงๆ แล้วจะเกิดผลดีกับตัวเราเองอย่างไร\n\n\n    คนเราประกอบด้วย “ กาย ” กับ “ ใจ ” พระภิกษุก็มีกายกับใจ ฆราวาสเองก็มีกายกับใจเช่นเดียวกัน คนเราต้องกินข้าวทุกวัน ต้องอาบน้ำเป็นประจำทุกวันเพราะ “ อาหารกาย ” คือ ข้าวปลาอาหาร พอร่างกายเรามีฝุ่นละอองจับมีเหงื่อไคลมากเข้า เราก็ต้องอาบน้ำชำระสิ่งเหล่านี้ออกไป แล้วใจเราล่ะ “ อาหารใจ ” คือธรรมะ คือบุญ และการชำระใจให้สะอาดผ่องใส ก็คือ การสวดมนต์ ทำสมาธิภาวนา\n    ตรองเพียงแค่นี้เราก็จะได้คำตอบแล้วว่า ผู้ที่จะต้องสวดมนต์ทำสมาธิภาวนาเป็นประจำไม่ใช่เฉพาะพระภิกษุเท่านั้น แต่ฆราวาสญาติโยมก็ต้องปฏิบัติเหมือนกัน เพราะเราก็มีกายกับใจเหมือนกันกับพระภิกษุนั่นเอง เพียงแต่พระภิกษุต้องปฏิบัติอย่างเต็มที่ เพราะว่ามีเป้าหมายโดยตรงที่จะบวชเพื่อมุ่งนิพพาน\n\n\n    ผู้ใดที่สวดมนต์ ทำสมาธิภาวนาอย่างสม่ำเสมอ ใจก็จะถูกชำระให้สะอาด เกิดความผ่องใส อารมณ์ดี เบิกบาน ไม่หงุดหงิดโมโหง่าย เพราะใจถูกสะสางจัดระเบียบไปเรื่อยๆ ความเครียดในใจก็ลดลง ใจโปร่ง เบาสบาย มีความสุข\n    แต่สำหรับผู้ที่ไม่เคยสวดมนต์ทำสมาธิภาวนาเลย จะมีความเครียดสั่งสมโดยไม่รู้ตัว หน้านิ่วคิ้วขมวด สุดท้ายสติขาดพร่ามัวไปเลยก็มี แต่ถ้าสมาชิกในครอบครัวใดสวดมนต์ทำภาวนาเป็นประจำ บ้านก็เย็น ใครเข้าใกล้ก็รู้สึกสบายใจ\n\n', '', NULL, '/media/uploads/video/video-media-80.mp4', 'IN', '2024-09-06 02:44:24'),
(84, 'Test123456', 'testttttttttttttt', '.', NULL, NULL, NULL, '2024-09-27 02:37:53'),
(128, '7 วิธีดูแลสุขภาพจิต สร้างอารมณ์ดี ชีวิตมีความสุข', NULL, 'https://chulabhornchannel.cra.ac.th/health-articles/36887/', '/media/uploads/image/media-128.jpg', NULL, 'OUT', '2024-11-16 15:30:32'),
(129, 'ดูแลสุขภาพจิตยังไงให้แฮปปี้', NULL, 'https://www.bangkoklife.com/th/articles/0/152', '/media/uploads/image/media-129.jpg', NULL, 'OUT', '2024-11-16 15:31:25'),
(130, '9 วิธีในการดูแลสุขภาพจิตให้แข็งแรง เพื่อชีวิตที่มีความสุข', NULL, 'https://www.istrong.co/single-post/how-to-make-happiness-life', '/media/uploads/image/media-130.jpg', NULL, 'OUT', '2024-11-16 15:32:22'),
(131, 'เรื่องของสุขภาพจิต “ใครคิดว่าไม่สำคัญ” สุขภาพจิต สุขภาพใจ ในสถานศึกษาทั้งครูและนักเรียนที่ใครก็ไม่ควรมองข้าม', NULL, 'https://www.starfishlabz.com/blog/1292-%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95-%E0%B9%83%E0%B8%84%E0%B8%A3%E0%B8%84-%E0%B8%94%E0%B8%A7-%E0%B8%B2%E0%B9%84%E0%B8%A1-%E0%B8%AA%E0%B8%B3%E0%B8%84-%E0%B8%8D-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%83%E0%B8%88-%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%97%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%84%E0%B8%A3%E0%B8%81%E0%B9%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%84%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1', '/media/uploads/image/media-131.jpg', NULL, 'OUT', '2024-11-16 15:35:00'),
(132, 'ลดเครียดได้ด้วยวิธีง่ายๆ ที่คุณอาจมองข้าม', '11 WAYS TO RELIEVE STRESS\n\n\nลดเครียดได้ด้วยวิธีง่ายๆ ที่คุณอาจมองข้าม\n\nเรื่องโดย... ศิริกร โพธิจัทร\n\nดอกเตอร์เควิน แซปแมนเซล นักจิตวิทยาคลินิกและผู้อำนวยการ The Kentucky Center for Anxiety and Related Disorders รัฐเคนทักกี สหรัฐอเมริกา ระบุถึงวิธีลดเครียดไว้ ดังนี้ให้เทคนิคดีๆ เพื่อคุณภาพการนอนที่ดี ดังนี้\n\n⬧ จดจ่อกับปัจจัยที่ควบคุมได้ ปัญหาหรือปัจจัยที่ควบคุมไม่ได้ให้พักไว้ก่อน\n\n⬧ หลับตื่นนอนให้เขียนสิ่งที่ต้องทำโดยเรียงลำดับความสำคัญและทำเท่าที่ทำได้\n\n⬧ จัดวันพักผ่อนให้ตัวเองโดยที่ไม่ต้องทำอะไรเลยอย่างน้อย 1 วันใน 1 สัปดาห์\n\n⬧ ออกกำลังกายอย่างน้อยวันละ 20 นาทีต่อเนื่อง และยืดเหยียดร่างกายก่อนและหลังออกกำลังกายอีก 10-15 นาที\n\n⬧ จดบันทึกเรื่องราวดีๆ และสิ่งที่ทำให้คุณยิ้มหรือหัวเราะได้อย่างน้อยวันละ 1 เรื่อง\n\n⬧ ทำงานฝีมือ เพราะเป็นการใช้ประสาทสัมผัสทั้ง 5 ร่วมกับการฝึกสมาธิไปพร้อมๆ กัน\n\n⬧ ฝึกโยคะในท่าที่ได้ก้มหัวลง เช่น ท่าสุนัขแลลง (Downward-Facing Dog) จะทำให้เลือดไหลไปที่สมองได้ดีมากขึ้น\n\n⬧ ปฏิเสธให้เป็น การทำในสิ่งที่ผืนใจไม่ได้ช่วยให้คุณรู้สึกดี แต่มันจะส่งผลในทางตรงกันข้ามเสมอ\n\n⬧ แช่หรืออาบน้ำอุ่น ช่วยขจัดเซลล์ผิวที่ตายแล้ว แนะนำให้อาบหรือแช่น้ำอุ่น 10 นาที แล้วอาบน้ำเย็นปิดท้าย 5 นาที จะทำให้รู้สึกสดชื่นขึ้น\n\n⬧ ใช้เครื่องหอม เช่น โลชั่นหรือน้ำมันนวดผสมน้ำมันหอมระเหยจากสมุนไพรที่คุณชอบ เช่น ลาเวนเดอร์ ทีทรี คาโมมายล์ กุหลาบ\n\n⬧ เข้านอนและตื่นนอนในเวลาเดิม ถ้าทำได้ต่อเนื่องครบ 1 เดือน คุณก็ไม่ต้องใช้นาฬิกาปลุกอีกเลย\n\nสุดท้ายหาเวลาให้ครอบครัว เพื่อน คนรัก ใช้เวลาที่มีคุณภาพกับพวกเขาให้ได้มากที่สุดเท่าที่จะทำได้ พักเรื่องงานไว้ก่อน ไว้กลับไปที่ทำงานค่อยไปทำใหม่', NULL, NULL, NULL, 'IN', '2024-11-16 15:36:01');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `text`, `image`, `userId`, `create_at`) VALUES
(1, 'hello post test', '/post/uploads/posts/image/post-1.jpg', 5, '2024-08-18 15:27:25'),
(2, 'hello post commnet', NULL, 7, '2024-08-18 17:59:13'),
(25, 'เทสโพสต์จากโทรศัพท์', '/post/uploads/posts/image/post-25.jpg', 7, '2024-08-27 08:44:57'),
(36, 'Test ข้อความ', NULL, 20, '2024-08-28 05:50:10'),
(46, 'เทสสสสส', '/post/uploads/posts/image/post-46.jpg', 9, '2024-08-29 17:36:47'),
(48, 'ซึม', '/post/uploads/posts/image/post-48.jpg', 9, '2024-08-30 05:22:20'),
(52, 'Test', '/post/uploads/posts/image/post-52.jpg', 20, '2024-09-05 14:37:07'),
(54, 'test123', NULL, 20, '2024-09-27 02:39:20'),
(106, 'สวัสดี', NULL, 40, '2024-11-16 12:58:48');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `question` json NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `name`, `description`, `question`, `create_at`) VALUES
(6, 'แบบประเมิน MHL 29 ข้อ', 'ขอให้ท่านแสดงความคิดเห็นต่อประเด็นต่างๆ ตามระดับความคิดเห็นดังนี้  1= ไม่เห็นด้วยอย่างยิ่ง  2= ไม่เห็นด้วย 3 = ทั้งเห็นด้วยและไม่เห็นด้วย / เฉยๆ 4=  เห็นด้วย    5=  เห็นด้วยอย่างมาก', '[\"1. การออกกำลังกายที่ดีนำไปสู่ภาวะสุขภาพจิตที่ดี\", \"2. ผู้ที่มีภาวะซึมเศร้ามักรู้สึกเป็นทุกข์อย่างมาก\", \"3. ผู้ที่ป่วยเป็นโรคจิตเภทมักมีความคิดหลงผิด\", \"4. หากฉันมีความผิดปกติทางจิตใจ ฉันจะเสาะหาความช่วยเหลือจากญาติ ๆ\", \"5. หากคนที่สนิทกับฉันมีความผิดปกติทางจิตใจ ฉันจะสนับสนุนให้เขา/เธอหานักจิตวิทยา\", \"6. ความผิดปกติทางจิตใจไม่ส่งผลต่อพฤติกรรมของบุคคล\", \"7. การนอนหลับที่ดี นำไปสู่การมีสภาวะสุขภาพจิตที่ดี\", \"8. หากฉันมีความผิดปกติทางจิตใจ ฉันจะเสาะหาความช่วยเหลือจากนักจิตวิทยา\", \"9. ผู้ที่ป่วยเป็นโรควิตกกังวลอาจตื่นตระหนกในสถานการณ์ที่พวกเธอ /เขาหวาดกลัว\", \"10. คนที่มีความผิดปกติทางจิตใจ มาจากครอบครัวที่รายได้น้อย\", \"11. ถ้าคนใกล้ตัวฉันมีปัญหาทางสุขภาพจิต ฉันจะรับฟังเขา โดยไม่ตัดสินหรือวิพากษ์วิจารณ์\", \"12. การใช้แอลกอฮอล์ทำให้เกิดปัญหาทางสุขภาพจิต ได้\", \"13. ปัญหาทางสุขภาพจิตไม่ส่งผลกระทบต่อความรู้สึกของบุคคล\", \"14.หากบุคคลที่มีปัญหาด้านสุขภาพจิตได้รับการตรวจพบและการรักษาได้เร็วเท่าไร ยิ่งเป็นผลดี\", \"15. เฉพาะผู้ใหญ่เท่านั้นที่มีปัญหาทางสุขภาพจิต\", \"16. การเปลี่ยนแปลงของการทำงานของสมองอาจทำให้เกิดปัญหาทางสุขภาพจิต ได้\", \"17. ถ้าคนใกล้ตัวมีปัญหาทางสุขภาพจิต ฉันจะสนับสนุนให้เขาไปพบจิตแพทย์\", \"18. ถ้าฉันเป็นโรคทางจิต ฉันจะขอความช่วยเหลือจากเพื่อน\", \"19. การรับประทานอาหารที่สมดุลช่วยให้สุขภาพจิตดี\", \"20. หนึ่งในอาการของภาวะซึมเศร้าคือการสูญเสียความสนใจหรือความสุขในสิ่งต่างๆ \", \"21. ถ้ามีคนใกล้ตัวฉันเจ็บป่วยโรคทางจิตเวช ฉันก็ไม่สามารถช่วยอะไรได้\", \"22. ระยะเวลาของอาการเป็นเกณฑ์สำคัญอันหนึ่งสำหรับการวินิจฉัยโรคทางจิตเวช\", \"23. อาการซึมเศร้าไม่ใช่ปัญหาทางสุขภาพจิตที่แท้จริง\", \"24. การติดยาอาจทำให้เกิดปัญหาทางสุขภาพจิต\", \"25. ปัญหาทางสุขภาพจิตส่งผลกระทบต่อความคิดของบุคคล\", \"26. การทำสิ่งที่สนุกสนานส่งเสริมให้มีสุขภาพจิตที่ดี\", \"27. คนที่เป็นโรคจิตเภทอาจมองเห็นหรือได้ยินสิ่งที่ใครมองไม่เห็นหรือไม่ได้ยิน\", \"28. สถานการณ์ที่มีความเครียดสูงอาจทำให้เกิดปัญหาทางสุขภาพจิตได้\", \"29. ถ้าฉันมีปัญหาทางสุขภาพจิต ฉันจะขอความช่วยเหลือจากจิตแพทย์\"]', '2024-08-10 07:55:19'),
(7, 'แบบประเมิน RQ 20 ข้อ', NULL, '[\"1. เรื่องไม่สบายใจเล็กน้อยทำให้ฉันว้าวุ่นใจนั่งไม่ติด\", \"2. ฉันไม่ใส่ใจคนที่หัวเราะเยาะฉัน\", \"3. เมื่อฉันทำผิดพลาดหรือเสียหาย ฉันยอมรับผิดหรือผลที่ตามมา\", \"4 .ฉันเคยยอมทนลำบากเพื่ออนาคตที่ดีขึ้น\", \"5. เวลาทุกข์ใจมากๆ ฉันเจ็บป่วยไม่สบาย\", \"6. ฉันสอนและเตือนตัวเอง\", \"7. ความยากลำบากทำให้ฉันแกร่งขึ้น\", \"8. ฉันไม่จดจำเรื่องเลวร้ายในอดีต\", \"9. ถึงแม้ปัญหาจะหนักหนาเพียงใดชีวิตฉันก็ไม่เลวร้ายไปหมด\", \"10. เมื่อมีเรื่องหนักใจ ฉันมีคนปรับทุกข์ด้วย\", \"11. จากประสบการณ์ที่ผ่านมาทำให้ฉันมั่นใจว่าจะแก้ปัญหาต่างๆ ที่ผ่านเข้ามาในชีวิตได้\", \"12. ฉันมีครอบครัวและคนใกล้ชิดเป็นกำลังใจ\", \"13. ฉันมีแผนการที่จะทำให้ชีวิตก้าวไปข้างหน้า\", \"14. เมื่อมีปัญหาวิกฤตเกิดขึ้น ฉันรู้สึกว่าตัวเองไร้ความสามารถ\", \"15. เป็นเรื่องยากสำหรับฉันที่จะทำให้ชีวิตดีขึ้น\", \"16. ฉันอยากหนีไปให้พ้น หากมีปัญหาหนักหนาต้องรับผิดชอบ\", \"17. การแก้ไขปัญหาทำให้ฉันมีประสบการณ์มากขึ้น\", \"18. ในการพูดคุย ฉันหาเหตุผลที่ทุกคนยอมรับหรือเห็นด้วยกับฉันได้\", \"19. ฉันเตรียมหาทางออกไว้ หากปัญหาร้ายแรงกว่าที่คิด\", \"20. ฉันชอบฟังความคิดเห็นที่แตกต่างจากฉัน\"]', '2024-08-10 08:01:43'),
(8, 'แบบประเมิน RQ  3 ข้อ ', NULL, '[\"1. ฉันเอาชนะอุปสรรคปัญหาต่างๆ ในชีวิต ได้\", \"2. ฉันมีกำลังใจและได้รับการสนับสนุนจากคนรอบข้าง\", \"3. ฉันจัดการกับปัญหาและความเครียดของตนเองได้\"]', '2024-08-10 08:03:41');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleName`, `created_at`) VALUES
(1, 'admin', '2024-07-20 13:59:43'),
(2, 'user', '2024-07-20 13:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `gender` varchar(30) NOT NULL,
  `age` varchar(30) NOT NULL,
  `education` varchar(20) NOT NULL,
  `faculty` varchar(100) NOT NULL,
  `major` varchar(100) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `disease` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `physical_health` varchar(300) DEFAULT NULL,
  `mental_health` varchar(300) DEFAULT NULL,
  `nearby` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nearby_relation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`id`, `userId`, `gender`, `age`, `education`, `faculty`, `major`, `religion`, `disease`, `physical_health`, `mental_health`, `nearby`, `nearby_relation`) VALUES
(3, 5, 'ชาย', '20-25 ปี', 'ปี 3', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'เทคโนโลยีดิจิทัล', 'พุทธ', 'มี', 'หอบ', NULL, 'ไม่มี', NULL),
(5, 37, 'ชาย', '20-25 ปี', 'ปี 3', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'ดิจิเทค', 'พุทธ', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(6, 38, 'ชาย', 'ต่ำกว่า 20 ปี', 'ปี 1', 'สำนักวิชาวิทยาศาสตร์', 'Gg', 'พุทธ', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(7, 39, 'ชาย', '26-30 ปี', 'ปี 5', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'f', 'พุทธ', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(8, 7, 'ชาย', '20-25 ปี', 'ปี 3', 'สำนักวิชาวิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 'พุทธ', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(9, 13, 'หญิง', 'ต่ำกว่า 20 ปี', 'ปี 1', 'สำนักวิชาเทคโนโลยีการเกษตร', 'เทคโนโลยีการเกษตร', 'พุทธ', 'มี', 'ภูมิแพ้', NULL, 'มี', 'บุคคลในครอบครัว'),
(10, 14, 'ไม่ระบุเพศ', '20-25 ปี', 'ปี 2', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'การออกแบบดิจิทัล', 'คริสต์', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(11, 19, 'ชาย', '26-30 ปี', 'มากกว่าปี 6', 'สำนักวิชาพยาบาลศาสตร์', 'พยาบาลศาสตร์', 'อิสลาม', 'มี', NULL, 'ซึมเศร้า', 'มี', 'เพื่อน'),
(12, 27, 'หญิง', '20-25 ปี', 'ปี 4', 'สำนักวิชาแพทย์ศาสตร์', 'แพทยศาสตร์', 'พุทธ', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(13, 28, 'ชาย', 'ต่ำกว่า 20 ปี', 'ปี 1', 'สำนักวิชาวิทยาศาสตร์', 'เคมี', 'ฮินดู', 'ไม่มี', NULL, NULL, 'ไม่มี', NULL),
(14, 36, 'หญิง', '20-25 ปี', 'ปี 2', 'สำนักวิชาเทคโนโลยีสังคม', 'การจัดการ', 'ซิกข์', 'มี', 'โรคหัวใจ', NULL, 'ไม่มี', NULL),
(15, 40, 'ชาย', 'ต่ำกว่า 20 ปี', 'ปี 3', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'DT', 'พุทธ', 'ไม่มี', '', '', 'ไม่มี', ''),
(16, 41, 'ชาย', '20-25 ปี', 'ปี 1', 'สำนักวิชาเทคโนโลยีการเกษตร', 'ผลิตพืช', 'ไม่มีศาสนา', 'ไม่มี', '', '', 'ไม่มี', ''),
(18, 43, 'ไม่ระบุเพศ', '20-25 ปี', 'ปี 3', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'nnnnn', 'พุทธ', 'ไม่มี', '', '', 'ไม่มี', ''),
(19, 44, 'ไม่ระบุเพศ', '20-25 ปี', 'ปี 3', 'สำนักวิชาศาสตร์และศิลป์ดิจิทัล', 'ttttt', 'พุทธ', 'ไม่มี', '', '', 'ไม่มี', '');

-- --------------------------------------------------------

--
-- Table structure for table `userquiz`
--

CREATE TABLE `userquiz` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `quizId` int NOT NULL,
  `quizType` varchar(100) NOT NULL,
  `answers` json NOT NULL,
  `pressure` float DEFAULT '0',
  `encouragement` float DEFAULT '0',
  `obstacle` float DEFAULT '0',
  `total` float DEFAULT '0',
  `risk` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userquiz`
--

INSERT INTO `userquiz` (`id`, `userId`, `quizId`, `quizType`, `answers`, `pressure`, `encouragement`, `obstacle`, `total`, `risk`, `create_at`) VALUES
(4, 5, 8, 'PRE', '[1, 2, 1]', 0, 0, 0, 1.33, 'พลังใจน้อย', '2024-08-12 08:15:02'),
(5, 5, 7, 'PRE', '[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]', 26, 9, 19, 54, 'ต่ำกว่าปกติ', '2024-08-12 08:22:23'),
(6, 5, 8, 'POST', '[8, 9, 8]', 0, 0, 0, 8.33, 'พลังใจมาก', '2024-08-12 09:21:13'),
(8, 5, 6, 'PRE', '[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4]', 0, 0, 0, 3.31, 'มีความรอบรู้ด้านสุขภาพจิตปานกลาง', '2024-08-20 13:11:14'),
(12, 7, 8, 'PRE', '[1, 1, 1]', 0, 0, 0, 1, 'พลังใจน้อย', '2024-08-20 18:59:51'),
(14, 7, 6, 'PRE', '[2, 2, 2, 2, 2, 5, 5, 3, 3, 5, 3, 3, 5, 3, 5, 3, 4, 5, 3, 3, 5, 4, 5, 3, 3, 2, 2, 4, 4]', 0, 0, 0, 3.45, 'มีความรอบรู้ด้านสุขภาพจิตปานกลาง', '2024-08-20 19:29:35'),
(18, 5, 7, 'POST', '[4, 5, 4, 4, 1, 4, 5, 4, 3, 4, 4, 3, 5, 3, 2, 2, 3, 3, 3, 4]', 38, 17, 15, 70, 'สูงกว่าปกติ', '2024-08-22 15:41:12'),
(22, 7, 7, 'PRE', '[2, 3, 2, 3, 4, 4, 2, 4, 2, 3, 3, 2, 3, 4, 3, 4, 3, 2, 3, 3]', 29, 15, 15, 59, 'ปกติ', '2024-08-27 15:39:12'),
(65, 37, 8, 'PRE', '[2, 3, 4]', 0, 0, 0, 3, 'พลังใจน้อย', '2024-10-22 09:27:08'),
(66, 28, 8, 'PRE', '[8, 2, 4]', 0, 0, 0, 4.67, 'พลังใจปานกลาง', '2024-10-23 17:50:19'),
(67, 38, 8, 'PRE', '[2, 8, 4]', 0, 0, 0, 4.67, 'พลังใจปานกลาง', '2024-10-23 18:12:44'),
(69, 28, 8, 'POST', '[10, 10, 10]', 0, 0, 0, 10, 'พลังใจมาก', '2024-10-24 02:01:32'),
(70, 39, 8, 'PRE', '[4, 8, 3]', 0, 0, 0, 5, 'พลังใจปานกลาง', '2024-10-24 02:09:29'),
(72, 7, 8, 'POST', '[4, 9, 10]', 0, 0, 0, 7.67, 'พลังใจมาก', '2024-11-16 09:21:28'),
(73, 40, 8, 'PRE', '[5, 5, 5]', 0, 0, 0, 5, 'พลังใจปานกลาง', '2024-11-16 12:54:21'),
(74, 40, 8, 'POST', '[7, 2, 10]', 0, 0, 0, 6.33, 'พลังใจมาก', '2024-11-16 12:54:31'),
(75, 7, 7, 'POST', '[2, 1, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 0, 1, 1, 3, 3, 1, 3]', 54, 8, 8, 70, 'สูงกว่าปกติ', '2024-11-16 12:57:49'),
(76, 7, 7, 'POST', '[2, 1, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 0, 1, 1, 3, 3, 1, 3]', 54, 8, 8, 70, 'สูงกว่าปกติ', '2024-11-16 12:57:50'),
(77, 41, 8, 'PRE', '[10, 4, 6]', 0, 0, 0, 6.67, 'พลังใจมาก', '2024-11-16 13:20:13'),
(78, 41, 7, 'PRE', '[2, 4, 1, 4, 4, 3, 4, 1, 2, 1, 4, 3, 2, 1, 2, 0, 3, 2, 1, 4]', 54, 8, 10, 72, 'สูงกว่าปกติ', '2024-11-16 13:22:40'),
(82, 44, 8, 'PRE', '[1, 1, 1]', 0, 0, 0, 1, 'พลังใจน้อย', '2024-11-16 18:21:24'),
(83, 44, 7, 'PRE', '[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]', 75, 2, 15, 92, 'สูงกว่าปกติ', '2024-11-16 18:22:20');

-- --------------------------------------------------------

--
-- Stand-in structure for view `userquiz_view`
-- (See below for the actual view)
--
CREATE TABLE `userquiz_view` (
`answers` json
,`encouragement` float
,`id` int
,`name` varchar(255)
,`obstacle` float
,`pressure` float
,`question` json
,`quizId` int
,`quizType` varchar(100)
,`risk` varchar(100)
,`total` float
,`userId` int
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `pin`, `role_id`, `image`, `created_at`) VALUES
(5, 'fluke', 'fluke@gmail.com', '$2b$10$FoQ2R6xLJ3jiBB4vzTf8Ee3xFpFDiaJL0fmSlnmc88sKJL9m/mSfm', NULL, 2, '/images/avatars/avatar1.png', '2024-07-21 11:40:47'),
(7, 'jakk', 'jakk@gmail.com', '$2b$10$mlSNSUC1yAat16IF/cb/vuVQHF3CgPGBEf.NaMccdic/fay8y4Zn.', '$2b$08$b.zSEVtGKG7Id3T2Tr495O/qc3mrvxgcjEg.73GPNd8vmhmpBfSOq', 2, '/images/avatars/avatar2.png', '2024-07-22 20:38:00'),
(9, 'admin', 'admin@gmail.com', '$2b$10$Ou8GWDKyyVrV.TDHHzg2aOTEpk6SHPilXlVdB4zlAMyUP19YwonmG', NULL, 1, '/profile/uploads/user-9.jpg', '2024-07-24 19:59:10'),
(13, 'hon', 'hon@gmail.com', '$2b$10$RmGJz1StyS89vD4LSm8o6uLtS9Dpu8p.Lim.25GEVzr/AU.5Y7l0a', NULL, 2, '/images/avatars/avatar1.png', '2024-08-03 10:47:38'),
(14, 'win', 'win@gmail.com', '$2b$10$pj20bkc9z0LxqM0tmn4rl.fM4KSiw3Sv6HBbAVWchQFK8lio2oujG', NULL, 2, '/images/avatars/avatar3.png', '2024-08-03 10:56:21'),
(19, 'F', 'F@gmail.com', '$2b$10$NU24Iv0syJWudLE3VRmsO.mlINppWXoa0VHCKkUy7VW2LRgIr7kKu', NULL, 2, '/images/avatars/avatar1.png', '2024-08-12 10:03:11'),
(20, 'jeng', 'j@gmail.com', '$2b$10$OCuBzqKP.cvfS7mGWnvRI./5kLTuXX.A6tgB9CW47tBDUa6HIaFQu', NULL, 1, '/images/avatars/avatar4.png', '2024-08-12 15:55:56'),
(27, 'tid', 'tid@gmail.com', '$2b$10$8LP2YVdSfzWeNcUVijKmUewQMPr/8hWWMGyf26ZP5OjCCGCLtAL86', '$2b$08$dJjxkgLIPTUxLK6451FxzufUa8lHN5h7CiYJX8Q4zu/Zzz5h0jdIm', 2, '/images/avatars/avatar2.png', '2024-08-20 10:19:50'),
(28, 'Jenggggg', 'g@gmail.com', '$2b$10$vDKYddCcp67c.tB41nuL.uKil4qk1pB3QCevsAswLQm5JpUSRoGGi', NULL, 2, '/images/avatars/avatar2.png', '2024-08-30 02:27:45'),
(36, 'admin2', 'admin2@gmail.com', '$2b$10$sdidseUyE2uUvDaW9ZdN1udUl.PvcqcIjz8cMG1N7cMjl4dNvHcv.', NULL, 1, '/images/avatars/avatar6.png', '2024-09-30 11:32:45'),
(37, 'presentation', 'presentation@gmail.com', '$2b$10$G6zVjTxdP6dtnD0yEOKvJ.q1P7U2.mpNLuCCypqgi0sQJsKy.4Oz6', NULL, 2, '/images/avatars/avatar4.png', '2024-10-22 09:20:44'),
(38, 'H', 'h@g.com', '$2b$10$qfYFdPsD0fHKdctiNAAbqOTju/Y/aRveGOqQ3ux7bBKcednolZMEG', NULL, 2, '/images/avatars/avatar1.png', '2024-10-23 18:10:44'),
(39, 'f', 'f@g.com', '$2b$10$EY5K0ZW0L1Ww8qj42BMsqud42WFjtKWmG6GncGRflMX8lPj5kYOmm', NULL, 2, '/images/avatars/avatar6.png', '2024-10-24 02:07:36'),
(40, 'ธันวา', 'ชนะสาร', '$2b$10$rSdItOe1ThjRG8k8I5aR7eX7NM11VEKrbd6EdFfdr1IuqzUYPMyKy', NULL, 2, '/images/avatars/avatar1.png', '2024-11-16 12:49:50'),
(41, 'นัทมาแล้ว', 'TANAWAT1801@gmail.com', '$2b$10$Z3zsji3ujzBqXbK6wNHOFuwnmkNj2QHOlIux6EA9p40AOa169Qd1u', NULL, 2, '/images/avatars/avatar4.png', '2024-11-16 13:16:10'),
(43, 'nnnnnnnn', '11111@gmail.com', '$2b$10$O0U7O0l7IQgKB43o4YP47uvgrWiZK0OxNhUgLEHLFNTG9G572Y7wC', NULL, 2, '/images/avatars/avatar4.png', '2024-11-16 18:15:40'),
(44, '222', '222@gmail.com', '$2b$10$LmARVPT3wUUYRsw4/TWmouwC13XNx/4aQ7CRM64jTbWWKY2.AzQC2', NULL, 2, '/images/avatars/avatar6.png', '2024-11-16 18:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `userscore`
--

CREATE TABLE `userscore` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `preRq20` float DEFAULT '0',
  `preRq3` float DEFAULT '0',
  `postRq20` float DEFAULT '0',
  `postRq3` float DEFAULT '0',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'unfollow'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userscore`
--

INSERT INTO `userscore` (`id`, `userId`, `preRq20`, `preRq3`, `postRq20`, `postRq3`, `status`) VALUES
(3, 5, 54, 1.33, 70, 8.33, 'unfollow'),
(5, 7, 61, 5, 70, 7.67, 'follow'),
(6, 9, 0, 0, 0, 0, 'unfollow'),
(7, 13, 0, 0, 0, 0, 'unfollow'),
(8, 14, 0, 0, 0, 0, 'unfollow'),
(13, 19, 0, 0, 0, 0, 'unfollow'),
(14, 20, 0, 6, 0, 8.33, 'unfollow'),
(21, 27, 0, 0, 0, 0, 'unfollow'),
(22, 28, 58, 4.67, 75, 10, 'follow'),
(30, 36, 0, 0, 0, 0, 'unfollow'),
(31, 37, 0, 3, 0, 0, 'unfollow'),
(32, 38, 0, 4.67, 0, 0, 'unfollow'),
(33, 39, 0, 5, 0, 0, 'unfollow'),
(34, 40, 0, 5, 0, 6.33, 'unfollow'),
(35, 41, 72, 6.67, 0, 0, 'unfollow'),
(37, 43, 0, 0, 0, 0, 'unfollow'),
(38, 44, 92, 1, 0, 0, 'unfollow');

-- --------------------------------------------------------

--
-- Stand-in structure for view `userscore_view`
-- (See below for the actual view)
--
CREATE TABLE `userscore_view` (
`email` varchar(255)
,`id` int
,`image` varchar(255)
,`name` varchar(255)
,`postRq20` float
,`postRq3` float
,`preRq20` float
,`preRq3` float
,`role` int
,`status` varchar(100)
);

-- --------------------------------------------------------

--
-- Structure for view `chat_view`
--
DROP TABLE IF EXISTS `chat_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`adminHappy`@`localhost` SQL SECURITY DEFINER VIEW `chat_view`  AS SELECT `c`.`id` AS `id`, `c`.`user_from` AS `user_from`, `c`.`user_to` AS `user_to`, `c`.`sender` AS `sender`, `c`.`message` AS `message`, `c`.`create_at` AS `create_at`, `u`.`name` AS `name`, `u`.`image` AS `image` FROM (`chat` `c` left join `users` `u` on((`c`.`sender` = `u`.`id`)))  ;

-- --------------------------------------------------------

--
-- Structure for view `full_post_view`
--
DROP TABLE IF EXISTS `full_post_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`adminHappy`@`localhost` SQL SECURITY DEFINER VIEW `full_post_view`  AS SELECT `p`.`post_id` AS `post_id`, `p`.`text` AS `post_text`, `p`.`image` AS `post_image`, count(`likes`.`postId`) AS `post_likes`, `p`.`userId` AS `post_userId`, `u`.`name` AS `post_user_name`, `u`.`image` AS `post_user_image`, `p`.`create_at` AS `post_create_at`, `c`.`id` AS `comment_id`, `c`.`text` AS `comment_text`, `c`.`image` AS `comment_image`, `c`.`userId` AS `comment_userId`, `cu`.`name` AS `comment_user_name`, `cu`.`image` AS `comment_user_image`, `c`.`create_at` AS `comment_create_at` FROM ((((`post` `p` left join `comments` `c` on((`p`.`post_id` = `c`.`postId`))) left join `users` `u` on((`u`.`id` = `p`.`userId`))) left join `users` `cu` on((`cu`.`id` = `c`.`userId`))) left join `likes` on((`p`.`post_id` = `likes`.`postId`))) GROUP BY `p`.`post_id`, `c`.`id`, `c`.`text`, `c`.`userId`, `c`.`create_at` ORDER BY `p`.`create_at` ASC, `c`.`create_at` ASC  ;

-- --------------------------------------------------------

--
-- Structure for view `full_userquiz_view`
--
DROP TABLE IF EXISTS `full_userquiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`adminHappy`@`localhost` SQL SECURITY DEFINER VIEW `full_userquiz_view`  AS SELECT `uq`.`id` AS `id`, `q`.`name` AS `quizName`, `q`.`question` AS `question`, `uq`.`quizId` AS `quizId`, `uq`.`quizType` AS `quizType`, `uq`.`answers` AS `answers`, `uq`.`pressure` AS `pressure`, `uq`.`encouragement` AS `encouragement`, `uq`.`obstacle` AS `obstacle`, `uq`.`total` AS `total`, `uq`.`risk` AS `risk`, `uq`.`create_at` AS `create_at`, `uq`.`userId` AS `userId`, `u`.`name` AS `username`, `u`.`email` AS `email`, `u`.`image` AS `image`, `ud`.`gender` AS `gender`, `ud`.`age` AS `age`, `ud`.`education` AS `education`, `ud`.`faculty` AS `faculty`, `ud`.`major` AS `major` FROM (((`userquiz` `uq` left join `users` `u` on((`uq`.`userId` = `u`.`id`))) left join `quiz` `q` on((`q`.`id` = `uq`.`quizId`))) left join `userdata` `ud` on((`uq`.`userId` = `ud`.`userId`))) ORDER BY `uq`.`quizId` ASC  ;

-- --------------------------------------------------------

--
-- Structure for view `userquiz_view`
--
DROP TABLE IF EXISTS `userquiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`adminHappy`@`localhost` SQL SECURITY DEFINER VIEW `userquiz_view`  AS SELECT `userquiz`.`id` AS `id`, `userquiz`.`userId` AS `userId`, `userquiz`.`quizId` AS `quizId`, `userquiz`.`answers` AS `answers`, `userquiz`.`quizType` AS `quizType`, `userquiz`.`pressure` AS `pressure`, `userquiz`.`encouragement` AS `encouragement`, `userquiz`.`obstacle` AS `obstacle`, `userquiz`.`total` AS `total`, `userquiz`.`risk` AS `risk`, `quiz`.`name` AS `name`, `quiz`.`question` AS `question` FROM (`userquiz` left join `quiz` on((`userquiz`.`quizId` = `quiz`.`id`)))  ;

-- --------------------------------------------------------

--
-- Structure for view `userscore_view`
--
DROP TABLE IF EXISTS `userscore_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`adminHappy`@`localhost` SQL SECURITY DEFINER VIEW `userscore_view`  AS SELECT `users`.`id` AS `id`, `users`.`name` AS `name`, `users`.`email` AS `email`, `users`.`image` AS `image`, `users`.`role_id` AS `role`, `userscore`.`preRq20` AS `preRq20`, `userscore`.`preRq3` AS `preRq3`, `userscore`.`postRq20` AS `postRq20`, `userscore`.`postRq3` AS `postRq3`, `userscore`.`status` AS `status` FROM (`users` left join `userscore` on((`userscore`.`userId` = `users`.`id`))) GROUP BY `users`.`id`, `users`.`name`, `users`.`email`, `users`.`image`, `userscore`.`preRq20`, `userscore`.`preRq3`, `userscore`.`postRq20`, `userscore`.`postRq3`, `userscore`.`status``status`  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_chat` (`user_to`,`user_from`),
  ADD KEY `chat_user_from_fk` (`user_from`);

--
-- Indexes for table `chat-ai`
--
ALTER TABLE `chat-ai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_post_id_fk` (`postId`),
  ADD KEY `comment_user_fk` (`userId`);

--
-- Indexes for table `fighting`
--
ALTER TABLE `fighting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likes-post-userId-fk` (`userId`),
  ADD KEY `likes-post-postId-fk` (`postId`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_user_fk` (`userId`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `userquiz`
--
ALTER TABLE `userquiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userquiz_quizId_fk` (`quizId`),
  ADD KEY `userquiz_userId_fk` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- Indexes for table `userscore`
--
ALTER TABLE `userscore`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userscore_userId_fk` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `chat-ai`
--
ALTER TABLE `chat-ai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `fighting`
--
ALTER TABLE `fighting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `userquiz`
--
ALTER TABLE `userquiz`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `userscore`
--
ALTER TABLE `userscore`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_user_from_fk` FOREIGN KEY (`user_from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_user_to_fk` FOREIGN KEY (`user_to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_post_id_fk` FOREIGN KEY (`postId`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes-post-postId-fk` FOREIGN KEY (`postId`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes-post-userId-fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `userdata`
--
ALTER TABLE `userdata`
  ADD CONSTRAINT `userdata_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userquiz`
--
ALTER TABLE `userquiz`
  ADD CONSTRAINT `userquiz_quizId_fk` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userquiz_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roleId_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userscore`
--
ALTER TABLE `userscore`
  ADD CONSTRAINT `userscore_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
