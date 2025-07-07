'use client'

import { useEffect, useState } from 'react'

type Persona = {
  nombre: string
  apellido: string
  edad: number
  categoria: string
  descripcion: string
  fecha: string
}

const initialState: Persona = {
  nombre: '',
  apellido: '',
  edad: 0,
  categoria: 'Evento',
  descripcion: '',
  fecha: ''
}

export default function Home() {
  const [persona, setPersona] = useState<Persona>(initialState)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [errorNombre, setErrorNombre] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('personas')
    if (data) {
      setPersonas(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas))
  }, [personas])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setPersona({ ...persona, [name]: name === 'edad' ? Number(value) : value })

    if (name === 'nombre' && value.length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres')
    } else if (name === 'nombre') {
      setErrorNombre('')
    }
  }

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (persona.nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres')
      return
    }

    setPersonas([...personas, persona])
    setPersona(initialState)
  }

  return (
    <main>
      <h1>FORMULARIO DE REGISTRO DE PERSONAS</h1>
      <form onSubmit={handleRegistrar}>
        <label>Nombre</label><br />
        <input
          type="text"
          name="nombre"
          placeholder="ingrese su nombre"
          value={persona.nombre}
          onChange={handleChange}
        /><br />
        <span>{errorNombre}</span><br />

        <label>Apellido</label><br />
        <input
          type="text"
          name="apellido"
          placeholder="ingrese su apellido"
          value={persona.apellido}
          onChange={handleChange}
        /><br />

        <label>Edad</label><br />
        <input
          type="number"
          name="edad"
          value={persona.edad}
          onChange={handleChange}
        /><br />

        <label>Categoría</label><br />
        <select
          name="categoria"
          value={persona.categoria}
          onChange={handleChange}
        >
          <option value="Evento">Evento</option>
          <option value="Voluntariado">Voluntariado</option>
          <option value="Proyecto">Proyecto</option>
        </select><br />

        <label>Descripción</label><br />
        <textarea
          name="descripcion"
          placeholder="ingrese una breve descripcion"
          value={persona.descripcion}
          onChange={handleChange}
        ></textarea><br />

        <label>Fecha</label><br />
        <input
          type="date"
          name="fecha"
          value={persona.fecha}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Registrar</button>
      </form>

      <h2>PERSONAS REGISTRADAS</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, i) => (
            <tr key={i}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.edad}</td>
              <td>{p.categoria}</td>
              <td>{p.descripcion}</td>
              <td>{p.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
