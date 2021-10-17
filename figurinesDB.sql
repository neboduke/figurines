-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: archaeodb_figurines
-- ------------------------------------------------------
-- Server version	8.0.19

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

--
-- Table structure for table `carrier`
--

DROP TABLE IF EXISTS `carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrier` (
  `carrier_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `description` text,
  PRIMARY KEY (`carrier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES (1,'Situla',NULL),(2,'Jar',NULL),(3,'Sword',NULL),(4,'Soliter',NULL),(5,'Knife',NULL),(6,'Fibulae',NULL);
/*!40000 ALTER TABLE `carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chronology`
--

DROP TABLE IF EXISTS `chronology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chronology` (
  `chronology_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `year_from` int DEFAULT NULL,
  `year_to` int DEFAULT NULL,
  PRIMARY KEY (`chronology_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chronology`
--

LOCK TABLES `chronology` WRITE;
/*!40000 ALTER TABLE `chronology` DISABLE KEYS */;
INSERT INTO `chronology` VALUES (1,'LT A',450,380),(2,'LT B',380,250),(3,'LT C',250,150),(4,'LT D',150,15),(5,'Ha C',778,620),(6,'Ha D1',621,550),(7,'Ha D2',550,510),(8,'Ha D3',510,450),(12,'Este II',342,NULL),(13,'Este I',34,45),(15,'Javorani I',720,652),(17,'Javorani II',650,580),(20,'julis',2005,2121),(21,'Zetwas',NULL,NULL);
/*!40000 ALTER TABLE `chronology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chronology_parallel`
--

DROP TABLE IF EXISTS `chronology_parallel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chronology_parallel` (
  `chronologyId` int NOT NULL,
  `paralleld` int NOT NULL,
  PRIMARY KEY (`chronologyId`,`paralleld`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chronology_parallel`
--

LOCK TABLES `chronology_parallel` WRITE;
/*!40000 ALTER TABLE `chronology_parallel` DISABLE KEYS */;
/*!40000 ALTER TABLE `chronology_parallel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `coordinate` varchar(500) DEFAULT NULL,
  `coordinate_lat` varchar(255) DEFAULT NULL,
  `coordinate_lng` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Tirol / AT',NULL,NULL,NULL),(2,'Vorarlberg / AT',NULL,NULL,NULL),(3,'Schweiz',NULL,NULL,NULL),(4,'Südtirol / IT',NULL,NULL,NULL),(5,'Trentino / IT',NULL,NULL,NULL),(6,'Italien',NULL,NULL,NULL),(7,'Salzburg / AT',NULL,NULL,NULL),(8,'Kärnten / AT',NULL,NULL,NULL),(9,'Steiermark / AT',NULL,NULL,NULL);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `figurine`
--

DROP TABLE IF EXISTS `figurine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `figurine` (
  `figurine_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `description_iconology` longtext,
  `description_iconography` longtext,
  `chronology_id` int NOT NULL,
  `date_abs` varchar(255) DEFAULT NULL,
  `exibit_nr` varchar(255) DEFAULT NULL,
  `material_description` varchar(255) DEFAULT NULL,
  `keyword` varchar(500) DEFAULT NULL,
  `carrier_id` int NOT NULL,
  `location_id` int NOT NULL,
  `exibit_location_id` int DEFAULT NULL,
  PRIMARY KEY (`figurine_id`),
  KEY `fk_chronology_idx_idx` (`chronology_id`),
  KEY `fk_carrier_idx_idx` (`carrier_id`),
  KEY `fk_location_idx` (`location_id`),
  KEY `fk_exibit_location_idx` (`exibit_location_id`),
  CONSTRAINT `fk_carrier_idx` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`carrier_id`),
  CONSTRAINT `fk_chronology_idx` FOREIGN KEY (`chronology_id`) REFERENCES `chronology` (`chronology_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_exibit_location` FOREIGN KEY (`exibit_location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine`
--

LOCK TABLES `figurine` WRITE;
/*!40000 ALTER TABLE `figurine` DISABLE KEYS */;
INSERT INTO `figurine` VALUES (1,'Sänger aus Oberhofen','ikonologie','ikonografie',3,'4567','123','description of material','sänger horn trinker figur',1,2,1),(2,'Krieger aus Oberhofen',NULL,'Figur einer Person mit einem Neaguer Helm am Kopf. In der rechten Hand hält sie ein ovales Objekt das als eine Maske oder als ein Kopf assoziert wird. ',3,NULL,'321','bronze','krieger maske figur',2,1,NULL);
/*!40000 ALTER TABLE `figurine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `figurine_literature`
--

DROP TABLE IF EXISTS `figurine_literature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `figurine_literature` (
  `figurine_id` int NOT NULL,
  `literature_id` int NOT NULL,
  PRIMARY KEY (`figurine_id`,`literature_id`),
  KEY `pk_fl_figurine_literature_idx` (`figurine_id`,`literature_id`),
  KEY `fk_fl_literatur_idx` (`literature_id`),
  CONSTRAINT `fk_fl_figurine` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`),
  CONSTRAINT `fk_fl_literatur` FOREIGN KEY (`literature_id`) REFERENCES `literature` (`literature_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine_literature`
--

LOCK TABLES `figurine_literature` WRITE;
/*!40000 ALTER TABLE `figurine_literature` DISABLE KEYS */;
INSERT INTO `figurine_literature` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `figurine_literature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `figurine_material`
--

DROP TABLE IF EXISTS `figurine_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `figurine_material` (
  `figurine_id` int NOT NULL,
  `material_id` int NOT NULL,
  PRIMARY KEY (`figurine_id`,`material_id`),
  KEY `pk_fm_embedded` (`figurine_id`,`material_id`),
  KEY `fk_figmat_material_idx` (`material_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_figmat_figurine` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`),
  CONSTRAINT `fk_figmat_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine_material`
--

LOCK TABLES `figurine_material` WRITE;
/*!40000 ALTER TABLE `figurine_material` DISABLE KEYS */;
INSERT INTO `figurine_material` VALUES (1,1),(1,2),(1,8),(2,2);
/*!40000 ALTER TABLE `figurine_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (2);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keywords` (
  `keywordId` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(100) NOT NULL,
  PRIMARY KEY (`keywordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `literature`
--

DROP TABLE IF EXISTS `literature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `literature` (
  `literature_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL,
  `isin` varchar(100) DEFAULT NULL,
  `citation` varchar(1500) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`literature_id`),
  KEY `fk_l_parent_idx` (`parent_id`),
  CONSTRAINT `fk_l_parent` FOREIGN KEY (`parent_id`) REFERENCES `literature` (`literature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `literature`
--

LOCK TABLES `literature` WRITE;
/*!40000 ALTER TABLE `literature` DISABLE KEYS */;
INSERT INTO `literature` VALUES (1,'Neuer Fund aus Oberhofen / Tirol',NULL,NULL,3),(2,'Ein weiterer Fund aus Oberhofen in Tirol',NULL,NULL,3),(3,'Funde aus Tirol',NULL,NULL,NULL);
/*!40000 ALTER TABLE `literature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `place` varchar(30) DEFAULT NULL,
  `coordinate` varchar(500) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `coordinate_lat` varchar(255) DEFAULT NULL,
  `coordinate_lng` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `fk_location_country_idx` (`country_id`),
  CONSTRAINT `fk_location_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Acker',NULL,'Oberhofen',NULL,1,NULL,NULL),(2,'Wald',NULL,'Oberhofen',NULL,4,NULL,NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_type`
--

DROP TABLE IF EXISTS `location_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_type` (
  `locationTypeId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`locationTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_type`
--

LOCK TABLES `location_type` WRITE;
/*!40000 ALTER TABLE `location_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  PRIMARY KEY (`material_id`),
  KEY `pk_material` (`material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Bein'),(2,'Bronze'),(8,'Eisen'),(9,'Holz'),(10,'Horn'),(11,'Messing'),(12,'Stein'),(13,'Keramik');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motif_type`
--

DROP TABLE IF EXISTS `motif_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motif_type` (
  `motifTypeId` int NOT NULL,
  `title` varchar(500) NOT NULL,
  PRIMARY KEY (`motifTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motif_type`
--

LOCK TABLES `motif_type` WRITE;
/*!40000 ALTER TABLE `motif_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `motif_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-17 21:44:00
