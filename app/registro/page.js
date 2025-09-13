"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Registro() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    codigoVerificacion: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Verificar código de la veterinaria (13579)
    if (formData.codigoVerificacion !== "13579") {
      setError("Código de verificación incorrecto");
      return;
    }

    // Guardar usuario en localStorage
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el email ya existe
    if (usuariosExistentes.find(user => user.email === formData.email)) {
      setError("Este email ya está registrado");
      return;
    }

    // Agregar nuevo usuario
    const nuevoUsuario = {
      email: formData.email,
      password: formData.password,
      fechaRegistro: new Date().toISOString()
    };

    const todosLosUsuarios = [...usuariosExistentes, nuevoUsuario];
    localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));

    alert("¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Título */}
        <div className="flex justify-center items-center mb-8">
          <span className="text-2xl mr-2">🐦</span>
          <h1 className="text-3xl font-bold text-gray-900">Registrar Usuario</h1>
          <span className="text-2xl ml-2">🐾</span>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {/* Campo Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {/* Campo Código de Verificación */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Código de Verificación *
            </label>
            <input
              type="password"
              name="codigoVerificacion"
              value={formData.codigoVerificacion}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Código proporcionado por la veterinaria"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Debes obtener este código en la veterinaria
            </p>
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            🐾 Registrar Usuario
          </button>
        </form>

        {/* Enlaces */}
        <div className="mt-6 space-y-3">
          <div className="text-center">
            <button 
              onClick={() => router.push("/login")}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              ← Volver a Iniciar Sesión
            </button>
          </div>
          <div className="text-center">
            <button 
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
