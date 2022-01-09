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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES (1,'Situla',NULL),(2,'Gefäß',NULL),(3,'Schwert',NULL),(4,'Figur',NULL),(5,'Messer',NULL),(6,'Fibula',NULL),(7,'Scheide',NULL),(8,'Gürtelblech',NULL),(9,'Attache',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chronology`
--

LOCK TABLES `chronology` WRITE;
/*!40000 ALTER TABLE `chronology` DISABLE KEYS */;
INSERT INTO `chronology` VALUES (1,'LT A',450,380),(2,'LT B',380,250),(3,'LT C',250,150),(4,'LT D',150,15),(5,'Ha C',778,620),(6,'Ha D1',621,550),(7,'Ha D2',550,510),(8,'Ha D3',510,450),(12,'Este II',342,NULL),(13,'Este I',34,45),(15,'Javorani I',720,652),(17,'Javorani II',650,580);
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
-- Table structure for table `context`
--

DROP TABLE IF EXISTS `context`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `context` (
  `context_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`context_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `context`
--

LOCK TABLES `context` WRITE;
/*!40000 ALTER TABLE `context` DISABLE KEYS */;
INSERT INTO `context` VALUES (1,'Unbekannt'),(2,'Grab'),(3,'Siedlung'),(4,'Heiligtum'),(5,'Depot'),(6,'Wasser'),(7,'Moor');
/*!40000 ALTER TABLE `context` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Tirol / AT',NULL,NULL,NULL),(2,'Vorarlberg / AT',NULL,NULL,NULL),(3,'Schweiz',NULL,NULL,NULL),(4,'Südtirol / IT',NULL,NULL,NULL),(5,'Trentino / IT',NULL,NULL,NULL),(6,'Italien',NULL,NULL,NULL),(7,'Salzburg / AT',NULL,NULL,NULL),(8,'Kärnten / AT',NULL,NULL,NULL),(9,'Steiermark / AT',NULL,NULL,NULL),(10,'Liechtenstein',NULL,NULL,NULL),(11,'Slowenien',NULL,NULL,NULL),(12,'Veneto / IT',NULL,NULL,NULL),(13,'Frankreich',NULL,NULL,NULL),(14,'Deutchland',NULL,NULL,NULL),(15,'Oberösterreich / AT',NULL,NULL,NULL),(16,'Niederösterreich / AT',NULL,NULL,NULL),(17,'Burgenland / AT',NULL,NULL,NULL),(18,'Steiermark / AT',NULL,NULL,NULL);
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
  `motif_id` int DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `context_id` int DEFAULT NULL,
  PRIMARY KEY (`figurine_id`),
  KEY `fk_chronology_idx_idx` (`chronology_id`),
  KEY `fk_carrier_idx_idx` (`carrier_id`),
  KEY `fk_location_idx` (`location_id`),
  KEY `fk_exibit_location_idx` (`exibit_location_id`),
  KEY `fk_motif_idx` (`motif_id`),
  KEY `FKehsttid5dnaprwaxyvfxiw006` (`context_id`),
  CONSTRAINT `FK2q52tep7t3wk471d0ayrlk1cg` FOREIGN KEY (`motif_id`) REFERENCES `motif` (`motif_id`),
  CONSTRAINT `FK84qhro87tkh80ukd5x87r8391` FOREIGN KEY (`exibit_location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_carrier_idx` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`carrier_id`),
  CONSTRAINT `fk_chronology_idx` FOREIGN KEY (`chronology_id`) REFERENCES `chronology` (`chronology_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_exibit_location` FOREIGN KEY (`exibit_location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_motif` FOREIGN KEY (`motif_id`) REFERENCES `motif` (`motif_id`) ON UPDATE CASCADE,
  CONSTRAINT `FKehsttid5dnaprwaxyvfxiw006` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`),
  CONSTRAINT `FKlpbjf0tb2svt7a3q5kr38f0b7` FOREIGN KEY (`chronology_id`) REFERENCES `chronology` (`chronology_id`),
  CONSTRAINT `FKmbcjt1tl4de71envvusb8j9a0` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`carrier_id`),
  CONSTRAINT `FKp959uqpxhif4cjkncjnso78o6` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine`
--

LOCK TABLES `figurine` WRITE;
/*!40000 ALTER TABLE `figurine` DISABLE KEYS */;
INSERT INTO `figurine` VALUES (1,'Sänger aus Oberhofen','ikonologie','ikonografie',3,'4567','123','description of material','sänger horn trinker figur',1,2,NULL,10,NULL,3),(2,'Krieger aus Oberhofen','Ikonologische Beschreibung ist nicht vorhanden da keine schriftliche Hinterlassenschaften vorhanden. Warum aber die Maske : wei\'ls dem so ist..','Figur einer Person mit einem Neaguer Helm am Kopf. In der rechten Hand hält sie ein ovales Objekt das als eine Maske oder als ein Kopf assoziert wird. ',3,NULL,'321','bronze','krieger | maske | figur | negauerhelm ',2,1,NULL,1,NULL,1),(39,'Herkules',NULL,' Der r. Arm ist nach oben gebogen und hielt Keule, von der nur mehr ein kleines Fragment erhalten ist. Über den waagerecht nach vorne gestrecktem l. Arm hängt ein Stück des Löwenfelles. Der l. Fuß ist leicht vorgestellt. Der schlanke Körper zeigt keine Differenzierung der einzelnen Muskelpartien. Das grob angelegte Gesicht besitzt asymmetrisch gestaltete Augen. Bei dem hornartigen Fortsatz am Kopf handelt es sich nicht um eine Frisur sondern um stilisierten Löwenkopf, den Herkules wie eine Kapuze trägt.\n',4,'4 -> 1 Jh.v.u.Z.','18.087','Glatte Oberfläche, mit dunkelgrüner, in den Vertiefungen hellgrüner Patina.','löwenkopf | herkules',4,94,91,7,NULL,1),(41,'Jupiter',NULL,NULL,2,NULL,NULL,NULL,NULL,4,29,NULL,2,NULL,4),(44,'Kouros von Pillersattel','','',8,'','','','kouros | ertursker | pillersattel | heiligtum | brandopferplatz ',4,43,NULL,12,'https://sketchfab.com/models/4106b97a905f4dca886dff772ec21539/embed',4),(52,'Krieger aus Leisach',NULL,NULL,4,NULL,NULL,NULL,'krieger',4,29,NULL,1,NULL,4),(55,'Mars von Guttenberg',NULL,NULL,3,NULL,NULL,NULL,'Negauerhelm | Lanze | Brustpanzer | Krieger',4,54,NULL,1,NULL,4),(58,'Adorant von Pillersattel','','',1,'','','','adorant | kreisaugen | dekoration | pillersattel |',4,43,NULL,11,'https://sketchfab.com/models/48c15516feb84cf38d7d1055b5f72d67/embed',4),(70,'Musiker aus Idrija','','',3,'','','','musiker | negauerhelm | kleid | armreifen | fußreifen',4,69,NULL,10,'https://sketchfab.com/models/22510ac9e6764a87bc00cb502242938e/embed',5),(95,'Herkules','','Die r. Hand mit der Keule über den Kopf erhoben, die l. mit stilisierten Löwenfell nach vorne gestreckt. Ausfall mit dem l. Bein. Die Haare sind in einer Art Pagenfrisuer geschnitten und durch Kerben angegeben. Das Gesicht wegen der starken Korosion recht undeutlich zu erkennen. Der Körper ist gut durchgebildet, die Muskulatur ist plastisch und gut wiedergegeben.\n',3,'4 ->1Jh.v.u.Z','5005','Hellgrüne bis bläuliche Pattina, stellenweise rauhe Oberfläche.\nTeilweise korodiert.','keule | fell',4,94,91,7,'',1),(97,'Herkules','','Obwohl diesem Figürchen jedes Attribut fehlt, kann es als Darstellung des Herkules verstanden werden. Das l. Bein ist vorgestellt, der r. Arm angehoben und nach dem Ellbogen abgebrochen. Der l. Arm ist vorgestreckt und schon über dem Ellbogen abgebrochen. Die Haare sind am Schädel nicht differenziert und bilden oberhalb des Gesichtes einen Wülst. Der Körper ist eher zart und ohne Angabe der Muskeln. Das Gesicht ist wegen der starken Abreibung nicht mehr richtig zu erkennen.\n',3,'4 -> 1 Jh.v.u.Z','5072','Grüner Patina, glatte Oberfläche, stellenweise abgerieben. ','ohne attribute',4,94,91,7,'',1);
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
  CONSTRAINT `fk_fl_literatur` FOREIGN KEY (`literature_id`) REFERENCES `literature` (`literature_id`),
  CONSTRAINT `FKn9evxwf9jw9devm3iv4aknf9r` FOREIGN KEY (`literature_id`) REFERENCES `literature` (`literature_id`),
  CONSTRAINT `FKrw6xg2m247h3a1i6uhg2jnvrd` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine_literature`
--

LOCK TABLES `figurine_literature` WRITE;
/*!40000 ALTER TABLE `figurine_literature` DISABLE KEYS */;
INSERT INTO `figurine_literature` VALUES (1,1),(2,2),(52,24),(39,25),(95,25),(97,25);
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
  CONSTRAINT `FK68h13gftdom45uwjo1e817rxs` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`),
  CONSTRAINT `fk_figmat_figurine` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`),
  CONSTRAINT `fk_figmat_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`),
  CONSTRAINT `FKgy2rq4xm3h7mlvk93w2w7e0f` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurine_material`
--

LOCK TABLES `figurine_material` WRITE;
/*!40000 ALTER TABLE `figurine_material` DISABLE KEYS */;
INSERT INTO `figurine_material` VALUES (1,1),(1,2),(2,8),(39,2),(41,2),(44,2),(52,2),(55,2),(58,2),(70,2),(95,2),(97,2);
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
INSERT INTO `hibernate_sequence` VALUES (103),(1),(1),(1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` int NOT NULL,
  `image_base64` longtext,
  `image_path` varchar(300) DEFAULT NULL,
  `image_title` varchar(255) DEFAULT NULL,
  `figurine_id` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKbcepiy86l4ke2xml0bh88l2n1` (`figurine_id`),
  CONSTRAINT `FKbcepiy86l4ke2xml0bh88l2n1` FOREIGN KEY (`figurine_id`) REFERENCES `figurine` (`figurine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (57,NULL,'/images/','gutenberg-mars.jpg',55),(73,NULL,'/images/','idrija.png',70),(75,'','/images/','sänger.png',1),(78,NULL,'/images/','kouros_f_ps.jpg',44),(82,NULL,'/images/','jupiter-klosterfrauenbichl.jpg',41),(87,NULL,'/images/','waschl.jpg',52),(88,'','/images/','oberhofen.jpg',2),(90,NULL,'/images/','adorant_f_ps.jpg',58),(96,NULL,'/images/','herkules_tlm_5005.png',95),(98,NULL,'/images/','herkules_tlm_5072.png',97),(102,NULL,'/images/','herkules-sanzeno.png',39);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
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
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`literature_id`),
  KEY `fk_l_parent_idx` (`parent_id`),
  CONSTRAINT `fk_l_parent` FOREIGN KEY (`parent_id`) REFERENCES `literature` (`literature_id`),
  CONSTRAINT `FKt78cw6ofhv0rt3j8o4v8mvr91` FOREIGN KEY (`parent_id`) REFERENCES `literature` (`literature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `literature`
--

LOCK TABLES `literature` WRITE;
/*!40000 ALTER TABLE `literature` DISABLE KEYS */;
INSERT INTO `literature` VALUES (1,'Neuer Fund aus Oberhofen / Tirol',NULL,NULL,3,'N. Đukanović'),(2,'Ein weiterer Fund aus Oberhofen in Tirol',NULL,NULL,3,'Gerhard Tomedi'),(3,'Funde aus Tirol',NULL,NULL,NULL,'Gerhard Tomedi'),(24,'Der jugendliche Jupiter aus dem Heiligtum in Lienz','','',NULL,'Barbara Kainrath'),(25,'Figürliche Bronzen aus Tirol','','',NULL,'Elisabeth Walde-Psenner'),(26,'Brandopferplatz am Pillersattel ober Fließ','112233445','',NULL,'W. von Sydow');
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
  `location_type` int DEFAULT '1',
  PRIMARY KEY (`location_id`),
  KEY `fk_location_country_idx` (`country_id`),
  CONSTRAINT `fk_location_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FKn5m6ve3ryy2r25qvisdrg0aos` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Acker','fghfgh','Oberhofen','2452645',1,'47.30292321322043','11.100096702575685',1),(2,'Wald','','Oberhofen','',1,'47.30444','11.09480',1),(8,'Sanzeno','','Sanzeno','',5,'46.369172','11.080070',1),(29,'Frauenbichl','','Leisach','',1,'46.820653','12.753148',1),(43,'Pillersattel','','Fliess','',1,'47.116220','10.668557',1),(54,'Guttenberg','','Liechtenstein','',10,'47.065313576250446','9.500179505979437',1),(69,'Idrija','','Idrija ob Bači','',11,'46.000693','14.018495',1),(85,'Kröllkogel','','Kleinklein','',9,'46.743077265698496','15.427945554256441',1),(91,'Tiroler Landesmuseum Ferdinandeum','Museumstrasse 15','Innsbruck','',1,'47.26726143067104','11.397800445556642',2),(94,'Unbekannt','','-','',1,'46.98025235521883','11.49169921875',1);
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
-- Table structure for table `motif`
--

DROP TABLE IF EXISTS `motif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motif` (
  `motif_id` int NOT NULL,
  `title` varchar(500) NOT NULL,
  PRIMARY KEY (`motif_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motif`
--

LOCK TABLES `motif` WRITE;
/*!40000 ALTER TABLE `motif` DISABLE KEYS */;
INSERT INTO `motif` VALUES (1,'Krieger'),(2,'Gottheit'),(3,'Fabeltier'),(4,'Vogel'),(5,'Stier'),(6,'Pferd'),(7,'Herkules'),(8,'Boxer'),(9,'Wagenlenker'),(10,'Musiker'),(11,'Adorant'),(12,'Mann'),(13,'Frau'),(14,'Reiter'),(15,'Widder'),(16,'Hirsch');
/*!40000 ALTER TABLE `motif` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-09 18:47:32
