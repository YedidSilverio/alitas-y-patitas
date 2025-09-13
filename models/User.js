import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  telefono: {
    type: String,
    trim: true,
    maxlength: [15, 'El teléfono no puede tener más de 15 caracteres']
  },
  direccion: {
    calle: String,
    ciudad: String,
    estado: String,
    codigoPostal: String
  },
  mascotas: [{
    nombre: String,
    tipo: String,
    raza: String,
    edad: Number
  }],
  role: {
    type: String,
    enum: ['user', 'admin', 'veterinario'],
    default: 'user'
  },
  estaActivo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  ultimoAcceso: {
    type: Date,
    default: Date.now
  }
});

// Método para actualizar último acceso
UserSchema.methods.actualizarUltimoAcceso = function() {
  this.ultimoAcceso = new Date();
  return this.save();
};

// Método para obtener datos públicos (sin password)
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
