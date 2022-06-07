CREATE DATABASE empleados;

CREATE TABLE empleado(
id SERIAL PRIMARY KEY,
nombre VARCHAR(20),
apellido1 VARCHAR(20),
apellido2 VARCHAR(20),
nombre2 VARCHAR(50),
cedula INTEGER,
email VARCHAR(50),
pais VARCHAR(20),
hora DATE
);