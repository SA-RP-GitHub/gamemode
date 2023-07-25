-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando datos para la tabla sarp-ragemp.personajes: ~2 rows (aproximadamente)
DELETE FROM `personajes`;
INSERT INTO `personajes` (`id`, `idusuario`, `n_pj`, `nombre`, `sex`, `vida`, `armadura`, `numero_tlf`, `fecha_registro`, `facciones`, `faccion_principal`, `rangos_facciones`, `rango_principal`, `dinero`, `banco`, `pay`, `ultima_conexion`, `ultima_ip`, `online`, `mama`, `papa`, `mezcla_padres`, `mezcla_piel`, `piel_mama`, `piel_papa`, `color_ojos`, `pelo`, `color_pelo`, `color_sec_pelo`, `barba`, `color_barba`, `caracteristicas_cara`, `manchas`, `vello_facial`, `cejas`, `envejecimiento`, `constituir`, `rubor`, `tez`, `dano_del_sol`, `lapiz_labial`, `lunarespecas`, `pelo_pecho`, `manchas_corporales`, `int_manchas_corporales`, `posicion`, `rotacion`, `dimension`) VALUES
	(1, 1, 1, 'Max Jones', 0, 100, 0, 'undefined', '2023-07-09 05:26:55', NULL, 0, NULL, 0, '0', '0', '0', '0000-00-00 00:00:00', 'undefined', 0, 0, 0, 0.5, 0.5, NULL, NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'undefined', NULL, 0),
	(2, 1, 1, 'Jayden Wilson', 0, 100, 0, 'undefined', '2023-07-10 19:37:36', NULL, 0, NULL, 0, '0', '0', '0', '0000-00-00 00:00:00', 'undefined', 0, 0, 0, 0.5, 0.5, NULL, NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0);

-- Volcando datos para la tabla sarp-ragemp.usuarios: ~1 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id`, `slots_pj`, `usuario`, `contrasena`, `correo`, `fechaRegistro`, `ultimoActivo`, `socialClub`, `socialClubId`, `ip`, `ip_registro`, `pin_seguridad`, `selector_preferencia`) VALUES
	(1, 3, 'Zexxno', '1LVl8OIa8Y+NBVOYO4AXwA==', 'zexxno@sarp.es', '2023-07-09 02:20:47', '2023-07-13 16:43:57', 'EdumaximusWar', 'undefined', '127.0.0.1', 'undefined', 'undefined', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
