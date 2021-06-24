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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-50659338';

--
-- Table structure for table `tbl_localidades`
--

DROP TABLE IF EXISTS `tbl_localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_localidades` (
  `d_codigo` varchar(10) NOT NULL,
  `d_asenta` varchar(100) DEFAULT NULL,
  `d_tipo_asenta` varchar(100) DEFAULT NULL,
  `D_mnpio	d_estado` varchar(100) DEFAULT NULL,
  `d_CP` varchar(100) DEFAULT NULL,
  `c_estado` varchar(100) DEFAULT NULL,
  `c_oficina` varchar(10) DEFAULT NULL,
  `c_CP` varchar(10) DEFAULT NULL,
  `c_tipo_asenta` varchar(10) DEFAULT NULL,
  `c_mnpio` varchar(10) DEFAULT NULL,
  `id_asenta_cpcons` varchar(10) DEFAULT NULL,
  `d_zona` varchar(10) DEFAULT NULL,
  `c_cve_ciudad` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_localidades`
--

LOCK TABLES `tbl_localidades` WRITE;
/*!40000 ALTER TABLE `tbl_localidades` DISABLE KEYS */;
INSERT INTO `tbl_localidades` VALUES ('01000','San Ángel','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0001','Urbano','01'),('01010','Los Alpes','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0005','Urbano','01'),('01020','Guadalupe Inn','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0006','Urbano','01'),('01030','Axotla','Pueblo','Álvaro Obregón','01001','09','01001','','28','010','0009','Urbano','01'),('01030','Florida','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0010','Urbano','01'),('01040','Campestre','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0012','Urbano','01'),('01049','Tlacopac','Pueblo','Álvaro Obregón','01001','09','01001','','28','010','0014','Urbano','01'),('01050','Ex-Hacienda de Guadalupe Chimalistac','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0016','Urbano','01'),('01060','Altavista','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0017','Urbano','01'),('01060','San Ángel Inn','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0018','Urbano','01'),('01070','Chimalistac','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0019','Urbano','01'),('01080','Progreso Tizapan','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0022','Urbano','01'),('01089','Ermita Tizapan','Colonia','Álvaro Obregón','01001','09','01001','','09','010','0024','Urbano','01'),('01090','La Otra Banda','Barrio','Álvaro Obregón','01001','09','01001','','02','010','0025','Urbano','01'),('01090','Loreto','Barrio','Álvaro Obregón','01001','09','01001','','02','010','0026','Urbano','01'),('01090','Tizapan','Pueblo','Álvaro Obregón','01001','09','01001','','28','010','0028','Urbano','01'),('01100','Pólvora','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0031','Urbano','01'),('01109','La Conchita','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0033','Urbano','01'),('01110','Belém de las Flores','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0034','Urbano','01'),('01110','El Capulín','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0036','Urbano','01'),('01110','Ampliación El Capulín','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0037','Urbano','01'),('01110','Liberales de 1857','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0039','Urbano','01'),('01120','Acueducto','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0042','Urbano','01'),('01120','Cove','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0044','Urbano','01'),('01120','Hidalgo','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0046','Urbano','01'),('01120','Las Américas','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0047','Urbano','01'),('01125','Ampliación Acueducto','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0043','Urbano','01'),('01130','Paraíso','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0052','Urbano','01'),('01130','Molino de Santo Domingo','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0053','Urbano','01'),('01130','Real del Monte','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0056','Urbano','01'),('01139','Reacomodo Pino Suárez','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0058','Urbano','01'),('01140','Bellavista','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0059','Urbano','01'),('01140','José Maria Pino Suárez','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0060','Urbano','01'),('01150','Cristo Rey','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0063','Urbano','01'),('01150','Tolteca','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0064','Urbano','01'),('01160','Bosque','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0066','Urbano','01'),('01160','Isidro Fabela','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0067','Urbano','01'),('01160','Maria G. de García Ruiz','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0068','Urbano','01'),('01160','1a Victoria','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0069','Urbano','01'),('01170','Abraham M. González','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0074','Urbano','01'),('01180','Carola','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0076','Urbano','01'),('01180','8 de Agosto','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0077','Urbano','01'),('01180','San Pedro de los Pinos','Colonia','Álvaro Obregón','01131','09','01131','','09','010','0078','Urbano','01'),('01200','Arturo Martínez','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0079','Urbano','01'),('01210','Santa Fe','Pueblo','Álvaro Obregón','01401','09','01401','','28','010','0082','Urbano','01'),('01219','Lomas de Santa Fe','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0084','Urbano','01'),('01220','La Estrella','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2681','Urbano','01'),('01220','Bonanza','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0085','Urbano','01'),('01220','Cuevitas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0086','Urbano','01'),('01220','El Cuernito','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0087','Urbano','01'),('01220','Mártires de Tacubaya','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0089','Urbano','01'),('01220','Zenón Delgado','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0090','Urbano','01'),('01230','Campo de Tiro los Gamitos','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0092','Urbano','01'),('01230','Los Gamitos','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0097','Urbano','01'),('01230','Tlapechico','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0098','Urbano','01'),('01230','El Piru Santa Fe','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0132','Urbano','01'),('01230','El Piru 2a Ampliación','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0224','Urbano','01'),('01239','La Huerta','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0102','Urbano','01'),('01240','Pueblo Nuevo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0103','Urbano','01'),('01250','El Árbol','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0104','Urbano','01'),('01250','Ladera','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0105','Urbano','01'),('01250','Lomas de Nuevo México','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0106','Urbano','01'),('01250','Margarita Maza de Juárez','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0107','Urbano','01'),('01250','Tecolalco','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0108','Urbano','01'),('01259','Ampliación La Cebada','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0109','Urbano','01'),('01259','La Mexicana 2a Ampliación','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2845','Urbano','01'),('01260','Calzada Jalalpa','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0110','Urbano','01'),('01260','La Mexicana','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0112','Urbano','01'),('01260','Ampliación La Mexicana','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0113','Urbano','01'),('01260','La Palmita','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0114','Urbano','01'),('01260','Liberación Proletaria','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0115','Urbano','01'),('01269','1a Sección Cañada','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0117','Urbano','01'),('01269','2a Sección Cañada','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0118','Urbano','01'),('01270','El Tejocote','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0120','Urbano','01'),('01270','La Presa','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0121','Urbano','01'),('01270','Golondrinas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0123','Urbano','01'),('01270','Golondrinas 1a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0124','Urbano','01'),('01270','Golondrinas 2a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0125','Urbano','01'),('01270','Lomas de Capula','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0127','Urbano','01'),('01275','Villa Solidaridad','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0131','Urbano','01'),('01276','El Pirul','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0093','Urbano','01'),('01278','Desarrollo Urbano','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0133','Urbano','01'),('01279','Lomas de Becerra','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0136','Urbano','01'),('01280','Arvide','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0138','Urbano','01'),('01280','El Pocito','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0139','Urbano','01'),('01280','Francisco Villa','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0140','Urbano','01'),('01280','La Joya','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0141','Urbano','01'),('01285','El Rodeo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0144','Urbano','01'),('01289','Reacomodo El Cuernito','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0146','Urbano','01'),('01290','Piloto Adolfo López Mateos','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0147','Urbano','01'),('01290','Presidentes','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0148','Urbano','01'),('01296','Jalalpa Tepito 2a Ampliación','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0152','Urbano','01'),('01296','Ampliación Jalalpa','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0153','Urbano','01'),('01296','Jalalpa Tepito','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0154','Urbano','01'),('01298','Ampliación Piloto Adolfo López Mateos','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0156','Urbano','01'),('01299','1a Ampliación Presidentes','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0160','Urbano','01'),('01299','2a Ampliación Presidentes','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0161','Urbano','01'),('01310','San Gabriel','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0163','Urbano','01'),('01320','Carlos A. Madrazo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0164','Urbano','01'),('01330','Paseo de las Lomas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0168','Urbano','01'),('01340','Bejero del Pueblo Santa Fe','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0170','Urbano','01'),('01376','Santa Fe','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0171','Urbano','01'),('01376','Santa Fe Peña Blanca','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2682','Urbano','01'),('01376','Santa Fe La Loma','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2683','Urbano','01'),('01376','Santa Fe Centro Ciudad','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2864','Urbano','01'),('01377','Jalalpa El Grande','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0172','Urbano','01'),('01389','Santa Fe Tlayapaca','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0176','Urbano','01'),('01400','Olivar del Conde 1a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0181','Urbano','01'),('01400','Preconcreto','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0184','Urbano','01'),('01407','Galeana','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0187','Urbano','01'),('01408','Olivar del Conde 2a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0188','Urbano','01'),('01410','Barrio Norte','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0193','Urbano','01'),('01410','Palmas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0194','Urbano','01'),('01419','Minas Cristo Rey','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0195','Urbano','01'),('01420','Sacramento','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0196','Urbano','01'),('01420','Santa María Nonoalco','Barrio','Álvaro Obregón','01401','09','01401','','02','010','0197','Urbano','01'),('01430','Colina del Sur','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0198','Urbano','01'),('01450','Hogar y Redención','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0202','Urbano','01'),('01460','Alfonso XIII','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0204','Urbano','01'),('01470','Alfalfar','Barrio','Álvaro Obregón','01401','09','01401','','02','010','0206','Urbano','01'),('01470','Molino de Rosas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0207','Urbano','01'),('01480','Lomas de Plateros','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0209','Urbano','01'),('01490','La Cascada','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0211','Urbano','01'),('01500','Santa Lucía','Pueblo','Álvaro Obregón','01401','09','01401','','28','010','0213','Urbano','01'),('01500','Miguel Gaona Armenta','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2704','Urbano','01'),('01509','Santa Lucía Chantepec','Pueblo','Álvaro Obregón','01401','09','01401','','28','010','0221','Urbano','01'),('01510','Garcimarrero','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0222','Urbano','01'),('01510','La Araña','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0223','Urbano','01'),('01510','Los Cedros','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2636','Urbano','01'),('01520','Ampliación Los Pirules','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0094','Urbano','01'),('01520','Estado de Hidalgo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0225','Urbano','01'),('01520','Ampliación Estado de Hidalgo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0226','Urbano','01'),('01520','Piru Santa Lucía','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0227','Urbano','01'),('01520','El Politoco','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2841','Urbano','01'),('01530','Corpus Christy','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0229','Urbano','01'),('01538','Tepopotla','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0232','Urbano','01'),('01539','Acuilotla','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0233','Urbano','01'),('01539','Cooperativa Unión Olivos','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2643','Urbano','01'),('01540','Balcones de Cehuayo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0238','Urbano','01'),('01540','Cehuaya','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0239','Urbano','01'),('01540','Llano Redondo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0240','Urbano','01'),('01540','Punta de Cehuaya','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0241','Urbano','01'),('01548','Villa Progresista','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2638','Urbano','01'),('01549','Dos Ríos del Pueblo Santa Lucía','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0243','Urbano','01'),('01550','Tepeaca','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0245','Urbano','01'),('01550','Ampliación Tepeaca','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0246','Urbano','01'),('01550','Rinconada Las Cuevitas','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2849','Urbano','01'),('01560','Ave Real','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0248','Urbano','01'),('01560','Canutillo','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0249','Urbano','01'),('01560','Canutillo 3a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0250','Urbano','01'),('01560','Canutillo 2a Sección','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0251','Urbano','01'),('01566','Hueytlale','Colonia','Álvaro Obregón','01401','09','01401','','09','010','2747','Urbano','01'),('01569','Reacomodo Valentín Gómez Farías','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0255','Urbano','01'),('01588','Tarango','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0259','Urbano','01'),('01590','El Rincón','Colonia','Álvaro Obregón','01401','09','01401','','09','010','0261','Urbano','01');
/*!40000 ALTER TABLE `tbl_localidades` ENABLE KEYS */;
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

-- Dump completed on 2020-06-20  7:10:02
