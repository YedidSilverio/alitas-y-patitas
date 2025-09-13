"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Leer citas de localStorage
    const citasGuardadas = JSON.parse(localStorage.getItem('citas') || '[]');
    setCitas(citasGuardadas);
  }, []);

  const eliminarCita = (id) => {
    if (confirm("¿Estás seguro de eliminar esta cita?")) {
      const citasActualizadas = citas.filter(cita => cita.id !== id);
      setCitas(citasActualizadas);
      localStorage.setItem('citas', JSON.stringify(citasActualizadas));
      alert("Cita eliminada correctamente");
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🐦</span>
            <h1 className="text-3xl font-bold text-gray-900">Administración de Citas</h1>
            <span className="text-2xl ml-2">🐾</span>
          </div>
          <Link 
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ← Cerrar Sesión
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Citas</h3>
            <p className="text-3xl font-bold text-blue-600">{citas.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Citas Hoy</h3>
            <p className="text-3xl font-bold text-green-600">
              {citas.filter(cita => formatearFecha(cita.fecha) === formatearFecha(new Date())).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
            <p className="text-lg font-bold text-orange-600">
              {citas.filter(cita => new Date(cita.fecha) > new Date()).length}
            </p>
          </div>
        </div>

        {/* Tabla de Citas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Todas las Citas Programadas</h2>
          
          {citas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay citas registradas</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-gray-900">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="px-4 py-3 text-left">Mascota</th>
                    <th className="px-4 py-3 text-left">Propietario</th>
                    <th className="px-4 py-3 text-left">Contacto</th>
                    <th className="px-4 py-3 text-left">Fecha y Hora</th>
                    <th className="px-4 py-3 text-left">Servicio</th>
                    <th className="px-4 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <strong>{cita.nombreMascota}</strong>
                          <div className="text-sm text-gray-600">
                            {cita.especie} • {cita.tamaño} • {cita.edad} años
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{cita.nombrePropietario}</td>
                      <td className="px-4 py-3">
                        <div>{cita.telefono}</div>
                        <div className="text-sm text-blue-600">{cita.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{formatearFecha(cita.fecha)}</div>
                        <div className="text-sm text-gray-600">{cita.hora}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {cita.servicio}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => eliminarCita(cita.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Usuario administrador:</strong> alitasypatitas@gmail.com
          </p>
          <p className="text-sm text-yellow-800 mt-1">
            <strong>Total de citas almacenadas:</strong> {citas.length}
          </p>
        </div>
      </div>
    </div>
  );
}
