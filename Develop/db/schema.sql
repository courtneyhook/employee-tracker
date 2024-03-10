DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(30)
);

CREATE TABLE role (
    id                INT PRIMARY KEY AUTO_INCREMENT,
    title             VARCHAR(30),
    salary            DECIMAL,
    department_id     INT,
    is_manager        BOOLEAN DEFAULT '0',

    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    first_name          VARCHAR(30),
    last_name           VARCHAR(30),
    role_id             INT,
    manager_id          INT,

    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

ALTER TABLE role AUTO_INCREMENT = 100;
ALTER TABLE employee AUTO_INCREMENT = 1000;