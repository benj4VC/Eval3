'use client'

import { useEffect, useState } from 'react'
import { Persona } from './Interfaces/IPersona'
import MostrarPersonas from './MostrarPersonas'

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
  const [modoEditar, setModoEditar] = useState(false)
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('personas')
    if (data) {
      setPersonas(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas))
  }, [personas])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersona({
      ...persona,
      [name]: name === 'edad' ? Number(value) : value
    })

    if (name === 'nombre') {
      setErrorNombre(value.length < 3 ? 'Debe tener al menos 3 caracteres' : '')
    }
  }

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (persona.nombre.trim().length < 3) {
      setErrorNombre('Debe tener al menos 3 caracteres')
      return
    }

    if (modoEditar && indiceEditar !== null) {
      const nuevasPersonas = [...personas]
      nuevasPersonas[indiceEditar] = persona
      setPersonas(nuevasPersonas)
      setModoEditar(false)
      setIndiceEditar(null)
    } else {
      setPersonas([...personas, persona])
    }

    setPersona(initialState)
  }

  const traerPersona = (p: Persona) => {
    const index = personas.findIndex(
      item =>
        item.nombre === p.nombre &&
        item.apellido === p.apellido
    )
    if (index !== -1) {
      setPersona(p)
      setModoEditar(true)
      setIndiceEditar(index)
    }
  }

  return (
    <main>
      <h1>Formulario de registro</h1>
      <form onSubmit={handleRegistrar}>
        <label>Nombre</label><br />
        <input
          name="nombre"
          type="text"
          value={persona.nombre}
          onChange={handleChange}
        /><br />
        <span>{errorNombre}</span><br />

        <label>Apellido</label><br />
        <input
          name="apellido"
          type="text"
          value={persona.apellido}
          onChange={handleChange}
        /><br />

        <label>Edad</label><br />
        <input
          name="edad"
          type="number"
          value={persona.edad}
          onChange={handleChange}
        /><br />

        <label>Categoría</label><br />
        <select name="categoria" value={persona.categoria} onChange={handleChange}>
          <option value="Evento">Evento</option>
          <option value="Voluntariado">Voluntariado</option>
          <option value="Proyecto">Proyecto</option>
        </select><br />

        <label>Descripción</label><br />
        <textarea
          name="descripcion"
          value={persona.descripcion}
          onChange={handleChange}
        ></textarea><br />

        <label>Fecha</label><br />
        <input
          name="fecha"
          type="date"
          value={persona.fecha}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">
          {modoEditar ? 'Actualizar' : 'Registrar'}
        </button>
      </form>

      <MostrarPersonas saludo="Listado de Personas" traerPersona={traerPersona} />
    </main>
  )
}
