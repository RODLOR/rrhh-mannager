CREATE DATABASE `RRHH_mannager`;
DROP DATABASE `RRHH_mannager`;

USE `RRHH_mannager`;

CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tel VARCHAR(20),
        profile_photo VARCHAR(255)
    );

CREATE TABLE
    employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_number VARCHAR(20) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(100) NOT NULL,
        tel VARCHAR(20) NOT NULL,
        sal DECIMAL(20, 2) NOT NULL,
        role VARCHAR(50) NOT NULL,
        department VARCHAR(50) NOT NULL,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN NOT NULL DEFAULT TRUE
    );


CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_at VARCHAR(20) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
