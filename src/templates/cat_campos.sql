-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-10-2020 a las 13:49:21
-- Versión del servidor: 10.2.33-MariaDB-cll-lve
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cookysof_ISAe_Des`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_campos`
--

CREATE TABLE `cat_campos` (
  `CAMPOID` int(11) NOT NULL,
  `CAMPO` varchar(200) DEFAULT NULL,
  `VALIDAR` varchar(2) DEFAULT NULL,
  `TIPOCAMPO` varchar(200) DEFAULT NULL,
  `RESTRICCIONES` varchar(200) DEFAULT NULL,
  `ALERTAS` varchar(200) DEFAULT NULL,
  `AGRUPACION` varchar(200) DEFAULT NULL,
  `EDITAR` varchar(2) DEFAULT NULL,
  `ENWEB` int(11) DEFAULT NULL,
  `ENAPP` int(11) DEFAULT NULL,
  `AGRUPACIONID` int(11) DEFAULT NULL,
  `COLUMNNAME` varchar(50) DEFAULT NULL,
  `SELECTDEPEND` int(11) DEFAULT NULL,
  `CATALOGOID` int(11) DEFAULT NULL,
  `PATTERN` varchar(150) DEFAULT NULL,
  `ALERTA` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_campos`
--

INSERT INTO `cat_campos` (`CAMPOID`, `CAMPO`, `VALIDAR`, `TIPOCAMPO`, `RESTRICCIONES`, `ALERTAS`, `AGRUPACION`, `EDITAR`, `ENWEB`, `ENAPP`, `AGRUPACIONID`, `COLUMNNAME`, `SELECTDEPEND`, `CATALOGOID`, `PATTERN`, `ALERTA`) VALUES
(1, 'PROYECTO', 'Si', 'CATALOGO 1', 'N/A', 'N/A', 'DATOS DEL PROYECTO', 'NO', 0, 0, 0, 'proyecto', NULL, 1, NULL, 'INGRESA PROYECTO'),
(2, 'DESCRIPCION PROYECTO', 'no', 'CATALOGO 2', 'N/A', 'N/A', 'DATOS DEL PROYECTO', 'NO', 0, 0, 0, 'proyectodescripcion', NULL, 2, NULL, 'INGRESA DESCRIPCION PROYECTO'),
(3, 'FECHA DE ULTIMA MODIFICACION DE REGISTRO', 'Si', 'SE ACTUALIZA AUTOMATICAMENTE, AL HACER UN CAMBIO EN EL REGISTRO', 'N/A', 'N/A', 'DATOS DEL PROYECTO', 'NO', 0, 0, 0, 'fcreacion', NULL, NULL, NULL, 'INGRESA FECHA DE ULTIMA MODIFICACION DE REGISTRO'),
(4, 'SERVICE TAG / FOLIO', 'Si', 'ALFANUMÉRICO', 'NO PODEMOS RESTRINGIR ESTE CAMPO, YA QUE HAY PROYECTOS QUE TIENEN SERVICE TAG (SEDE-01-4567) Y PROYECTOS QUE TIENEN FOLIOS (00238756)', 'ALERTA: SÍ CONTIENE OTRO SIMBOLO QUE NO SEA GUIÓN -', 'DATOS DEL PROYECTO', 'NO', 1, 1, 0, 'folio', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA SERVICE TAG / FOLIO'),
(5, 'ID', 'Si', 'NUMÉRICO', 'SIN RESTRICCIÓN', 'N/A', 'DATOS DEL PROYECTO', 'NO', 1, 0, 0, 'id', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(6, 'APELLIDO PATERNO (USUARIO)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'apaterno', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(7, 'APELLIDO MATERNO (USUARIO)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'amaterno', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(8, 'NOMBRES (USUARIO)', 'no', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'nombres', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(9, 'NOMBRE COMPLETO USUARIO', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'NO', 0, 0, 1, 'nombrecompleto', NULL, NULL, NULL, 'INGRESA NOMBRE COMPLETO USUARIO'),
(10, 'NO. EMPLEADO / FICHA', 'Si', 'NUMÉRICO', 'RESTRICCIÓN DE 6 DIGITOS', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'numempleado', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(11, 'VIP', 'Si', 'CATALOGO 3', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'vip', NULL, 3, NULL, 'INGRESA VIP'),
(12, 'PUESTO', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'puesto', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(13, 'EPS/DIRECCION/UNIDAD', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'direccion', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA EPS/DIRECCION/UNIDAD'),
(14, 'SUBDIRECCION', '', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'subdireccion', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA SUBDIRECCION'),
(15, 'CLAVE DE SUBDIRECCION', 'Si', 'NUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'clavesubdireccion', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(16, 'GERENCIA', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'gerencia', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA GERENCIA'),
(17, 'CLAVE DE GERENCIA', 'Si', 'NUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'clavegerencia', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(18, 'DEPARTAMENTO', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'depto', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA DEPARTAMENTO'),
(19, 'CLAVE CENTRO DE TRABAJO', 'Si', 'NUMÉRICO', 'N/A', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'clavecentrotrabajo', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(20, 'CORREO ELECTRONICO', 'Si', 'ALFANUMÉRICO', 'DEBE TENER UN @', 'N/A', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'correo', NULL, NULL, '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$', 'INGRESA CORREO ELECTRONICO'),
(21, 'TELEFONO', 'Si', 'NUMÉRICO', 'RESTRICCIÓN DE 10 DIGITOS', 'ALERTA: SI SON MENOS DIGITOS O TIENE ALGUN SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'telefono', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(22, 'EXTENSION', 'Si', 'NUMÉRICO', 'SIN RESTRICCIÓN DE LONGITUD', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL USUARIO', 'SI', 1, 1, 1, 'ext', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(23, 'UBICACION FISICA (CALLE, AVENIDA O CARRETERA Y #NUMERO)', 'Si', 'ALFANUMÉRICO', 'SIN RESTRICCIÓN', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'ubicacion', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA UBICACION FISICA (CALLE, AVENIDA O CARRETERA Y #NUMERO)'),
(24, 'CODIGO POSTAL', 'Si', 'CATALOGO 5', 'UNICAMENTE VALIDACIÓN POR ESTADO', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'cp', NULL, NULL, NULL, 'INGRESA CODIGO POSTAL'),
(25, 'ESTADO', 'Si', 'CATALOGO 4', 'N/A', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'estado', NULL, 4, NULL, 'INGRESA ESTADO'),
(26, 'COLONIA', 'Si', 'CATALOGO 6', 'SIN VALIDACIÓN O RESTRICCIÓN', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'colonia', NULL, 6, NULL, 'INGRESA COLONIA'),
(27, 'CONCATENADO (DOMICILIO/UBICACION)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'UBICACION DEL USUARIO', 'NO', 0, 0, 2, 'ubicacioncompleta', NULL, NULL, NULL, 'INGRESA CONCATENADO (DOMICILIO/UBICACION)'),
(28, 'ZONA', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'zona', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA ZONA'),
(29, 'LOCALIDAD', 'Si', 'CATALOGO 7', 'UNICAMENTE VALIDACIÓN POR ESTADO', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'localidad', NULL, 7, NULL, 'INGRESA LOCALIDAD'),
(30, 'EDIFICIO', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTAS: SI CONTIENE ALGÚN SIMBOLO', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'edificio', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA EDIFICIO'),
(31, 'PISO', 'Si', 'CATALOGO 8', 'N/A', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'piso', NULL, 8, NULL, 'INGRESA PISO'),
(32, 'AREA(DIRECCION A LA QUE PERTENECE EL USUARIO)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS', 'ALERTAS: SI CONTIENE ALGÚN SIMBOLO', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'area', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(33, 'ADSCRIPCION(OFICINAS DE REPRESENTACION O UAR - #NUMERO - MUNICIPIO)', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'UBICACION DEL USUARIO', 'SI', 1, 1, 2, 'adscripcion', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA ADSCRIPCION(OFICINAS DE REPRESENTACION O UAR - #NUMERO - MUNICIPIO)'),
(34, 'APELLIDO PATERNO (JEFE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'apellidosjefe', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(35, 'APELLIDO MATERNO (JEFE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'apellidos2jefe', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(36, 'NOMBRES (JEFE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'nombresjefe', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(37, 'NOMBRE COMPLETO (JEFE)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'DATOS DEL JEFE', 'NO', 0, 0, 14, 'nombrecompletojefe', NULL, NULL, NULL, 'INGRESA NOMBRE COMPLETO (JEFE)'),
(38, 'FICHA (JEFE)', 'Si', 'NUMÉRICO', 'RESTRICCIÓN DE 6 DIGITOS', 'N/A', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'fichajefe', NULL, NULL, '^([0-9]){1,6}$', 'INGRESA SOLO NUMEROS'),
(39, 'EXTENSION (JEFE)', 'Si', 'NUMÉRICO', 'SIN RESTRICCIÓN DE LONGITUD', 'N/A', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'extjefe', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(40, 'UBICACION FISICA (JEFE) (CALLE, AVENIDA O CARRETERA Y #NUMERO)', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL JEFE', 'SI', 1, 1, 14, 'ubicacionjefe', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA UBICACION FISICA (JEFE) (CALLE, AVENIDA O CARRETERA Y #NUMERO)'),
(41, 'NOMBRE DEL JEFE INMEDIATO POR ESTRUCTURA', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DE JEFE INMEDIATO', 'SI', 1, 1, 3, 'nombrejefeinmediato', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(42, 'APELLIDO PATERNO (RESGUARDANTE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL RESGUARDANTE', 'SI', 1, 1, 15, 'apellidosresguardo', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(43, 'APELLIDO MATERNO (RESGUARDANTE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL RESGUARDANTE', 'SI', 1, 1, 15, 'apellidos2resguardo', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(44, 'NOMBRES (RESGUARDANTE)', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL RESGUARDANTE', 'SI', 1, 1, 15, 'nombresresguardo', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(45, 'NOMBRE COMPLETO (RESGUARDANTE)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'DATOS DEL RESGUARDANTE', 'NO', 0, 0, 15, 'nombrecompletoresguardo', NULL, NULL, NULL, 'INGRESA NOMBRE COMPLETO (RESGUARDANTE)'),
(46, 'ADSCRIPCION (RESGUARDANTE)', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL RESGUARDANTE', 'SI', 1, 1, 15, 'adscripcionresguardo', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA ADSCRIPCION (RESGUARDANTE)'),
(47, 'EXTENSION (RESGUARDANTE)', 'Si', 'NUMÉRICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL RESGUARDANTE', 'SI', 1, 1, 15, 'extresguardo', NULL, NULL, '^([0-9]){1,10}$', 'INGRESA SOLO NUMEROS'),
(48, 'APELLIDO PATERNO (RESPONSABLE INFORMATICO; JEFE DE UAR O JEFE DE PADRON)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DE JEFE INMEDIATO', 'SI', 1, 1, 3, 'apellidosresponsable', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(49, 'APELLIDO MATERNO (RESPONSABLE INFORMATICO; JEFE DE UAR O JEFE DE PADRON)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DE JEFE INMEDIATO', 'SI', 1, 1, 3, 'apellidos2responsable', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(50, 'NOMBRES (RESPONSABLE INFORMATICO; JEFE DE UAR O JEFE DE PADRON)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DE JEFE INMEDIATO', 'SI', 1, 1, 3, 'nombresresponsable', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(51, 'NOMBRE COMPLETO (RESPONSABLE INFORMATICO; JEFE DE UAR O JEFE DE PADRON)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'DATOS DE JEFE INMEDIATO', 'NO', 0, 0, 3, 'nombrecompletoresponsable', NULL, NULL, NULL, 'INGRESA NOMBRE COMPLETO (RESPONSABLE INFORMATICO; JEFE DE UAR O JEFE DE PADRON)'),
(52, 'APELLIDO PATERNO (TI PETROLEOS MEXICANOS)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DEL TI PEMEX', 'SI', 1, 1, 16, 'apellidospemex', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(53, 'APELLIDO MATERNO (TI PETROLEOS MEXICANOS)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DEL TI PEMEX', 'SI', 1, 1, 16, 'apellidos2pemex', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(54, 'NOMBRES (TI PETROLEOS MEXICANOS)', 'Si', 'ALFABÉTICO', 'N/A', 'N/A', 'DATOS DEL TI PEMEX', 'SI', 1, 1, 16, 'nombrespemex', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(55, 'NOMBRE COMPLETO (TI PETROLEOS MEXICANOS)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'DATOS DEL TI PEMEX', 'NO', 0, 0, 16, 'nombrecompletopemex', NULL, NULL, NULL, 'INGRESA NOMBRE COMPLETO (TI PETROLEOS MEXICANOS)'),
(56, 'TIPO DE EQUIPO', 'Si', 'CATALOGO 9', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'tipoequipo', NULL, 9, NULL, 'INGRESA TIPO DE EQUIPO'),
(57, 'EQUIPO', 'Si', 'EQUIPO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'equipo', NULL, NULL, NULL, 'INGRESA EQUIPO'),
(58, 'MARCA EQUIPO', 'Si', 'CATALOGO 10', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'marcaequipo', 1, 10, NULL, 'INGRESA MARCA EQUIPO'),
(59, 'MODELO EQUIPO', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'modeloequipo', 2, 11, NULL, 'INGRESA MODELO EQUIPO'),
(60, 'NO. DE SERIE EQUIPO', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'numserieequipo', NULL, NULL, '^[a-zA-Z0-9]+$', 'INGRESA NO. DE SERIE EQUIPO'),
(61, 'LARGO (EQUIPO)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'equipocompleto', NULL, NULL, NULL, 'INGRESA LARGO (EQUIPO)'),
(62, 'MONITOR', 'Si', 'MONITOR', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'monitor', NULL, NULL, NULL, 'INGRESA MONITOR'),
(63, 'MARCA MONITOR', 'Si', 'CATALOGO 12', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'marcamonitor', 1, 12, NULL, 'INGRESA MARCA MONITOR'),
(64, 'MODELO MONITOR', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'modelomonitor', 2, 13, NULL, 'INGRESA MODELO MONITOR'),
(65, 'NO. DE SERIE MONITOR', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'numseriemonitor', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE MONITOR'),
(66, 'LARGO (MONITOR)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'monitorcompleto', NULL, NULL, NULL, 'INGRESA LARGO (MONITOR)'),
(67, 'TECLADO', 'Si', 'TECLADO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'teclado', NULL, NULL, NULL, 'INGRESA TECLADO'),
(68, 'MARCA TECLADO', 'Si', 'CATALOGO 14', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'marcateclado', 1, 14, NULL, 'INGRESA MARCA TECLADO'),
(69, 'MODELO TECLADO', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'modeloteclado', 2, 15, NULL, 'INGRESA MODELO TECLADO'),
(70, 'NO. DE SERIE TECLADO', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 1)', 'SI', 1, 1, 4, 'numserieteclado', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE TECLADO'),
(71, 'LARGO (TECLADO)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 1)', 'NO', 0, 0, 4, 'tecladocompleto', NULL, NULL, NULL, 'INGRESA LARGO (TECLADO)'),
(72, 'MOUSE', 'Si', 'MOUSE', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'mouse', NULL, NULL, NULL, 'INGRESA MOUSE'),
(73, 'MARCA MOUSE', 'Si', 'CATALOGO 16', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'marcamouse', 1, 16, NULL, 'INGRESA MARCA MOUSE'),
(74, 'MODELO MOUSE', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'modelomause', 2, 17, NULL, 'INGRESA MODELO MOUSE'),
(75, 'NO. DE SERIE MOUSE', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'numseriemouse', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE MOUSE'),
(76, 'LARGO (MOUSE)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'mousecompleto', NULL, NULL, NULL, 'INGRESA LARGO (MOUSE)'),
(77, 'UPS', 'Si', 'UPS', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'ups', NULL, NULL, NULL, 'INGRESA UPS'),
(78, 'MARCA UPS', 'Si', 'CATALOGO 18', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'marcaups', 1, 18, NULL, 'INGRESA MARCA UPS'),
(79, 'MODELO UPS', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'modeloups', 2, 19, NULL, 'INGRESA MODELO UPS'),
(80, 'NO. DE SERIE UPS', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'numserieups', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE UPS'),
(81, 'LARGO (UPS)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'upscompleto', NULL, NULL, NULL, 'INGRESA LARGO (UPS)'),
(82, 'MALETIN', 'Si', 'MALETIN', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'maletin', NULL, NULL, NULL, 'INGRESA MALETIN'),
(83, 'MARCA MALETIN', 'Si', 'CATALOGO 20', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'marcamaletin', 1, 20, NULL, 'INGRESA MARCA MALETIN'),
(84, 'MODELO MALETIN', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'modelomaletin', 2, 20, NULL, 'INGRESA MODELO MALETIN'),
(85, 'NO. DE SERIE MALETIN', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 2)', 'SI', 1, 1, 5, 'numseriemaletin', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE MALETIN'),
(86, 'LARGO (MALETIN)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 2)', 'NO', 0, 0, 5, 'maletincomleto', NULL, NULL, NULL, 'INGRESA LARGO (MALETIN)'),
(87, 'CANDADO', 'Si', 'CANDADO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'candado', NULL, NULL, NULL, 'INGRESA CANDADO'),
(88, 'MARCA CANDADO', 'Si', 'CATALOGO 20', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'marcacandado', NULL, 20, NULL, 'INGRESA MARCA CANDADO'),
(89, 'MODELO CANDADO', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'modelocandado', NULL, 20, NULL, 'INGRESA MODELO CANDADO'),
(90, 'NO. DE SERIE CANDADO', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'numseriecandado', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE CANDADO'),
(91, 'LARGO (CANDADO)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'candadocompleto', NULL, NULL, NULL, 'INGRESA LARGO (CANDADO)'),
(92, 'BOCINAS', 'Si', 'BOCINAS', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'bocinas', NULL, NULL, NULL, 'INGRESA BOCINAS'),
(93, 'MARCA BOCINAS', 'Si', 'CATALOGO 20', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'marcabocinas', NULL, 20, NULL, 'INGRESA MARCA BOCINAS'),
(94, 'MODELO BOCINAS', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'modelobocinas', NULL, 20, NULL, 'INGRESA MODELO BOCINAS'),
(95, 'NO. DE SERIE BOCINAS', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'numseriebocinas', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE BOCINAS'),
(96, 'LARGO (BOCINAS)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'bocinascompleto', NULL, NULL, NULL, 'INGRESA LARGO (BOCINAS)'),
(97, 'CAMARA', 'Si', 'CAMARA', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'camara', NULL, NULL, NULL, 'INGRESA CAMARA'),
(98, 'MARCA CAMARA', 'Si', 'CATALOGO 20', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'marcacamara', NULL, 20, NULL, 'INGRESA MARCA CAMARA'),
(99, 'MODELO CAMARA', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'modelocamara', NULL, 20, NULL, 'INGRESA MODELO CAMARA'),
(100, 'NO. DE SERIE CAMARA', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 3)', 'SI', 1, 1, 6, 'numseriecmara', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE CAMARA'),
(101, 'LARGO (CAMARA)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 3)', 'NO', 0, 0, 6, 'camaracompleto', NULL, NULL, NULL, 'INGRESA LARGO (CAMARA)'),
(102, 'MONITOR ADICIONAL', 'Si', 'MONITOR ADICIONAL', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'NO', 0, 0, 7, 'monitor2', NULL, NULL, NULL, 'INGRESA MONITOR ADICIONAL'),
(103, 'MARCA MONITOR ADICIONAL', 'Si', 'CATALOGO 12', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'marcamonitor2', NULL, 12, NULL, 'INGRESA MARCA MONITOR ADICIONAL'),
(104, 'MODELO MONITOR ADICIONAL', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'modelomonitor2', NULL, 13, NULL, 'INGRESA MODELO MONITOR ADICIONAL'),
(105, 'NO. DE SERIE MONITOR ADICIONAL', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'numseriemonitor2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE MONITOR ADICIONAL'),
(106, 'LARGO (MONITOR ADICIONAL)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 4)', 'NO', 0, 0, 7, 'monitor2completo', NULL, NULL, NULL, 'INGRESA LARGO (MONITOR ADICIONAL)'),
(107, 'ACCESORIO', 'Si', 'ACCESORIO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'NO', 0, 0, 7, 'accesorio', NULL, NULL, NULL, 'INGRESA ACCESORIO'),
(108, 'MARCA ACCESORIO', 'Si', 'CATALOGO 20', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'marcaaccesorio', NULL, 20, NULL, 'INGRESA MARCA ACCESORIO'),
(109, 'MODELO ACCESORIO', 'Si', 'MODELO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'modeloaccesorio', NULL, 20, NULL, 'INGRESA MODELO ACCESORIO'),
(110, 'NO. DE SERIE ACCESORIO', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'numserieaccesorio', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE ACCESORIO'),
(111, 'LARGO (ACCESORIO)', 'Si', 'SE COMPLETA AUTOMATICAMENTE CON EL LARGO DE LA CASILLA ANTERIOR', 'SIN VALIDACIÓN O RESTRICCIÓN', '', 'DATOS DEL EQUIPO (GRUPO 4)', 'NO', 0, 0, 7, 'accesoriocompleto', NULL, NULL, NULL, 'INGRESA LARGO (ACCESORIO)'),
(112, 'MEMORIA RAM', 'Si', 'CATALOGO 21', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'ram', NULL, 21, NULL, 'INGRESA MEMORIA RAM'),
(113, 'DISCO DURO (GB)', 'Si', 'CATALOGO 22', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'discoduro', NULL, 22, NULL, 'INGRESA DISCO DURO (GB)'),
(114, 'PROCESADOR', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL EQUIPO (GRUPO 4)', 'SI', 1, 1, 7, 'procesador', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA PROCESADOR'),
(115, 'TIPO DE EQUIPO COMPONENTE 1', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'tipoequipocomp1', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 1'),
(116, 'MODELO COMPONENTE 1', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'modelocomp1', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 1'),
(117, 'NO. DE SERIE COMPONENTE 1', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'numseriecomp1', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 1'),
(118, 'CRUCE CON CLIENTE COMPONENTE 1', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 0, 8, 'cruceclientecomp1', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 1'),
(119, 'TIPO DE EQUIPO COMPONENTE 2', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'tipoequipocomp2', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 2'),
(120, 'MODELO COMPONENTE 2', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'modelocomp2', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 2'),
(121, 'NO. DE SERIE COMPONENTE 2', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 1, 8, 'numseriecomp2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 2'),
(122, 'CRUCE CON CLIENTE COMPONENTE 2', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 1)', 'SI', 1, 0, 8, 'cruceclientecomp2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 2'),
(123, 'TIPO DE EQUIPO COMPONENTE 3', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'tipoequipocomp3', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 3'),
(124, 'MODELO COMPONENTE 3', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'modelocomp3', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 3'),
(125, 'NO. DE SERIE COMPONENTE 3', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'numseriecomp3', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 3'),
(126, 'CRUCE CON CLIENTE COMPONENTE 3', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 0, 9, 'cruceclientecomp3', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 3'),
(127, 'TIPO DE EQUIPO COMPONENTE 4', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'tipoequipocomp4', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 4'),
(128, 'MODELO COMPONENTE 4', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'modelocomp4', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 4'),
(129, 'NO. DE SERIE COMPONENTE 4', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'numseriecomp4', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 4'),
(130, 'CRUCE CON CLIENTE COMPONENTE 4', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 2)', 'SI', 1, 1, 9, 'cruceclientecomp4', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 4'),
(131, 'TIPO DE EQUIPO COMPONENTE 5', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'tipoequipocomp5', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 5'),
(132, 'MODELO COMPONENTE 5', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'modelocomp5', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 5'),
(133, 'NO. DE SERIE COMPONENTE 5', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'numseriecomp5', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 5'),
(134, 'CRUCE CON CLIENTE COMPONENTE 5', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 0, 10, 'cruceclientecomp5', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 5'),
(135, 'TIPO DE EQUIPO COMPONENTE 6', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'tipoequipocomp6', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 6'),
(136, 'MODELO COMPONENTE 6', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'modelocomp6', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 6'),
(137, 'NO. DE SERIE COMPONENTE 6', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 1, 10, 'numseriecomp6', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 6'),
(138, 'CRUCE CON CLIENTE COMPONENTE 6', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 3)', 'SI', 1, 0, 10, 'cruceclientecomp6', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 6'),
(139, 'TIPO DE EQUIPO COMPONENTE 7', 'Si', 'CATALOGO 23', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 4)', 'SI', 1, 1, 11, 'tipoequipocomp7', NULL, 23, NULL, 'INGRESA TIPO DE EQUIPO COMPONENTE 7'),
(140, 'MODELO COMPONENTE 7', 'Si', 'CATALOGO 24', 'N/A', 'N/A', 'DATOS DEL EQUIPO PEMEX (GRUPO 4)', 'SI', 1, 1, 11, 'modelocomp7', NULL, 24, NULL, 'INGRESA MODELO COMPONENTE 7'),
(141, 'NO. DE SERIE COMPONENTE 7', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 4)', 'SI', 1, 1, 11, 'numseriecomp7', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA NO. DE SERIE COMPONENTE 7'),
(142, 'CRUCE CON CLIENTE COMPONENTE 7', 'Si', 'ALFANUMÉRICO', 'BLOQUEO DE SIMBOLOS', 'ALERTA: SÍ CONTIENE ALGÚN SIMBOLO', 'DATOS DEL EQUIPO PEMEX (GRUPO 4)', 'SI', 1, 0, 11, 'cruceclientecomp7', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CRUCE CON CLIENTE COMPONENTE 7'),
(143, 'VALIDACION COMPONENTE 1', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 1; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp1', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 1'),
(144, 'VALIDACION COMPONENTE 2', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 2; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp2', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 2'),
(145, 'VALIDACION COMPONENTE 3', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 3; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp3', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 3'),
(146, 'VALIDACION COMPONENTE 4', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 4; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp4', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 4'),
(147, 'VALIDACION COMPONENTE 5', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 5; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp5', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 5'),
(148, 'VALIDACION COMPONENTE 6', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 6; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp6', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 6'),
(149, 'VALIDACION COMPONENTE 7', 'Si', 'SE VALIDA AUTOMATICAMENTE AL VALIDAR COINCIDENCIA DE NO. DE SERIE Y CRUCE CON CLIENTE DEL COMPONENTE 7; (VERDADERO O FALSO)', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validacioncomp7', NULL, NULL, NULL, 'INGRESA VALIDACION COMPONENTE 7'),
(150, 'COMPONENTES VALIDADOS', 'Si', 'CONTAR VERDADEROS DE LAS CASILLAS ANTERIORES', 'N/A', 'N/A', 'VALIDACIONES COMPONENTES PEMEX', 'NO', 0, 0, NULL, 'validadoscomp', NULL, NULL, NULL, 'INGRESA COMPONENTES VALIDADOS'),
(151, 'NOMBRE DEL TECNICO QUE ATENDIO', 'Si', 'ALFABÉTICO', 'BLOQUEO DE SIMBOLOS Y NÚMEROS', 'ALERTA: SÍ CONTIENE ALGÚN NÚMERO O SIMBOLO', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'tecniconombre', NULL, NULL, '^[a-zA-Z ]+$', 'INGRESA SOLO LETRAS'),
(152, 'DIA', 'Si', 'CATALOGO 25', 'N/A', 'N/A', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'dia', NULL, 25, NULL, 'INGRESA DIA'),
(153, 'MES', 'Si', 'CATALOGO 26', 'N/A', 'N/A', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'mes', NULL, 26, NULL, 'INGRESA MES'),
(154, 'ANIO', 'Si', 'CATALOGO 27', 'N/A', 'N/A', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'anio', NULL, 27, NULL, 'INGRESA ANIO'),
(155, 'REQUERIMIENTO ESPECIAL 1 (BORRADOS, PROGRAMAS, ANTIVIRUS, AGENTE BMC, ETC)', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'reqespecial1', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA REQUERIMIENTO ESPECIAL 1 (BORRADOS, PROGRAMAS, ANTIVIRUS, AGENTE BMC, ETC)'),
(156, 'REQUERIMIENTO ESPECIAL 2 (BORRADOS, PROGRAMAS, ANTIVIRUS, AGENTE BMC, ETC)', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DEL SERVICIO', 'SI', 1, 1, 12, 'reqespecial2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA REQUERIMIENTO ESPECIAL 2 (BORRADOS, PROGRAMAS, ANTIVIRUS, AGENTE BMC, ETC)'),
(157, 'OBSERVACIONES INVENTARIO', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'obsinv', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA OBSERVACIONES INVENTARIO'),
(158, 'OBSERVACIONES RESGUARDO', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'obsresguardo', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA OBSERVACIONES RESGUARDO'),
(159, 'OBSERVACIONES EXTRAS 1', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'obsextras1', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA OBSERVACIONES EXTRAS 1'),
(160, 'OBSERVACIONES EXTRAS 2', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'obsextras2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA OBSERVACIONES EXTRAS 2'),
(161, 'ESTATUS ISAE', 'Si', 'CATALOGO 28', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'estatus', NULL, 28, NULL, 'INGRESA ESTATUS ISAE'),
(162, 'FECHA DE ESCALACION ISAE', 'Si', 'FECHA', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'fescalacion', NULL, NULL, NULL, 'INGRESA FECHA DE ESCALACION ISAE'),
(163, 'COMENTARIOS DE ESCALACION ISAE', 'Si', 'ALFANUMÉRICO', 'N/A', 'N/A', 'DATOS DE CONTROL', 'SI', 1, 0, 17, 'comentariosescalacion', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA COMENTARIOS DE ESCALACION ISAE'),
(164, 'CAMPO LIBRE 1', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre1', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 1'),
(165, 'CAMPO LIBRE 2', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre2', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 2'),
(166, 'CAMPO LIBRE 3', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre3', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 3'),
(167, 'CAMPO LIBRE 4', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre4', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 4'),
(168, 'CAMPO LIBRE 5', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre5', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 5'),
(169, 'CAMPO LIBRE 6', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre6', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 6'),
(170, 'CAMPO LIBRE 7', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre7', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 7'),
(171, 'CAMPO LIBRE 8', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre8', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 8'),
(172, 'CAMPO LIBRE 9', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre9', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 9'),
(173, 'CAMPO LIBRE 10', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre10', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 10'),
(174, 'CAMPO LIBRE 11', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre11', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 11'),
(175, 'CAMPO LIBRE 12', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre12', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 12'),
(176, 'CAMPO LIBRE 13', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre13', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 13'),
(177, 'CAMPO LIBRE 14', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre14', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 14'),
(178, 'CAMPO LIBRE 15', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre15', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 15'),
(179, 'CAMPO LIBRE 16', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre16', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 16'),
(180, 'CAMPO LIBRE 17', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre17', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 17'),
(181, 'CAMPO LIBRE 18', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre18', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 18'),
(182, 'CAMPO LIBRE 19', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre19', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 19'),
(183, 'CAMPO LIBRE 20', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'SI', 1, 1, 13, 'campolibre20', NULL, NULL, '^[a-zA-Z0-9 ]+$', 'INGRESA CAMPO LIBRE 20'),
(184, 'campoID', 'No', 'ALFANUMÉRICO', 'N/A', 'N/A', 'OTROS', 'NO', 0, 0, 13, 'campoID', NULL, NULL, NULL, 'INGRESA campoID');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
