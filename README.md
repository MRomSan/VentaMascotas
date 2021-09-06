# appMascotas

## Instalación y requisitos
El proyecto fue creado en Angular versión 12.1.1 (usando Visual Studio versión 1.60), Node versión 6.14.13 y SpringBoot versión 2.5.3 (usando NetBeans versión 8.2). Se recomienda usar estas versiones para el correcto funcionamiento de la aplicación.

Los proyectos se encuentran en [GitHub MRomSan](https://github.com/MRomSan) con los nombres [VentaMascotas](https://github.com/MRomSan/VentaMascotas) (proyecto principal de Angular) y [ServiciosAppMascotas](https://github.com/MRomSan/ServiciosAppMascotas) (servicios API REST del proyecto, en SpringBoot). Descargamos los proyectos y procedemos a su instalación:
- Abrimos la consola de Node, nos dirigimos a la carpeta en la que queremos guardar el proyecto y creamos un proyecto mediante el comando: `ng new VentaMascotas`. Seleccionamos que sí queremos agregar el ruteo de Angular presionando `Y`, y elegimos `CSS` como opción de formato de hoja de estilos.
- A continuación, instalamos las dependencias necesarias del proyecto:
En la consola de Node, nos dirigimos a la carpeta del proyecto VentaMascotas e introducimos los siguientes comandos:
  * `npm install bootstrap –-save`
  * `npm install jquery –-save`
  * `npm install popper.js --save`
  * `npm install @types/jquery --save`
  * `npm install @types/bootstrap --save`
  * `npm install ng2-search-filter`
- Una vez terminado el proceso, abrimos la carpeta del nuevo proyecto generado con el Explorador de Archivos de Windows y copiamos en ella todo el contenido de la carpeta “VentaMascotas-main” del proyecto descargado, reemplazando los ficheros existentes.

En cuanto al proyecto de los servicios API REST, usamos el Explorador de Archivos de Windows para buscar la carpeta de nuestros proyectos de NetBeans y copiamos en ella la carpeta descargada “ServiciosAppMascotas-main”. A continuación, abrimos NetBeans y pulsamos “File/OpenProject…”, buscamos la carpeta que acabamos de copiar y presionamos “Open Project”. Con esto se agregará el proyecto “appMascotas” listo para usar.

## Uso y características de la aplicación
Abrimos la aplicación siguiendo estos pasos:
- Se abre Xampp y se arranca Apache y MySQL pulsando los botones “Start” correspondientes a cada uno.
- Abrimos el proyecto “appMascotas” en NetBeans y lo arrancamos pulsando el botón “Run Project”.
- En la consola de comandos de Node nos dirigimos a la carpeta del proyecto “VentaMascotas” y ejecutamos el comando: `ng serve -o`.

Cuando se arranca por primera vez el proyecto “appMascotas” de NetBeans se genera automáticamente la base de datos, los roles necesarios de Usuario y Administrador para su correcto funcionamiento, y un Administrador cuyas credenciales son: **Usuario**: `admin`; **Contraseña**: `admin01`.

Los roles de Administrador y Usuario se usan para controlar que no se pueda enviar peticiones REST a la aplicación sin autorización. También controlan el acceso a las distintas secciones de la aplicación web, por lo que un Usuario sólo podrá acceder al listado de mascotas para su venta y al historial de ventas, y el Administrador tendrá acceso a todos los datos referentes a los usuarios (llamados Empleados en la aplicación), las mascotas, los tipos de mascotas, los clientes y las ventas, y a la modificación de estos datos.

Para comenzar a usar la aplicación se debe hacer “login” con unas credenciales de usuario registrado y dado de alta. Si dicho usuario posee el rol de administrador tendrá acceso a:
- **Empleados**: Listado, Alta, Modificar y Baja. Podrá crear un empleado nuevo en “Alta”; modificar sus datos, incluidos nombre de usuario y contraseña, en “Modificar”; ver un listado completo de los empleados en “Listado”, dónde podrá también darlos de baja o modificar sus datos; y dar de baja a un empleado en “Baja”. Los datos del empleado nunca serán eliminados, sólo se les dará de baja, con lo que su acceso a la aplicación queda anulado. Si en el listado no se ve el botón de “Dar de Baja” se debe a que el empleado ya está dado de baja.
Dos empleados no podrán tener el mismo nombre de usuario para acceder a la aplicación.
- **Mascotas**: Listado, Alta, Modificar, Eliminar y Tipos. Funcionan prácticamente igual que las pantallas de “Empleados”, salvo alguna excepción: no se podrá acceder a las pantallas de “Mascotas” si no existe un “Tipo” de mascota ya registrado; si las mascotas no aparecen en las tablas de “Modificar” o “Eliminar” es porque ya fueron vendidas y sus datos no pueden alterarse, lo mismo que pasa en “Listado” si no aparecen los botones de modificación o eliminación junto a los datos de la mascota; y los “Tipos” podrán modificarse siempre que se desee, aunque no podrán eliminarse si ya existe una mascota con ese tipo asignado.
- **Clientes**: podrá visualizar y modificar los datos de los clientes siempre que lo desee, excepto su DNI, pero nunca podrán eliminarse.
- **Histórico de Ventas**: se pueden visualizar los datos de cada venta y los detalles de cada una. Esto es: código y fecha de la venta; datos del cliente, incluidos teléfono y correo electrónico para posible necesidad de contactar con él; y total de cada venta, así como las mascotas vendidas en cada una. También aparece en el pie de tabla el total de todas las ventas mostradas. Si se usa el filtro de búsqueda el total mostrado a pie de tabla mostrará sólo el total de las ventas filtradas.

Si el usuario “logueado” tiene el rol de usuario, no el de administrador, sólo podrá acceder a:
- **Mascotas**: Se muestra el listado de mascotas, sin posibilidad de modificar sus datos, dónde aparece el botón “Vender” (dicho botón no es accesible para el administrador). Si selecciona al menos una mascota de la tabla y pulsa el botón “Vender” procederá a crear una nueva venta en la que se le pedirá el DNI del cliente. Si el DNI introducido no está registrado como cliente aparece una pantalla emergente para introducir los datos del nuevo cliente, tras lo cual se continua con la venta y su finalización. Si el DNI introducido sí está registrado, aparecerá directamente los detalles de venta con las mascotas vendidas y el importe total para proceder a su finalización.
- **Histórico de Ventas**: al igual que el administrador, el usuario podrá acceder a esta pantalla y ver todos los datos de las ventas ya realizadas.

## Como uso general de la aplicación cabe destacar:
Todas las pantallas que posean una tabla en la que se muestran datos tendrán un campo “Buscar” que se puede usar para filtrar las filas de la tabla por cualquiera de los datos mostrados en ella, haciendo posible la búsqueda de cualquier dato que se desee.

Las pantallas de “Eliminar” mascotas y “Baja” de empleados poseen tablas en las que se pueden seleccionar varias filas a la vez para realizar la operación pertinente en cada una de ellas.

Las pantallas de “Modificar” en empleados y mascotas también son seleccionables, pero en éstas la selección de filas es única para proceder a la modificación del registro marcado.