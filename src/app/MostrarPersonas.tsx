'use client'
import React, { useEffect, useState } from 'react'
import { Persona } from './Interfaces/IPersona'

interface Props {
  saludo: string
  traerPersona: (p: Persona) => void
}

const MostrarPersonas = ({ saludo, traerPersona }: Props) => {
  const [personas, setPersonas] = useState<Persona[]>([])

  // Cargar al iniciar
  useEffect(() => {
    const listadoStr = localStorage.getItem('personas')
    if (listadoStr) {
      setPersonas(JSON.parse(listadoStr))
    }
  }, [])

  // Eliminar directo
  const handleEliminar = (index: number) => {
    if (!confirm('¿Estás seguro de eliminar esta persona?')) return

    const nuevasPersonas = personas.filter((_, i) => i !== index)
    setPersonas(nuevasPersonas)
    localStorage.setItem('personas', JSON.stringify(nuevasPersonas))
  }

  // Editar directo
  const handleEditar = (index: number) => {
    traerPersona(personas[index])
  }

  return (
    <>
      <h1>{saludo}</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>
                <button onClick={() => handleEditar(index)}>Editar</button>{' '}
                <button onClick={() => handleEliminar(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MostrarPersonas
