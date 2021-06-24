-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: bdgif2zw7vothtzuxx9d-mysql.services.clever-cloud.com    Database: bdgif2zw7vothtzuxx9d
-- ------------------------------------------------------
-- Server version	8.0.15-5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-50659339';

--
-- Temporary view structure for view `vw_AgrupacionCampo`
--

DROP TABLE IF EXISTS `vw_AgrupacionCampo`;
/*!50001 DROP VIEW IF EXISTS `vw_AgrupacionCampo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_AgrupacionCampo` AS SELECT 
 1 AS `agrupacion`,
 1 AS `campo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_PlantillaAPP`
--

DROP TABLE IF EXISTS `vw_PlantillaAPP`;
/*!50001 DROP VIEW IF EXISTS `vw_PlantillaAPP`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_PlantillaAPP` AS SELECT 
 1 AS `CAMPOID`,
 1 AS `CAMPO`,
 1 AS `VALIDAR`,
 1 AS `TIPOCAMPO`,
 1 AS `RESTRICCIONES`,
 1 AS `ALERTAS`,
 1 AS `AGRUPACION`,
 1 AS `EDITAR`,
 1 AS `ENWEB`,
 1 AS `ENAPP`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_AgrupacionCampo`
--

/*!50001 DROP VIEW IF EXISTS `vw_AgrupacionCampo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u5sptvc8yv0vpxkn`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_AgrupacionCampo` AS select `cat_campos`.`AGRUPACION` AS `agrupacion`,`cat_campos`.`CAMPO` AS `campo` from `cat_campos` where (`cat_campos`.`ENAPP` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_PlantillaAPP`
--

/*!50001 DROP VIEW IF EXISTS `vw_PlantillaAPP`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u5sptvc8yv0vpxkn`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_PlantillaAPP` AS select `cat_campos`.`CAMPOID` AS `CAMPOID`,`cat_campos`.`CAMPO` AS `CAMPO`,`cat_campos`.`VALIDAR` AS `VALIDAR`,`cat_campos`.`TIPOCAMPO` AS `TIPOCAMPO`,`cat_campos`.`RESTRICCIONES` AS `RESTRICCIONES`,`cat_campos`.`ALERTAS` AS `ALERTAS`,`cat_campos`.`AGRUPACION` AS `AGRUPACION`,`cat_campos`.`EDITAR` AS `EDITAR`,`cat_campos`.`ENWEB` AS `ENWEB`,`cat_campos`.`ENAPP` AS `ENAPP` from `cat_campos` where (`cat_campos`.`ENAPP` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'bdgif2zw7vothtzuxx9d'
--

--
-- Dumping routines for database 'bdgif2zw7vothtzuxx9d'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_Agrupaciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_Agrupaciones`()
BEGIN
select AGRUPACIONID,AGRUPACION from cat_agrupacion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetInventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_GetInventario`(
`pPROYECTOID` INT(11))
BEGIN
SELECT * FROM tbl_inventario WHERE PROYECTOID=pPROYECTOID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetProyects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_GetProyects`()
BEGIN
SELECT PROYECTOID,PROYECTO FROM tbl_proyecto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetUserLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_GetUserLogin`(
`pUSUARIO` VARCHAR(100),
`pPassword` VARCHAR(100)
)
BEGIN
SELECT USUARIOID,NOMBRECOMPLETO,PERFILID,JEFEID,USUARIO,PASSWORD FROM cat_usuarios where usuario=pUSUARIO AND PASSWORD=pPASSWORD;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateInventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_UpdateInventario`(

`pPROYECTOID` INT(11),
`pINVENTARIOID` INT(11),
`pCAMPO` VARCHAR(100),
`pVALOR` VARCHAR(100)
)
BEGIN


SET @query =CONCAT("UPDATE tbl_inventario SET ",pCAMPO,"='",pVALOR,"' where INVENTARIOID='",pINVENTARIOID,"' AND PROYECTOID='",pPROYECTOID,"';"); 
PREPARE ejecuta FROM @query; 
EXECUTE ejecuta; 
DEALLOCATE PREPARE ejecuta;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateUserLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `SP_UpdateUserLogin`(
`pidUsuario` iNT(11),
`pPassword` VARCHAR(100))
BEGIN
Update cat_usuarios set PASSWORD = pPassword where USUARIOID=pidUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UnPivotInventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u5sptvc8yv0vpxkn`@`%` PROCEDURE `UnPivotInventario`(
`pPROYECTOID` INT(11),
`pINVENTARIOID` INT(11),
`pAGRUPACIONID` INT(11)
)
BEGIN
TRUNCATE TABLE UnPivotInventario;

INSERT INTO UnPivotInventario SELECT inventarioid, 1,'PROYECTO' col, PROYECTO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 2,'PROYECTODESCRIPCION' col, PROYECTODESCRIPCION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 3,'FCREACON' col, FCREACON FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 4,'FOLIO' col, FOLIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 5,'ID' col, ID FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 6,'APELLIDOS' col, APELLIDOS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 7,'APELLIDOS' col, APELLIDOS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 8,'NOMBRES' col, NOMBRES FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 9,'NOMBRECOMPLETO' col, NOMBRECOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 10,'NUMEMPLEADO' col, NUMEMPLEADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 11,'VIP' col, VIP FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 12,'PUESTO' col, PUESTO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 13,'DIRECCION' col, DIRECCION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 14,'SUBDIRECCION' col, SUBDIRECCION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 15,'CLAVESUBDIRECCION' col, CLAVESUBDIRECCION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 16,'GERENCIA' col, GERENCIA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 17,'CLAVEGERENCIA' col, CLAVEGERENCIA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 18,'DEPTO' col, DEPTO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 19,'CLAVECENTROTRABAJO' col, CLAVECENTROTRABAJO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 20,'CORREO' col, CORREO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 21,'TELEFONO' col, TELEFONO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 22,'EXT' col, EXT FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 23,'UBICACION' col, UBICACIÓN FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 24,'ESTADO' col, ESTADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 25,'CP' col, CP FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 26,'COLONIA' col, COLONIA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 27,'UBICACIÓNCOMPLETA' col, UBICACIÓNCOMPLETA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 28,'ZONA' col, ZONA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 29,'LOCALIDAD' col, LOCALIDAD FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 30,'EDIFICIO' col, EDIFICIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 31,'PISO' col, PISO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 32,'AREA' col, AREA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 33,'ADSCRIPCION' col, ADSCRIPCION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 34,'APELLIDOSJEFE' col, APELLIDOSJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 35,'NOMBRESJEFE' col, NOMBRESJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 36,'NOMBRECOMPLETOJEFE' col, NOMBRECOMPLETOJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 37,'FICHAJEFE' col, FICHAJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 38,'EXTJEFE' col, EXTJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 39,'UBICACIÓNJEFE' col, UBICACIÓNJEFE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 40,'NOMBREJEFEINMEDIATO' col, NOMBREJEFEINMEDIATO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 41,'APELLIDOSRESGUARDO' col, APELLIDOSRESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 42,'NOMBRESRESGUARDO' col, NOMBRESRESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 43,'NOMBRECOMPLETORESGUARDO' col, NOMBRECOMPLETORESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 44,'ADSCRIPCIONRESGUARDO' col, ADSCRIPCIONRESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 45,'EXTRESGUARDO' col, EXTRESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 46,'APELLIDOSRESPONSABLE' col, APELLIDOSRESPONSABLE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 47,'NOMBRESRESPONSABLE' col, NOMBRESRESPONSABLE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 48,'NOMBRECOMPLETORESPONSABLE' col, NOMBRECOMPLETORESPONSABLE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 49,'APELLIDOSPEMEX' col, APELLIDOSPEMEX FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 50,'NOMBRESPEMEX' col, NOMBRESPEMEX FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 51,'NOMBRECOMPLETOPEMEX' col, NOMBRECOMPLETOPEMEX FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 52,'TIPOEQUIPO' col, TIPOEQUIPO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 53,'EQUIPO' col, EQUIPO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 54,'MARCAEQUIPO' col, MARCAEQUIPO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 55,'MODELOEQUIPO' col, MODELOEQUIPO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 56,'NUMSERIEEQUIPO' col, NUMSERIEEQUIPO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 57,'EQUIPOCOMPLETO' col, EQUIPOCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 58,'MONITOR' col, MONITOR FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 59,'MARCAMONITOR' col, MARCAMONITOR FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 60,'MODELOMONITOR' col, MODELOMONITOR FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 61,'NUMSERIEMONITOR' col, NUMSERIEMONITOR FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 62,'MONITORCOMPLETO' col, MONITORCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 63,'TECLADO' col, TECLADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 64,'MARCATECLADO' col, MARCATECLADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 65,'MODELOTECLADO' col, MODELOTECLADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 66,'NUMSERIETECLADO' col, NUMSERIETECLADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 67,'TECLADOCOMPLETO' col, TECLADOCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 68,'MOUSE' col, MOUSE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 69,'MARCAMOUSE' col, MARCAMOUSE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 70,'MODELOMAUSE' col, MODELOMAUSE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 71,'NUMSERIEMOUSE' col, NUMSERIEMOUSE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 72,'MOUSECOMPLETO' col, MOUSECOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 73,'UPS' col, UPS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 74,'MARCAUPS' col, MARCAUPS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 75,'MODELOUPS' col, MODELOUPS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 76,'NUMSERIEUPS' col, NUMSERIEUPS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 77,'UPSCOMPLETO' col, UPSCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 78,'MALETIN' col, MALETIN FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 79,'MARCAMALETIN' col, MARCAMALETIN FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 80,'MODELOMALETIN' col, MODELOMALETIN FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 81,'NUMSERIEMALETIN' col, NUMSERIEMALETIN FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 82,'MALETINCOMLETO' col, MALETINCOMLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 83,'CANDADO' col, CANDADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 84,'MARCACANDADO' col, MARCACANDADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 85,'MODELOCANDADO' col, MODELOCANDADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 86,'NUMSERIECANDADO' col, NUMSERIECANDADO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 87,'CANDADOCOMPLETO' col, CANDADOCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 88,'BOCINAS' col, BOCINAS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 89,'MARCABOCINAS' col, MARCABOCINAS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 90,'MODELOBOCINAS' col, MODELOBOCINAS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 91,'NUMSERIEBOCINAS' col, NUMSERIEBOCINAS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 92,'BOCINASCOMPLETO' col, BOCINASCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 93,'CAMARA' col, CAMARA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 94,'MARCACAMARA' col, MARCACAMARA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 95,'MODELOCAMARA' col, MODELOCAMARA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 96,'NUMSERIECMARA' col, NUMSERIECMARA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 97,'CAMARACOMPLETO' col, CAMARACOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 98,'MONITOR2' col, MONITOR2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 99,'MARCAMONITOR2' col, MARCAMONITOR2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 100,'MODELOMONITOR2' col, MODELOMONITOR2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 101,'NUMSERIEMONITOR2' col, NUMSERIEMONITOR2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 102,'MONITOR2COMPLETO' col, MONITOR2COMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 103,'ACCESORIO' col, ACCESORIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 104,'MARCAACCESORIO' col, MARCAACCESORIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 105,'MODELOACCESORIO' col, MODELOACCESORIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 106,'NUMSERIEACCESORIO' col, NUMSERIEACCESORIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 107,'ACCESORIOCOMPLETO' col, ACCESORIOCOMPLETO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 108,'RAM' col, RAM FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 109,'DISCODURO' col, DISCODURO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 110,'PROCESADOR' col, PROCESADOR FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 111,'TIPOEQUIPOCOMP1' col, TIPOEQUIPOCOMP1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 112,'MODELOCOMP1' col, MODELOCOMP1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 113,'NUMSERIECOMP1' col, NUMSERIECOMP1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 114,'CRUCECLIENTECOMP1' col, CRUCECLIENTECOMP1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 115,'TIPOEQUIPOCOMP2' col, TIPOEQUIPOCOMP2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 116,'MODELOCOMP2' col, MODELOCOMP2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 117,'NUMSERIECOMP2' col, NUMSERIECOMP2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 118,'CRUCECLIENTECOMP2' col, CRUCECLIENTECOMP2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 119,'TIPOEQUIPOCOMP3' col, TIPOEQUIPOCOMP3 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 120,'MODELOCOMP3' col, MODELOCOMP3 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 121,'NUMSERIECOMP3' col, NUMSERIECOMP3 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 122,'CRUCECLIENTECOMP3' col, CRUCECLIENTECOMP3 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 123,'TIPOEQUIPOCOMP4' col, TIPOEQUIPOCOMP4 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 124,'MODELOCOMP4' col, MODELOCOMP4 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 125,'NUMSERIECOMP4' col, NUMSERIECOMP4 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 126,'CRUCECLIENTECOMP4' col, CRUCECLIENTECOMP4 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 127,'TIPOEQUIPOCOMP5' col, TIPOEQUIPOCOMP5 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 128,'MODELOCOMP5' col, MODELOCOMP5 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 129,'NUMSERIECOMP5' col, NUMSERIECOMP5 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 130,'CRUCECLIENTECOMP5' col, CRUCECLIENTECOMP5 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 131,'TIPOEQUIPOCOMP6' col, TIPOEQUIPOCOMP6 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 132,'MODELOCOMP6' col, MODELOCOMP6 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 133,'NUMSERIECOMP6' col, NUMSERIECOMP6 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 134,'CRUCECLIENTECOMP6' col, CRUCECLIENTECOMP6 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 135,'TIPOEQUIPOCOMP7' col, TIPOEQUIPOCOMP7 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 136,'MODELOCOMP7' col, MODELOCOMP7 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 137,'NUMSERIECOMP7' col, NUMSERIECOMP7 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 138,'CRUCECLIENTECOMP7' col, CRUCECLIENTECOMP7 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 139,'VALIDACIONCOMP1' col, VALIDACIONCOMP1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 140,'VALIDACIONCOMP2' col, VALIDACIONCOMP2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 141,'VALIDACIONCOMP3' col, VALIDACIONCOMP3 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 142,'VALIDACIONCOMP4' col, VALIDACIONCOMP4 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 143,'VALIDACIONCOMP5' col, VALIDACIONCOMP5 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 144,'VALIDACIONCOMP6' col, VALIDACIONCOMP6 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 145,'VALIDACIONCOMP7' col, VALIDACIONCOMP7 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 146,'VALIDADOSCOMP' col, VALIDADOSCOMP FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 147,'TECNICONOMBRE' col, TECNICONOMBRE FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 148,'DIA' col, DIA FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 149,'MES' col, MES FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 150,'ANIO' col, ANIO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 151,'REQESPECIAL1' col, REQESPECIAL1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 152,'REQESPECIAL2' col, REQESPECIAL2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 153,'OBSINV' col, OBSINV FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 154,'OBSRESGUARDO' col, OBSRESGUARDO FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 155,'OBSEXTRAS1' col, OBSEXTRAS1 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 156,'OBSEXTRAS2' col, OBSEXTRAS2 FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 157,'ESTATUS' col, ESTATUS FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 158,'FESCALACION' col, FESCALACION FROM tbl_inventario where inventarioid=pINVENTARIOID;
INSERT INTO UnPivotInventario SELECT inventarioid, 159,'COMENTARIOSESCALACION' col, COMENTARIOSESCALACION FROM tbl_inventario where inventarioid=pINVENTARIOID;

select a.*,b.* 
from cat_campos a 
inner join UnPivotInventario b on a.campoId=b.CampoID
where AGRUPACIONID=pAGRUPACIONID and EDITAR ='SI';


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-20  7:10:11
