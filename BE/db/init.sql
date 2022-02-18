use `ssafy24`;

CREATE TABLE `hospital_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `business_number` varchar(50) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `code` varchar(6) DEFAULT NULL,
  `logo_image` varchar(255) DEFAULT 'default_image.png',
  `approval` tinyint(1) NOT NULL DEFAULT '0',
  `admin_approval` tinyint(1) NOT NULL DEFAULT '0',
  `todayCnt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hospital_event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_id` int NOT NULL,
  `title` TEXT NOT NULL,
  `context` TEXT NOT NULL,
  `created_at` timestamp NOT NULL ,
  `updated_at` timestamp DEFAULT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `views` int DEFAULT '0',
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `hospital_event_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hospital_notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_id` int NOT NULL,
  `title` TEXT NOT NULL,
  `context` TEXT NOT NULL,
  `created_at` timestamp NOT NULL ,
  `updated_at` timestamp DEFAULT NULL,
  `views` int DEFAULT '0',
  `fixed` tinyint(1) NOT NULL DEFAULT '0',
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `hospital_notice_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hospital_survey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_id` int NOT NULL,
  `category` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp DEFAULT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `count` int DEFAULT '0',
  `title` TEXT NOT NULL,
  `context` TEXT NOT NULL,
  `output_link` TEXT DEFAULT NULL,
  `reservation_link` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `hospital_survey_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `survey_id` int NOT NULL,
  `order` int DEFAULT NULL,
  `context` TEXT NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `hospital_survey` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `option` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `order` int DEFAULT NULL,
  `count` int DEFAULT '0',
  `context` TEXT NOT NULL,
  `weight` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `option_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subjective_answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `answer` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `subjective_answer_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `benchmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `survey_id` int NOT NULL,
  `benchmark` int DEFAULT NULL,
  `output_text` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `benchmark_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `hospital_survey` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `score_sum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `survey_id` int NOT NULL,
  `score_sum` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `score_sum_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `hospital_survey` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `survey_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `survey_id` int NOT NULL,
  `age` int DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `result_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `hospital_survey` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `service_notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `context` TEXT NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp DEFAULT NULL,
  `views` int DEFAULT '0',
  `fixed` tinyint(1) NOT NULL DEFAULT '0',
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
