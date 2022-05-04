CREATE DATABASE IF NOT EXISTS db_Invoice_PDF;

USE db_Invoice_PDF;

CREATE TABLE t_Example(
    id INT,
    test VARCHAR(25)
);

INSERT INTO t_Example VALUES(1, "Prueba Base De Datos");

CREATE TABLE t_Registros(
    dpi_cliente VARCHAR(25) NOT NULL,
    nombre_Completo VARCHAR(100) NOT NULL
)