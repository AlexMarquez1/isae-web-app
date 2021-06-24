

SELECT * FROM `isae_des`.`cat_campos` where campoid = 4;



-- UPDATE `isae_des`.`cat_campos`
--      SET pattern = "^[a-zA-Z ]+$"
--      WHERE campoid = 4;



SELECT fregistro, substring(fregistro, 1, 10) FROM `isae_des`.`tbl_files_otros` LIMIT 1000;


SELECT *
FROM `isae_des`.`tbl_files_otros` 
where substring(fregistro, 1, 10) = '2020-09-28'

SELECT fregistro, substring(fregistro, 1, 10), Date(fregistro), Time(fregistro)
FROM `isae_des`.`tbl_files_otros` 
where substring(fregistro, 1, 10) = '2020-09-28'

SELECT *
FROM `isae_des`.`cat_usuarios` 



select agrupacion 
from `isae_des`.`cat_campos` a 
where enweb = 1 group by agrupacion
order by campoid


-----> 
---> Error mostradao con la version 8.0.21 de mysql en Linux,
---> en la consulta desde JPA: Expression #1 of ORDER BY clause is not in GROUP BY clause and contains nonaggregated column 'isae_des.formcampos0_.CAMPOID' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
---> en myqdl: Error: ER_WRONG_FIELD_WITH_GROUP: Expression #1 of ORDER BY clause is not in GROUP BY clause and contains nonaggregated 

Nota: En la version 5.6.43 de mysql desde un hosting no se mostro el error.

--> Se verifica con lo siguiente:
SELECT @@sql_mode

--> mysql 8.0.21 linux
IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

--> mysql 5.6.43 
STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_...

--> Esto es lo que provoca el error:
ONLY_FULL_GROUP_BY

--> Solucion

--> Aplicada en mysql 8.0.21 linux
--SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

--> Resultado despues de la actualziacion
GNORE_SPACE,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION



