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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-50659330';

--
-- Table structure for table `cat_catalogos`
--

DROP TABLE IF EXISTS `cat_catalogos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_catalogos` (
  `IDCATALOGO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(200) DEFAULT NULL,
  `CATALOGO` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDCATALOGO`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_catalogos`
--

LOCK TABLES `cat_catalogos` WRITE;
/*!40000 ALTER TABLE `cat_catalogos` DISABLE KEYS */;
INSERT INTO `cat_catalogos` VALUES (1,'1',8),(2,'2',8),(3,'3',8),(4,'4',8),(5,'5',8),(6,'6',8),(7,'7',8),(8,'8',8),(9,'9',8),(10,'10',8),(11,'PB',8),(12,'SOTANO',8),(13,'MEZZANINE',8),(14,'ESCRITORIO',9),(15,'LAPTOP',9),(16,'WORKSTATION',9),(17,'PROYECTOR',9),(18,'MAC',9),(19,'MACBOOK',9),(20,'HP',10),(21,'DELL',10),(22,'LENOVO',10),(23,'APPLE',10),(24,'VIEWSONIC',10),(25,'GEN??RICO',10),(26,'N/A',10),(27,'PRODESK 600 G2 SFF',11),(28,'PROBOOK 650 G2',11),(29,'PROBOOK 450 G3',11),(30,'PROBOOK 450 G5',11),(31,'PRO8510L',11),(32,'A1398',11),(33,'A1481',11),(34,'HP',12),(35,'DELL',12),(36,'LENOVO',12),(37,'APPLE',12),(38,'GEN??RICO',12),(39,'N/A',12),(40,'PRODISPLAY P202',13),(41,'PRODISPLAY P203',13),(42,'PRODISPLAY P223',13),(43,'HP',14),(44,'DELL',14),(45,'LENOVO',14),(46,'APPLE',14),(47,'GEN??RICO',14),(48,'N/A',14),(49,'K45',15),(50,'KBAR-211',15),(51,'KU-1156',15),(52,'KU-1469',15),(53,'SK-2120',15),(54,'SK-2880',15),(55,'HP',16),(56,'DELL',16),(57,'LENOVO',16),(58,'APPLE',16),(59,'GEN??RICO',16),(60,'N/A',16),(61,'HM01',17),(62,'MOFYUO',17),(63,'SM-2022',17),(64,'TRIPPLITE',18),(65,'GEN??RICO',18),(66,'N/A',18),(67,'OMNISMART 700M',19),(68,'GEN??RICO',20),(69,'N/A',20),(70,'4 GB',21),(71,'8 GB',21),(72,'16 GB',21),(73,'128 GB',22),(74,'256 GB',22),(75,'500 GB',22),(76,'1 TB',22),(77,'PC B??SICA',23),(78,'PC INTERMEDIA',23),(79,'PC DESARROLLO',23),(80,'LAPTOP LIGERA',23),(81,'LAPTOP LIGERA TOUCH (2 EN 1)',23),(82,'LAPTOP COMPLETA',23),(83,'LAPTOP USO RUDO',23),(84,'WORKSTATION WINDOWS B??SICA',23),(85,'WORKSTATION WINDOWS AVANZADA',23),(86,'WORKSTATION LINUX',23),(87,'VIDEO PROYECTOR PORT??TIL',23),(88,'VIDEO PROYECTOR FIJO',23),(89,'MONITOR PARA PC B??SICA',23),(90,'MONITOR PARA PC INTERMEDIA',23),(91,'MONITOR PARA PC DESARROLLO',23),(92,'MONITOR PARA LAPTOP LIGERA',23),(93,'MONITOR PARA LAPTOP LIGERA TOUCH (2 EN 1)',23),(94,'MONITOR PARA LAPTOP COMPLETA',23),(95,'MONITOR PARA WORKSTATION WINDOWS B??SICA',23),(96,'MONITOR PARA WORKSTATION WINDOWS AVANZADA',23),(97,'MONITOR PARA WORKSTATION LINUX',23),(98,'REPLICADOR DE PUERTOS PARA LAPTOP LIGERA',23),(99,'REPLICADOR DE PUERTOS PARA LAPTOP LIGERA TOUCH (2 EN 1)',23),(100,'REPLICADOR DE PUERTOS PARA LAPTOP COMPLETA',23),(101,'UNIDAD ??PTICA PARA PC INTERMEDIA',23),(102,'UNIDAD ??PTICA PARA PC DESARROLLO',23),(103,'UNIDAD ??PTICA EXTERNA PARA LAPTOP COMPLETA',23),(104,'ELITEDESK 705 G3 DM',24),(105,'ELITEDESK 705 G3 SFF',24),(106,'ELITEDESK 705 G3 MT',24),(107,'ELITEBOOK 820 G3',24),(108,'ELITE X2 1012 G2',24),(109,'ELITEBOOK 745 G4',24),(110,'B300   ',24),(111,'WORKSTATION Z440',24),(112,'WORKSTATION Z840',24),(113,'WORKSTATION Z840',24),(114,'POWERLITE X05',24),(115,'POWERLITE 2040',24),(116,'PRODISPLAY P202 / PRODISPLAY P203 / PRODISPLAY P223',24),(117,'PRODISPLAY P203',24),(118,'PRODISPLAY P240VA',24),(119,'ELITEDISPLAY E243I',24),(120,'ELITEDISPLAY E243I',24),(121,'ELITEDISPLAY E243I',24),(122,'ELITEDISPLAY E243I',24),(123,'ELITEDISPLAY E243I',24),(124,'ELITEDISPLAY E243I',24),(125,'ULTRASLIM DOCKING STATION',24),(126,'ELITE 90W TB3',24),(127,'ULTRASLIM DOCKING STATION',24),(128,'SLIM DVD-WRITER DRIVE',24),(129,'SLIM DVD-WRITER DRIVE',24),(130,'USB EXTERNAL DVDRW DRIVE',24),(131,'1',25),(132,'2',25),(133,'3',25),(134,'4',25),(135,'5',25),(136,'6',25),(137,'7',25),(138,'8',25),(139,'9',25),(140,'10',25),(141,'11',25),(142,'12',25),(143,'13',25),(144,'14',25),(145,'15',25),(146,'16',25),(147,'17',25),(148,'18',25),(149,'19',25),(150,'20',25),(151,'21',25),(152,'22',25),(153,'23',25),(154,'24',25),(155,'25',25),(156,'26',25),(157,'27',25),(158,'28',25),(159,'29',25),(160,'30',25),(161,'31',25),(162,'1',26),(163,'2',26),(164,'3',26),(165,'4',26),(166,'5',26),(167,'6',26),(168,'7',26),(169,'8',26),(170,'9',26),(171,'10',26),(172,'11',26),(173,'12',26),(174,'2020',27),(175,'2021',27),(176,'2022',27),(177,'CERRADO',28),(178,'RECHAZADO',28),(179,'PENDIENTE POR ORGANISMO',28),(180,'PENDIENTE POR CLIENTE',28);
/*!40000 ALTER TABLE `cat_catalogos` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-20  7:09:17
