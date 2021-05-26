-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: webbbip
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `devicemodels`
--

DROP TABLE IF EXISTS `devicemodels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devicemodels` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(150) NOT NULL,
  `numberOfSlots` int(11) NOT NULL,
  `vendor` varchar(150) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicemodels`
--

LOCK TABLES `devicemodels` WRITE;
/*!40000 ALTER TABLE `devicemodels` DISABLE KEYS */;
INSERT INTO `devicemodels` VALUES (1,'NE40e-X16a',16,'Huawei','2021-03-21 11:00:49','2021-03-21 11:00:49',NULL);
/*!40000 ALTER TABLE `devicemodels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deviceroles`
--

DROP TABLE IF EXISTS `deviceroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deviceroles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceroles`
--

LOCK TABLES `deviceroles` WRITE;
/*!40000 ALTER TABLE `deviceroles` DISABLE KEYS */;
INSERT INTO `deviceroles` VALUES (1,'PE Infraestructura','2021-03-21 10:59:16','2021-03-21 10:59:16',NULL);
/*!40000 ALTER TABLE `deviceroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL,
  `roleId` bigint(20) unsigned NOT NULL,
  `modelsId` bigint(20) unsigned NOT NULL,
  `nodesId` bigint(20) unsigned NOT NULL,
  `nsoLicense` int(1) unsigned DEFAULT 0,
  `ipMgmt` varchar(150) DEFAULT NULL,
  `ipIgp` varchar(150) DEFAULT NULL,
  `room` int(10) unsigned NOT NULL,
  `row` varchar(2) DEFAULT NULL,
  `rack` int(10) unsigned DEFAULT NULL,
  `rackUnit` int(10) unsigned DEFAULT NULL,
  `hierarchy` varchar(150) NOT NULL,
  `virtual` int(1) NOT NULL DEFAULT 0,
  `versionId` bigint(20) unsigned NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modelsId_idx` (`modelsId`),
  KEY `nodesId_idx` (`nodesId`),
  KEY `rolesId_idx` (`roleId`),
  KEY `VersionID_idx` (`versionId`),
  CONSTRAINT `VersionID` FOREIGN KEY (`versionId`) REFERENCES `versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `modelsId` FOREIGN KEY (`modelsId`) REFERENCES `devicemodels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `nodesId` FOREIGN KEY (`nodesId`) REFERENCES `nodes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rolesId` FOREIGN KEY (`roleId`) REFERENCES `deviceroles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'CO008-PE-07','En Servicio',1,1,1,1,'10.2.191.7','10.2.190.7',1,'J',30,0,'Acceso',0,1,'2021-03-21 11:01:31','2021-05-23 12:40:18',NULL),(2,'CO008-PE-08','En Servicio',1,1,1,1,'10.2.191.8','10.2.190.8',1,'J',31,0,'Acceso',0,1,'2021-03-22 14:27:51','2021-03-22 14:27:51',NULL),(17,'CF223-PE-03','En Servicio',1,1,2,1,'10.2.191.18','10.2.190.18',3,'B',1,0,'Acceso',0,1,'2021-04-26 15:32:27','2021-04-27 21:46:00',NULL),(18,'TCF296-PE-04','En Servicio',1,1,2,1,'10.2.191.30','10.2.190.30',1,'J',13,0,'Core',0,1,'2021-05-25 23:53:39','2021-05-26 09:55:16','2021-05-26 09:55:23');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodes`
--

DROP TABLE IF EXISTS `nodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `cellId` varchar(45) NOT NULL,
  `province` varchar(150) NOT NULL,
  `country` varchar(150) NOT NULL,
  `totalRooms` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodes`
--

LOCK TABLES `nodes` WRITE;
/*!40000 ALTER TABLE `nodes` DISABLE KEYS */;
INSERT INTO `nodes` VALUES (1,'Córdoba ECP','CO008','Córdoba','Argentina',2,'2021-03-21 10:50:40','2021-03-21 10:50:40',NULL),(2,'Torcuato','CF223','Buenos Aires','Argentina',3,'2021-04-26 12:30:08','2021-04-26 12:30:08',NULL);
/*!40000 ALTER TABLE `nodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ports`
--

DROP TABLE IF EXISTS `ports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ports` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `deviceId` bigint(20) unsigned NOT NULL,
  `slot` int(11) NOT NULL,
  `subSlot` int(11) NOT NULL,
  `port` int(11) NOT NULL,
  `boardModule` varchar(45) NOT NULL,
  `license` int(1) NOT NULL,
  `status` varchar(45) NOT NULL,
  `project` varchar(150) NOT NULL,
  `espejado` varchar(150) NOT NULL,
  `clientSide` varchar(150) NOT NULL,
  `editedByUser` varchar(150) NOT NULL,
  `createdAt` date DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT current_timestamp(),
  `deletedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `deviceId_idx` (`deviceId`),
  CONSTRAINT `deviceId` FOREIGN KEY (`deviceId`) REFERENCES `devices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ports`
--

LOCK TABLES `ports` WRITE;
/*!40000 ALTER TABLE `ports` DISABLE KEYS */;
INSERT INTO `ports` VALUES (1,1,1,0,0,'SFP-100G',1,'Asignado','Interplano a CO008-PE-08','N1-G37 UR 06-PP17  pos9','N1K30 CO008-PE-08 100GE 1/0/0','Emi Edit','2021-04-20','2021-05-25',NULL),(2,1,1,0,1,'SFP-100G',0,'Asignado','CO008-PEDC-01','N1-G37 UR 06-PP17  pos10','CO008-PEDC-01 1/1/c1/1','Emi Edit','2021-04-20','2021-05-25',NULL),(5,1,2,0,0,'SFP-10G',1,'Asignado','HuaweiIP+O-IR14263','N1-G36 Bandeja 9 1A-B','N1L12 CRV70_SR12 Teng 10/1/3','Emi','2021-04-20','2021-04-20',NULL),(6,1,3,0,0,'SFP-10G',1,'Asignado','HuaweiIP+O-IR14263','N1-G36 Bandeja 9 1A-B','N1L12 CRV70_SR12 Teng 10/1/3','Emi','2021-04-20','2021-04-20',NULL),(7,1,7,0,0,'SFP-10G',1,'Asignado','HuaweiIP+O-IR14263','N1-G36 Bandeja 9 1A-B','N1L12 CRV70_SR12 Teng 10/1/3','Emi','2021-04-20','2021-04-20',NULL),(10,1,1,0,0,'SFP-100G',1,'Asignado','Interplano a ','N1-G37 UR 06-PP17  pos9','N1K30 CO008-PE-08 100GE 1/0/0','Emi','2021-04-20','2021-04-20',NULL),(11,1,1,1,0,'SFP-100G',0,'Libre','','','','Emi Edit','2021-04-20','2021-05-26',NULL),(60,2,1,1,0,'SFP-100G',1,'Asignado','Interplano a CO008-PE-07','N1-G37 UR 06-PP17  pos9','N1K29 CO008-PE-07 100GE 1/0/0','Emi Edit','2021-04-21','2021-05-23',NULL);
/*!40000 ALTER TABLE `ports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(45) NOT NULL,
  `firstName` varchar(150) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `versions`
--

DROP TABLE IF EXISTS `versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `versions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `servicePack` varchar(150) DEFAULT NULL,
  `smuPatch` varchar(150) DEFAULT NULL,
  `psrrLink` varchar(250) DEFAULT NULL,
  `forRoleId` bigint(20) unsigned NOT NULL,
  `forModelId` bigint(20) unsigned NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `forModelId_idx` (`forModelId`),
  KEY `forRoleId_idx` (`forRoleId`),
  CONSTRAINT `forModelId` FOREIGN KEY (`forModelId`) REFERENCES `devicemodels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `forRoleId` FOREIGN KEY (`forRoleId`) REFERENCES `deviceroles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `versions`
--

LOCK TABLES `versions` WRITE;
/*!40000 ALTER TABLE `versions` DISABLE KEYS */;
INSERT INTO `versions` VALUES (1,'V800R011C10','SPC100',' SPH037','https://colaboracion.claro.amx',1,1,'2021-03-21 11:00:58','2021-03-21 11:00:58',NULL);
/*!40000 ALTER TABLE `versions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-26 15:09:09
