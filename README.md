
# Proyecto Unidad 08: 
### Desarolllo Backend

| Integrantes | Ruta     |  
| :-------- | :------- | 
| Luis Enrique Huanca Champi | A2 |
| Kimberly Pocco Pocco Pariona | A1 | 
| David Adrian Roca Limache | A2 | 
| Richard Ore Mallcco | A2 | 
| Joel Enrique Ramirez Garay | A2 | 
| Yoselin  Rudas Basaldua | A2 | 

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.
Mira **Instalación** para conocer como desplegar el proyecto.

## Comenzando 🚀

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

### Pasos a realizar para ejecutar:

Instalar dependencias

```
  npm install
```
Instalar el directorio dist
```
  npx tsc --init
```

Realizar migraciones

```
  npx prisma migrate dev --name init
```

Correr el proyecto

```
  npm run dev
```

# API

## Descripción de Enpoints

### Crear usuario

```
  POST /api/v1/usuario
```

| Parameter | Type     |  
| :-------- | :------- | 
| nombre | `string` |
| correo | `string` | 
| contrasena | `string` | 
| es_propietario | `boolean` | 

### Login

```
  POST /api/v1/users/login
```

| Parameter | Type     |           
| :-------- | :------- | 
| correo | `string` | 
| contrasena | `string` | 

### Resgitros y listas logueandose
_Solo podra crear los campos y visualizarlos siempre y cuando este logueado el tipo de usaurio_

### Crear Restaurante

```
  POST /api/v1/restaurante
```

| Parameter | Type     |           
| :-------- | :------- | 
| nombre | `string` | 
| departamento | `string` | 
| telefono | `string` | 
| referencia | `string` | 
| distrito | `string` | 
| provincia | `string` |
| tipo | `string` | 
| usuarioId | `int` | 
| apertura | `date` | 
| cierre | `date` | 
| fech_creacion | `datetime` | 
| calificacion | `int` | 
| descripcion | `string` | 

#Registrar Platos

```
  POST /api/v1/platos
```
| Parameter | Type     |           
| :-------- | :------- | 
| nombre_plato | `string` | 
| precio | `int` | 
| imagen | `string` | 
| disponibilidad | `boolean` | 
| descripcion | `string` | 
| restaurante_Id | `int` | 


### Listar platos 

```
  GET /api/v1/platos
```
_Únicamente se mostrará los platos por restaurante_Id_

### Buscar platos por ID 
```
  GET /api/v1/songs/:id
```

| Parameter | Type     |           
| :-------- | :------- | 
| id | `int` |

 Headers | Type     |           
| :-------- | :------- | 
| Authorization | `string`|


### Crear Comentario 

```
  POST /api/v1/createplaylist
```

| Parameter | Type     |           
| :-------- | :------- | 
| comentario | `string` | 
| calificacion | `int` | 
| restaurante_Id | `int` | 

