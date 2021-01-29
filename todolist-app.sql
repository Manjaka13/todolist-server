SET NAMES "utf8";
DROP DATABASE IF EXISTS `todolist-app`;
CREATE DATABASE IF NOT EXISTS `todolist-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `todolist-app`;

CREATE TABLE IF NOT EXISTS todo(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	task CHAR(128) NOT NULL,
	_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	done BOOLEAN DEFAULT false
) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO todo(task, _date) VALUES
("Help the neighboors", "2020-09-13"),
("Clean the whole house", "2020-09-13"),
("Prepare the lunch", "2020-09-13"),
("Do some aerobic training", "2020-09-13"),
("Help kids with homework", "2020-09-13"),
("Go to the dentist", "2020-09-13");