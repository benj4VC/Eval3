'use client'
import React from 'react'
import { Persona } from './Interfaces/IPersona'

interface Props {
  saludo: string
  personas: Persona[]
  traerPersona: (p: Persona) => void
  eliminarPersona: (id: string) => void
}

const MostrarPersonas = ({ saludo, personas, traerPersona, eliminarPersona }: Props) => {
  return (
    <>
      <h1>{saludo}</h1>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, index) => (
            <tr key={p.id ?? index}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.edad}</td>
              <td>{p.categoria}</td>
              <td>{p.descripcion}</td>
              <td>{p.fecha}</td>
              <td>
                <button onClick={() => traerPersona(p)}>Editar</button>{' '}
                <button onClick={() => eliminarPersona(p.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MostrarPersonas
