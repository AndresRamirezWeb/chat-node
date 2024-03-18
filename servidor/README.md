# CHAT-NODE

## Configuración
Clonar el repositorio.
Instalar dependencias usando npm install.
Iniciar el servidor usando npm start.

## Uso
Conéctate al servidor utilizando un cliente WebSocket.
Envía mensajes emitiendo un evento message con los datos del mensaje.
Observa quién está escribiendo emitiendo un evento typing.
Recibe actualizaciones sobre nuevos usuarios que se unen o abandonan emitiendo el evento newUser.

## Estructura de Archivos
index.js: Contiene la lógica principal del servidor.
messages.json: Archivo JSON para almacenar mensajes.

## Dependencias
cors: ^2.8.5
express: ^4.18.3
nodemon: ^3.1.0
socket.io: ^4.7.4

## Scripts
start: Utiliza nodemon para ejecutar el servidor con reinicio automático ante cambios en archivos.

## Endpoints de API
GET /api: Retorna una respuesta JSON con el mensaje "Hello world".
GET /api/messages: Retorna el contenido de messages.json.

## Eventos de Socket
message: Enviado por clientes para enviar mensajes.
messageResponse: Enviado por el servidor en respuesta a un evento de mensaje.
typing: Indica cuando un usuario está escribiendo.
typingResponse: Difunde el estado de escritura a otros usuarios.
newUser: Activado cuando un nuevo usuario se une.
newUserResponse: Envía la lista actualizada de usuarios a los clientes.
disconnect: Maneja la desconexión de usuarios y actualiza la lista de usuarios.