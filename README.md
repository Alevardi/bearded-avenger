#Bikingos

Juego de realidad aumentada; domina la ciudad usando ecobicis.

Este repositorio contiene la aplicación web del juego: puedes acceder al mapa general de la ciudad y ver mediante mapas de calor las partes de la ciudad que tu equipo domina.

También puedes ver el leaderboard general del juego, en el que encontrarás a los jugadores más experimentados.

## El juego no termina aquí

Este repositorio sólo cuenta con la webapp para la visualuzación general de información. Para jugar, necesitas instalar la [aplicación móvil](https://github.com/Alevardi/bikingos-app) en tu android, que se alimenta de [nuestra propia API](https://github.com/Alevardi/bikingos-api) construida con base en los [datos abiertos de ecobici](http://datos.labplc.mx/movilidad.info) proporcionados durante el [segundo festival de datos de la ciudad de México](http://hack.labcd.mx/).

Este juego es un prototipo desarrollado para el [#HackCDMX 2015](http://hack.labcd.mx/).

##Desarrolladores

###Dependencias:

Para contribuir a Bikingos es necesario tener instalado en tu computadora:

+ [Node.js 0.10.* o superior](https://nodejs.org/)
 - Plataforma construida sobre el runtime para javascript de Google Chrome para construir aplicaciones en tiempo real y escalables.
+ [npm 2.5 o superior](https://www.npmjs.com/)
 - Node Package Manager: administrador de paquetes y dependencias para node.js
+ [git 2.3 o superior](http://git-scm.com/)
 - Control de versiones utilizado por Bikingos y sus dependencias.
+ [bower 1.3 o superior](http://bower.io/)
 - Administrador de dependencias para el cliente web.
+ [node-gyp1.0 o superior](https://www.npmjs.com/package/node-gyp)
 - Compilador de módulos nativos multiplatadorma para node.js

###Configuración:

Para ejecutar Bikingos exitosamente es necesario [instalar y configurar correctamente](https://github.com/joyent/node/wiki/installation) node.js y sus variables de entorno.

También es necesario [instalar y configurar correctamente](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) git y sus variables de entorno.

Los procesos de instalación y configuración varían en función del sistema operativo que utilices, y están cubiertos en las guías propocionadas anteriormente.

###Configuración de desarrollo local:

Para comenzar a contribuir a Bikingos-web:

Clona este repositorio:

`git clone https://github.com/Alevardi/bikingos-web`

Instala sus dependencias:

`npm install && bower install`

Empaqueta:

`grunt`

Y ejecuta:

`node index.js`


###Despliegue:

Bikingos está hosteado en Digital Ocean; puedes desplegar tu propia copia allí o en tu servicio de hosting preferido.

Para levantarlo, [puedes usar nuestros scripts de configuración](https://gist.github.com/Alevardi/5d4ad514457ddd42ced8)
