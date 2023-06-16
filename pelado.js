const admin = require('firebase-admin');

// Inicializar Firebase Admin SDK con las credenciales de servicio
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Crear una referencia a la colección "usuarios"
const db = admin.firestore();
const usuariosRef = db.collection('usuarios');

// Crear un objeto con la información del usuario
const nuevoUsuario = {
  nombre: 'Juan',
  apellido: 'Pérez'
};

// Agregar el nuevo usuario a la base de datos
usuariosRef.add(nuevoUsuario)
  .then(docRef => {
    console.log('Usuario agregado con ID:', docRef.id);
  })
  .catch(error => {
    console.error('Error al agregar el usuario:', error);
  });