CREATE SCHEMA `ssafy24` DEFAULT CHARACTER SET utf8mb4 ;
use `ssafy24`;
CREATE TABLE `hospital_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(25) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `business_number` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `code` INTEGER(6) NULL,
    `logo_image` VARCHAR(255) NULL DEFAULT 'default_image',
    `approval` BOOLEAN NOT NULL DEFAULT FALSE,
    `admin_approval` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE `hospital_notice` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`hospital_id` INTEGER NOT NULL,
	`title`	VARCHAR(50) NOT NULL,
	`context` VARCHAR(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT current_timestamp,
	`updated_at` timestamp NOT NULL DEFAULT current_timestamp,
	`views`	INTEGER	NULL DEFAULT 0,
	`fixed`	BOOLEAN	NOT NULL DEFAULT False,
	`attachment` VARCHAR(255) NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(hospital_id)
    REFERENCES  hospital_info(id) 
);

CREATE TABLE `hospital_event` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`hospital_id` INTEGER NOT NULL,
	`title`	VARCHAR(50) NOT NULL,
	`context` VARCHAR(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT current_timestamp,
	`updated_at` timestamp NOT NULL DEFAULT current_timestamp,
	`start_at` DATETIME NOT NULL,
	`end_at` DATETIME NULL,
	`views`	INTEGER	NULL DEFAULT 0,
	`attachment` VARCHAR(255) NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(hospital_id)
    REFERENCES  hospital_info(id) 
);

CREATE TABLE `service_notice` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`title`	VARCHAR(50) NOT NULL,
	`context` VARCHAR(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT current_timestamp,
	`updated_at` timestamp NOT NULL DEFAULT current_timestamp,
	`views`	INTEGER	NULL DEFAULT 0,
	`fixed`	BOOLEAN	NOT NULL DEFAULT False,
	`attachment` VARCHAR(255) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `hospital_survey` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`hospital_id` INTEGER NOT NULL,
	`created_at`  timestamp NOT NULL DEFAULT current_timestamp,
	`updated_at` timestamp NOT NULL DEFAULT current_timestamp,
	`start_at` DATETIME NOT NULL,
	`end_at` DATETIME NULL,
	`count`	 INTEGER NULL DEFAULT 0,
	`title`	 VARCHAR(50) NOT NULL,
	`context` VARCHAR(255) NOT NULL,
	`output_link` VARCHAR(255) NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(hospital_id)
    REFERENCES  hospital_info(id) on delete cascade
);

CREATE TABLE `question` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`survey_id`	INTEGER	NOT NULL,
	`order`	INTEGER	NULL,
	`context` VARCHAR(255) NOT NULL,
	`type` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY(id),
    FOREIGN KEY(survey_id)
    REFERENCES  hospital_survey(id) on delete cascade
);

CREATE TABLE `option` (
	`id`INTEGER	NOT NULL AUTO_INCREMENT,
	`question_id` INTEGER NOT NULL,
	`count`	INTEGER	NULL DEFAULT 0,
	`context` VARCHAR(255) NOT NULL,
	`weight` INTEGER NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(question_id)
    REFERENCES  question(id) on delete cascade
);

CREATE TABLE `score_sum` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`survey_id`	INTEGER	NOT NULL,
	`score_sum`	INTEGER	NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(survey_id)
    REFERENCES  hospital_survey(id) on delete cascade
);

CREATE TABLE `subjective_answer` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`question_id` INTEGER NOT NULL,
	`answer` VARCHAR(255) NULL,
	PRIMARY KEY(id),
    FOREIGN KEY(question_id)
    REFERENCES  question(id) on delete cascade
);

CREATE TABLE `benchmark` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`survey_id`	INTEGER	NOT NULL,
	`benchmark`	INTEGER	NULL,
	`output_text` VARCHAR(255) NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(survey_id)
    REFERENCES  hospital_survey(id) on delete cascade
);