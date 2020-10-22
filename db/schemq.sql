CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL DEFAULT "Burger",
	devoured BOOLEAN DEFAULT false,
	favorite BOOLEAN DEFAULT false,
	rating INT(3) DEFAULT 0,
	PRIMARY KEY (id)
);

SELECT * FROM burgers;