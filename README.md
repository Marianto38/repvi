# REPVI

REPVI es un proyecto de software web diseñado para proporcionar una experiencia de usuario intuitiva y eficiente en el ámbito de la seguridad vial, está dirigida a individuos interesados en mantenerse informados y reportar cualquier novedad relacionada con el tráfico y la seguridad vial en su entorno cercano.

### Aspectos Destacados del Proyecto

1. **Experiencia Intuitiva de Donación**: CorpoAyapel ofrece una plataforma fácil de usar que permite a los usuarios donar sin esfuerzo, ya sea mediante una contribución única o una suscripción periódica. El proceso es sencillo, lo que permite a las personas apoyar sus causas elegidas sin complicaciones.

2. **Gestión Eficiente del Sitio**: Con CorpoAyapel, las organizaciones tienen control total sobre el contenido de su sitio web. Pueden actualizar información, compartir noticias, subir imágenes, videos y gestionar consultas de los usuarios de manera efectiva. Esta característica agiliza la administración del sitio, asegurando que la información esté siempre actualizada.

3. **Interacción Directa**: CorpoAyapel fomenta la comunicación directa entre las organizaciones y sus interesados. Los usuarios, voluntarios y empresas que desean hacer donaciones pueden interactuar uno a uno con la organización, fomentando la transparencia y estableciendo conexiones significativas.

4. **Diseño Moderno y Minimalista**: El proyecto presenta un diseño moderno y minimalista del sitio web, ofreciendo una experiencia de navegación sin complicaciones para los usuarios. Este enfoque garantiza que la información se presente de manera clara y concisa, facilitando la navegación por todo el sitio.

#### Para los Usuarios

- Información en Tiempo Real: REPVI proporciona acceso instantáneo a datos precisos sobre el tráfico, accidentes, incidentes, restricciones, pico y placa, cierres viales, estados de las vias, construcciones en carreteras y otros eventos viales que puedan afectar su trayecto diario. Mantenter al usuario al tanto de lo que está sucediendo en tiempo real.

- Reporte de Incidentes:  Cada usuario hace parte activa de la comunidad vial. Con REPVI, puede reportar fácilmente cualquier incidente que observe en la carretera.

- Comunidad Consciente: Fomentamos la colaboración Con REPVI, los usuarios podrán conectarse con otros usuarios preocupados por la seguridad vial en su área y compartir consejos y recomendaciones comentando sus publicaciones

## Caracteristicas/Funcionalidades

- Consultar, Editar, Agregar y eliminar publicaciones
- Guardar publicaciones como favoritas
- Formularios sencillos


## Tech Stack

### Desarrollo Front-end
- SASS: Un popular preprocesador de CSS que mejora las capacidades de estilizado de CSS al proporcionar variables, anidamiento y más.
- Webpack y Babel: Webpack es un potente empaquetador de módulos, y Babel es un compilador de JavaScript. Juntos, permiten utilizar características modernas de JavaScript y empaquetar los activos del proyecto de manera eficiente.

### Gestión del Estado:
- Usestate: Hook de React para gestionar el estado de la aplicación.

### Framework de Desarrollo Front-end:
- React: Una popular biblioteca de JavaScript para construir interfaces de usuario, que ofrece un desarrollo basado en componentes y una eficiente renderización del DOM.


## Demo

Insert gif or link to demo


## Instalación

### Requisitos previos:
-Asegurarse de tener instalado **Node js**, puede correr el comando en su terminal
   ```sh
   node js -v
   ```
En caso de no tener node instalado puede instalarlo con el comando:
   ```sh
   npm install node
   ```
### Proceso de instalación

1. Clonar el proyecto repvi
   
   -Asegurarse de crear una carpeta en su directorio antes de correr el siguiente comando
   ```sh
   git clone https://github.com/Marianto38/repvi.git
   ```
   -Abrir el proyecto instalado
     ```sh
   cd repvi
   ```
2. Instalación de paquetes y dependencias
   ```sh
   npm install
   ```
3. Abrir el proyecto en su editor, en caso de estar usando VSC
   ```sh
   code .
   ```
4. Iniciar el servidor de desarrollo
   ```sh
   npm start
   ```

## Documentacion

[Documentacion](https://github.com/MAKAIABootcamp/corpoAyapelPage-project-front-4/wiki)
![image](https://github.com/MAKAIABootcamp/corpoAyapelPage-project-front-4/assets/37349818/ccf67899-b1ec-49a2-95b7-429eba47bf5b)


<div align="center"> 
  <h2>Vistas Principales</h2>
  <img width="100%" height="auto" src="" height="175px"/>
  <img width="100%" height="auto" src="" height="175px"/>
  <img width="100%" height="auto" src="" height="175px"/>
</div>

## Despliegue

### Requisitos previos:
-Asegurarse de tener instalado **Docker**, puede correr el comando en su terminal
   ```sh
   docker -v
   ```
-Si no tiene docker instalados seguir los pasos para su instalación de acuerdo a la documentación

[instalar docker](https://docs.docker.com/desktop/install/windows-install/)
### Dockerización de la aplicación

1. Iniciar la construcción de la imagen
   ```sh
   docker build -t repvi .
   ```
   
2. Levantar la imagen
   ```sh
   docker run -d -p 3000:3000 repvi
   ```

3. Abrir el puerto local
   ```sh
   localhost3000:3000
   ```



