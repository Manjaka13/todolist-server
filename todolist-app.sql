SET NAMES "utf8";
DROP DATABASE IF EXISTS `todolist-app`;
CREATE DATABASE IF NOT EXISTS `todolist-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `todolist-app`;

CREATE TABLE IF NOT EXISTS todo(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	task CHAR(128) NOT NULL,
	_date CHAR(10) NOT NULL,
	done BOOLEAN DEFAULT false
) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO todo(task, _date) VALUES
("Help the neighboors", "2021-01-30"),
("Clean the whole house", "2021-01-30"),
("Prepare the lunch", "2021-01-30"),
("Do some aerobic training", "2021-01-30"),
("Help kids with homework", "2021-01-31"),
("Go to the dentist", "2021-01-31");