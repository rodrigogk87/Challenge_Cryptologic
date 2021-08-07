Para correr el programa:

1. clonar el proyecto y hacer un checkout a la rama development

2. instalar las dependecias con npm i

3. crear un .env en el root del proyecto y configurarlo con los siguientes datos: 
    DB_URL=URL_DE_DASE_DE_DATOS_MONGO_DB, por ejemplo mongodb://localhost:27017/ChallengeCryptologic
    POLYGON_ENDOINT=https://matic-mainnet.chainstacklabs.com

4. correr el deamon de mongodb

5. correr el comando npm run program 