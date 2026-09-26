-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2026 at 05:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elsenordelosanillos`
--

-- --------------------------------------------------------

--
-- Table structure for table `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `reino_origen` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `nivel_poder` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`, `raza`, `reino_origen`, `descripcion`, `nivel_poder`) VALUES
(1, 'Aragorn', 'Humano', 'Gondor', 'Heredero al trono de Gondor y explorador.', 95),
(2, 'Gandalf', 'Mago', 'Valinor', 'Mago Istar enviado a la Tierra Media.', 100),
(3, 'Legolas', 'Elfo', 'Bosque Negro', 'Príncipe de los elfos y experto arquero.', 90),
(4, 'Gimli', 'Enano', 'Erebor', 'Guerrero enano muy tenaz y fiel amigo.', 85),
(5, 'Frodo Bolsón', 'Hobbit', 'La Comarca', 'Portador del Anillo Único.', 60);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `tipo_usuario` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `tipo_usuario`) VALUES
(1, 'Juan Pérez', 'juan@señordelosanillos.com', '123456', 'Cliente'),
(2, 'María Gómez', 'maria@señordelosanillos.com', 'clave123', 'Administrador'),
(3, 'Carlos López', 'carlos@señordelosanillos.com', 'abcde', 'Cliente'),
(4, 'Ana Torres', 'ana@señordelosanillos.com', 'passana', 'Cliente'),
(5, 'Lucas Admin', 'admin@señordelosanillos.com', 'admin2026', 'Administrador');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
