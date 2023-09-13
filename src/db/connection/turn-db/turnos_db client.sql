-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 04:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `turnos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `BUSINESS_ID` varchar(255) NOT NULL,
  `BUSINESS_NAME` varchar(255) NOT NULL,
  `ACRONYM` varchar(100) DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `PHONE_1` varchar(50) DEFAULT NULL,
  `PHONE_2` varchar(50) DEFAULT NULL,
  `EMAIL_1` varchar(255) DEFAULT NULL,
  `EMAIL_2` varchar(255) DEFAULT NULL,
  `GENERIC_FIELD_1` varchar(255) DEFAULT NULL,
  `GENERIC_FIELD_2` varchar(255) DEFAULT NULL,
  `SLOGAN` varchar(255) DEFAULT NULL,
  `LOGO` varchar(500) DEFAULT NULL,
  `STATUS` char(1) NOT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(100) DEFAULT NULL,
  `UPDATED_DATE` datetime DEFAULT NULL,
  `UPDATED_USER` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`BUSINESS_ID`, `BUSINESS_NAME`, `ACRONYM`, `ADDRESS`, `PHONE_1`, `PHONE_2`, `EMAIL_1`, `EMAIL_2`, `GENERIC_FIELD_1`, `GENERIC_FIELD_2`, `SLOGAN`, `LOGO`, `STATUS`, `CREATED_DATE`, `CREATED_USER`, `UPDATED_DATE`, `UPDATED_USER`) VALUES
('001', 'TEST', 'TST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `CLIENT_ID` varchar(255) NOT NULL,
  `EMPLOYEE_ID` varchar(255) DEFAULT NULL,
  `BUSINNES_ID` varchar(255) NOT NULL,
  `USERNAME` varchar(200) NOT NULL,
  `PHONE` varchar(20) NOT NULL,
  `ESTATUS` char(1) NOT NULL,
  `CREATED_USER` varchar(255) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `UPDATED_USER` varchar(255) NOT NULL,
  `UPDATED_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `EMPLOYEE_ID` varchar(255) NOT NULL,
  `USER_ID` varchar(200) NOT NULL,
  `USERNAME` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) NOT NULL,
  `FIRST_NAME` varchar(255) NOT NULL,
  `BIRTHDATE` datetime DEFAULT NULL,
  `HIREDATE` datetime DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `CITY` varchar(100) DEFAULT NULL,
  `PHONE_NUMBER` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `POSITION_ID` varchar(255) DEFAULT NULL,
  `BUSINESS_ID` varchar(255) NOT NULL,
  `ESTATUS` char(1) NOT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(100) DEFAULT NULL,
  `UPDATED_DATE` datetime DEFAULT NULL,
  `UPDATED_USER` varchar(100) DEFAULT NULL,
  `WAITING_TIME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EMPLOYEE_ID`, `USER_ID`, `USERNAME`, `LAST_NAME`, `FIRST_NAME`, `BIRTHDATE`, `HIREDATE`, `ADDRESS`, `CITY`, `PHONE_NUMBER`, `EMAIL`, `POSITION_ID`, `BUSINESS_ID`, `ESTATUS`, `CREATED_DATE`, `CREATED_USER`, `UPDATED_DATE`, `UPDATED_USER`, `WAITING_TIME`) VALUES
('1', '', 'RUBIO', '', '', NULL, NULL, NULL, NULL, '8296575599', 'RUBIO@gmail.com', NULL, '001', 'A', NULL, NULL, NULL, NULL, 30),
('2', '', 'pedro', '', '', NULL, NULL, NULL, NULL, '4984948494', 'pedro@gmail.com', NULL, '001', 'A', NULL, NULL, NULL, NULL, 30),
('3', '', 'JUAN', '', '', NULL, NULL, NULL, NULL, '99898428', 'JUAN@GMAI.COM', NULL, '001', 'A', NULL, NULL, NULL, NULL, 30);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `ID` varchar(255) NOT NULL,
  `BUSINESS_ID` varchar(255) DEFAULT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `PARENT_MENU` varchar(255) DEFAULT NULL,
  `STATUS` char(1) DEFAULT NULL,
  `MODULE` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=630 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`ID`, `BUSINESS_ID`, `NAME`, `DESCRIPTION`, `PARENT_MENU`, `STATUS`, `MODULE`) VALUES
('01', '001', 'Dashboard', 'Dashboard', '1', 'A', '/'),
('02', '001', 'Clientes', 'Clientes', '1', 'A', NULL),
('02-1', '001', 'Clientes', 'Clientes', '02', 'A', '/clients'),
('02-2', '001', 'Contactos', 'Contactos', '02', 'A', '/contacts'),
('03', '001', 'Inventario', 'Inventario', '1', 'A', NULL),
('03-1', '001', 'Productos', 'Productos', '03', 'A', '/products'),
('03-2', '001', 'Categorias', 'Categorias', '03', 'A', '/category'),
('04', '001', 'Ordenes', 'Ordenes', '1', 'A', NULL),
('04-1', '001', 'Nueva orden', 'Nueva orden', '04', 'A', '/new_order'),
('04-2', '001', 'Cuentas por cobrar', 'Cuentas por cobrar', '04', 'A', '/cxc'),
('04-3', '001', 'Historial de ventas', 'Historial de ventas', '04', 'A', '/orders'),
('05', '001', 'Compras', 'Compras', '1', 'A', NULL),
('05-1', '001', 'Nueva compra', 'Nueva compra', '05', 'A', '/new_purchase'),
('05-2', '001', 'Cuentas por pagar', 'Cuentas por pagar', '05', 'A', '/cxp'),
('05-3', '001', 'Historial de compras', 'historial de compras', '05', 'A', '/purchases'),
('06', '001', 'Proveedores', 'Proveedores', '1', 'A', '/suppliers'),
('07', '001', 'RRHH', 'RRHH', '1', 'A', NULL),
('07-1', '001', 'Empleados', 'Empleados', '07', 'A', '/employees'),
('07-2', '001', 'Posiciones', 'Posiciones', '07', 'A', '/positions'),
('08', '001', 'Administracion', 'Administracion', '1', 'A', ''),
('08-1', '001', 'Usuarios', 'Usuarios', '08', 'A', '/users'),
('08-2', '001', 'Roles', 'Roles', '08', 'A', '/roles'),
('08-3', '001', 'Empresa', 'Empresa', '08', 'A', '/business'),
('09', '001', 'Configuracion', 'Configuracion', '1', 'A', NULL),
('09-1', '001', 'Perfil', 'Perfil', '09', 'A', '/profile'),
('1', '001', 'Menu General', 'MENU GENERAL', NULL, 'A', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `POSITION_ID` varchar(255) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `STATUS` char(1) NOT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(100) DEFAULT NULL,
  `UPDATED_DATE` datetime DEFAULT NULL,
  `UPDATED_USER` varchar(100) DEFAULT NULL,
  `BUSINESS_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`POSITION_ID`, `DESCRIPTION`, `STATUS`, `CREATED_DATE`, `CREATED_USER`, `UPDATED_DATE`, `UPDATED_USER`, `BUSINESS_ID`) VALUES
('1', 'BARBERO', 'A', '0000-00-00 00:00:00', 'System', NULL, NULL, '001');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `ROL_ID` varchar(255) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `NOTES` varchar(255) DEFAULT NULL,
  `ESTATUS` char(1) NOT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(100) DEFAULT NULL,
  `UPDATED_DATE` datetime DEFAULT NULL,
  `UPDATED_USER` varchar(100) DEFAULT NULL,
  `BUSINESS_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`ROL_ID`, `NAME`, `NOTES`, `ESTATUS`, `CREATED_DATE`, `CREATED_USER`, `UPDATED_DATE`, `UPDATED_USER`, `BUSINESS_ID`) VALUES
('291ae129-dd64-47db-8519-a7dad4701048', 'EMPLOYEE', 'Host rol', 'A', '2023-02-10 20:25:28', NULL, NULL, NULL, '001'),
('d73dab3f-2c21-4265-af1f-cc20df746a90', 'ADMIN', 'Admin rol', 'A', '2023-02-10 20:25:49', NULL, NULL, NULL, '001'),
('d73dab3f-2c21-42699-af1f9-cc20df746a99', 'USER', 'ROL USUARIO POR DEFAULT', 'A', NULL, NULL, '2023-08-28 23:37:19', NULL, '001');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` varchar(5) NOT NULL,
  `description` varchar(100) NOT NULL,
  `BUSINESS_ID` varchar(255) NOT NULL,
  `ESTATUS` char(5) NOT NULL,
  `AMOUNT` varchar(200) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `UPDATE_DATE` datetime NOT NULL,
  `EMPLOYEE_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `description`, `BUSINESS_ID`, `ESTATUS`, `AMOUNT`, `CREATED_DATE`, `UPDATE_DATE`, `EMPLOYEE_ID`) VALUES
('1', 'corte nomal', '001', 'A', '300', '2023-08-13 22:50:09', '2023-08-13 22:50:09', '1');

-- --------------------------------------------------------

--
-- Table structure for table `turns`
--

CREATE TABLE `turns` (
  `TURN_ID` varchar(255) NOT NULL,
  `TYPE_TRANS` varchar(11) NOT NULL,
  `EMPLOYEE_ID` varchar(255) NOT NULL,
  `BUSINESS_ID` varchar(100) NOT NULL,
  `USER_ID` varchar(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `SERVICE_ID` varchar(255) NOT NULL,
  `PHONE` varchar(15) NOT NULL,
  `TIME` datetime NOT NULL,
  `ESTATUS` char(1) NOT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(255) NOT NULL,
  `UPDATED_USER` varchar(255) NOT NULL,
  `AMOUNT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `turns`
--

INSERT INTO `turns` (`TURN_ID`, `TYPE_TRANS`, `EMPLOYEE_ID`, `BUSINESS_ID`, `USER_ID`, `USERNAME`, `SERVICE_ID`, `PHONE`, `TIME`, `ESTATUS`, `CREATE_DATE`, `UPDATE_DATE`, `CREATED_USER`, `UPDATED_USER`, `AMOUNT`) VALUES
('1', 'TURN', '1', '001', '9912b933-6f38-4dc5-b7d5-5c0f344ab1b5', 'JUAN', '1', '99898428', '2023-09-05 21:43:29', 'I', '2023-09-05 21:43:29', '2023-09-05 21:44:15', 'JUAN', 'FREDERICK', 300),
('10', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 02:13:41', 'I', '2023-09-05 22:06:56', '2023-09-05 22:31:06', 'FREDERICK', 'FREDERICK', 300),
('11', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 21:43:29', 'I', '2023-09-05 22:20:09', '2023-09-05 22:22:23', 'FREDERICK', 'FREDERICK', 300),
('12', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 02:43:41', 'I', '2023-09-05 22:22:47', '2023-09-05 22:31:08', 'FREDERICK', 'FREDERICK', 300),
('13', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 03:13:41', 'I', '2023-09-05 22:23:44', '2023-09-05 22:31:10', 'FREDERICK', 'FREDERICK', 300),
('14', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 21:43:29', 'I', '2023-09-05 22:26:01', '2023-09-05 22:30:44', 'FREDERICK', 'FREDERICK', 300),
('15', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 22:13:41', 'I', '2023-09-05 22:27:22', '2023-09-05 22:30:47', 'FREDERICK', 'FREDERICK', 300),
('16', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 22:43:41', 'I', '2023-09-05 22:28:30', '2023-09-05 22:30:49', 'FREDERICK', 'FREDERICK', 300),
('17', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 22:31:21', 'S', '2023-09-05 22:31:20', NULL, 'FREDERICK', '', 300),
('18', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 21:43:29', 'S', '2023-09-05 22:31:48', NULL, 'FREDERICK', '', 300),
('19', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-07 22:22:16', 'S', '2023-09-07 22:22:16', NULL, 'FREDERICK', '', 300),
('2', 'TURN', '1', '001', '9912b933-6f38-4dc5-b7d5-5c0f344ab1b5', 'JUAN', '1', '99898428', '2023-09-05 22:13:41', 'I', '2023-09-05 21:43:41', '2023-09-05 22:27:06', 'JUAN', 'FREDERICK', 300),
('20', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-07 22:52:30', 'I', '2023-09-07 22:22:30', '2023-09-07 22:46:36', 'FREDERICK', 'FREDERICK', 300),
('21', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-07 23:22:30', 'A', '2023-09-07 22:22:39', '2023-09-07 22:23:15', 'FREDERICK', 'FREDERICK', 300),
('22', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'OLIVER', '1', '8297586655', '2023-09-07 23:22:30', 'S', '2023-09-07 22:23:44', NULL, 'FREDERICK', '', 300),
('23', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'SAMUEL', '1', '8297586675', '2023-09-07 23:52:30', 'S', '2023-09-07 22:24:25', NULL, 'FREDERICK', '', 300),
('24', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'PEDRO', '1', '8297589866', '2023-09-08 00:22:30', 'S', '2023-09-07 22:24:48', NULL, 'FREDERICK', '', 300),
('25', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-08 16:50:56', 'S', '2023-09-08 16:50:56', NULL, 'FREDERICK', '', 300),
('26', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-09 10:49:37', 'S', '2023-09-09 10:49:37', NULL, 'FREDERICK', '', 300),
('27', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-11 22:12:56', 'S', '2023-09-11 22:12:56', NULL, 'FREDERICK', '', 300),
('28', 'TURN', '2', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'MANUELITO', '1', '896587412', '2023-09-11 22:48:18', 'S', '2023-09-11 22:18:18', NULL, 'FREDERICK', '', 300),
('29', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-12 21:40:20', 'S', '2023-09-12 21:40:20', NULL, 'FREDERICK', '', 300),
('3', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 22:43:41', 'I', '2023-09-05 21:44:06', '2023-09-05 22:28:07', 'FREDERICK', 'FREDERICK', 300),
('4', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 23:13:41', 'I', '2023-09-05 21:44:27', '2023-09-05 22:30:52', 'FREDERICK', 'FREDERICK', 300),
('5', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-05 23:43:41', 'I', '2023-09-05 21:46:05', '2023-09-05 22:30:54', 'FREDERICK', 'FREDERICK', 300),
('6', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 00:13:41', 'I', '2023-09-05 21:46:38', '2023-09-05 22:30:56', 'FREDERICK', 'FREDERICK', 300),
('7', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 00:43:41', 'I', '2023-09-05 22:00:28', '2023-09-05 22:30:59', 'FREDERICK', 'FREDERICK', 300),
('8', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 01:13:41', 'I', '2023-09-05 22:03:30', '2023-09-05 22:31:01', 'FREDERICK', 'FREDERICK', 300),
('9', 'TURN', '1', '001', '413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '1', '8299827269', '2023-09-06 01:43:41', 'I', '2023-09-05 22:06:11', '2023-09-05 22:31:04', 'FREDERICK', 'FREDERICK', 300);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `USER_ID` varchar(255) NOT NULL,
  `USERNAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PHONE` varchar(15) NOT NULL,
  `IMAGE` varchar(500) DEFAULT NULL,
  `EMPLOYEE_ID` varchar(255) DEFAULT NULL,
  `STATUS` char(1) NOT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CREATED_USER` varchar(100) DEFAULT NULL,
  `UPDATED_DATE` datetime DEFAULT NULL,
  `UPDATED_USER` varchar(100) DEFAULT NULL,
  `ROL_ID` varchar(255) NOT NULL,
  `BUSINESS_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`USER_ID`, `USERNAME`, `PASSWORD`, `EMAIL`, `PHONE`, `IMAGE`, `EMPLOYEE_ID`, `STATUS`, `CREATED_DATE`, `CREATED_USER`, `UPDATED_DATE`, `UPDATED_USER`, `ROL_ID`, `BUSINESS_ID`) VALUES
('0e1e1496-5c63-43db-b5c9-6109915e2d1a', 'RUBIO', 'rubito01', 'RUBIO@gmail.com', '8296575599', NULL, 'NaN', 'A', '2023-08-29 22:03:21', 'TEST', '2023-09-09 15:17:46', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001'),
('165d3ba4-0b34-45b6-9cc6-ff9d41471e67', 'SECRE1', '$2a$15$5TwuRv56P85T0uC7Hhk/eu1jjiWDO4rVZTiKkXj8eoLKTfI9gVyHC', 'MARY_JANE@CORREO.COM', '', NULL, '2', 'I', '2023-02-10 20:29:49', 'TEST', '2023-09-10 11:36:09', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001'),
('1a4897b2-0f51-4ecc-9985-b242cb04f400', 'pedro', '$2a$20$0AgnN3kKZ3.BiABTWCyOHuzQPxlPe6QHuh6OYszPDIp161Z7wDTG6', 'pedro@gmail.com', '4984948494', NULL, '2', 'A', '2023-08-29 00:17:03', 'TEST', '2023-09-09 15:20:02', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001'),
('352dab61-b4af-4ff6-89b1-b1a94eb7c380', 'ADMIN', '$2a$15$R3aTUZiywgW3I883HUrteevLehUxJ4bikj2xjqhV1bbZbPuk9Q0i.', 'PETER_PARKER_1@CORREO.COM', '8295598768', NULL, '', 'A', '2023-02-10 20:29:00', 'TEST', '2023-09-01 23:08:43', 'FREDERICK', 'd73dab3f-2c21-4265-af1f-cc20df746a90', '001'),
('4', 'BARBER1', '$2a$15$R3aTUZiywgW3I883HUrteevLehUxJ4bikj2xjqhV1bbZbPuk9Q0i.', 'BARBER1@gamil.com', '829677982', NULL, '1', 'A', '2023-08-20 16:12:10', 'ADMIN', '2023-09-08 19:40:54', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001'),
('413c80b1-400d-456f-999a-05f79302ce63', 'FREDERICK', '$2a$15$R3aTUZiywgW3I883HUrteevLehUxJ4bikj2xjqhV1bbZbPuk9Q0i.', 'frederick@gamil.com', '8299827269', NULL, '', 'A', '2023-08-13 16:11:33', 'ADMIN', NULL, NULL, 'd73dab3f-2c21-4265-af1f-cc20df746a90', '001'),
('6360d14c-589f-47a7-928e-18fb04141869', 'GENSESIS', '1413', 'GENESIS@GMAIL.COM', '4444444444', NULL, '2', 'I', '2023-08-29 00:41:34', 'TEST', '2023-09-10 11:28:23', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001'),
('752a8bda-cfda-4378-ac9a-fe37d06628aa', 'samuel', '$2a$20$gmvA7uajeicb.gJiIyG0LO2HrPbgdDE4jIYaCctL.XVV5BJxCQB0e', 'samuel@gmail.com', '8299827269', NULL, '', 'A', '2023-08-29 00:15:18', 'TEST', NULL, NULL, 'd73dab3f-2c21-42699-af1f9-cc20df746a99', '001'),
('9912b933-6f38-4dc5-b7d5-5c0f344ab1b5', 'JUAN', '1234', 'JUAN@GMAI.COM', '99898428', NULL, '2', 'A', '2023-08-29 00:28:20', 'TEST', '2023-09-11 22:51:47', 'FREDERICK', '291ae129-dd64-47db-8519-a7dad4701048', '001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`BUSINESS_ID`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`CLIENT_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EMPLOYEE_ID`,`BUSINESS_ID`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`POSITION_ID`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ROL_ID`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`(1)),
  ADD KEY `BUSINESS_ID` (`BUSINESS_ID`);

--
-- Indexes for table `turns`
--
ALTER TABLE `turns`
  ADD PRIMARY KEY (`TURN_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USER_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `FK_EMPLOYEE_POSITION` FOREIGN KEY (`POSITION_ID`) REFERENCES `position` (`POSITION_ID`),
  ADD CONSTRAINT `FK_PLOYEE_BUSINESS` FOREIGN KEY (`BUSINESS_ID`) REFERENCES `business` (`BUSINESS_ID`);

--
-- Constraints for table `turns`
--
ALTER TABLE `turns`
  ADD CONSTRAINT `turns_ibfk_1` FOREIGN KEY (`EMPLOYEE_ID`) REFERENCES `employees` (`EMPLOYEE_ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_EMPLOYEE` FOREIGN KEY (`EMPLOYEE_ID`) REFERENCES `employees` (`EMPLOYEE_ID`),
  ADD CONSTRAINT `FK_USER_ROL` FOREIGN KEY (`ROL_ID`) REFERENCES `rol` (`ROL_ID`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`comesa20_pruiz`@`%.%.%.%` EVENT `act_cxp_vencido` ON SCHEDULE EVERY 1 DAY STARTS '2023-04-03 03:30:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE CUENTAS_POR_PAGAR
	SET ESTADO_DEL_PAGO = 'VE', USUARIO_ACTUALIZO = 'job_system', FECHA_ACTUALIZO = sysdate()
	WHERE ESTADO_DEL_PAGO NOT IN ('VE', 'PA')
    AND ESTADO='A'$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
