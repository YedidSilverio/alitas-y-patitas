"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Verificar si es el admin principal
    if (email === "alitasypatitas@gmail.com" && password === "1234") {
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        role: "admin" 
      }));
      router.push("/admin/citas");
      return;
    }

    // Verificar usuarios registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuariosRegistrados.find(user => 
      user.email === email && user.password === password
    );

    if (usuario) {
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        role: "user" 
      }));
      router.push("/");
      alert("¡Bienvenido de vuelta!");
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center items-center mb-8">
          <span className="text-2xl mr-2">🐦</span>
          <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
          <span className="text-2xl ml-2">🐾</span>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Ingresar
          </button>
        </form>

        <div className="text-center mt-4">
          <Link 
            href="/registro" 
            className="text-green-600 hover:text-green-800 text-sm font-semibold"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
