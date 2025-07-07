'use client'

import { useEffect, useState } from 'react'
import { Persona } from './Interfaces/IPersona'
import MostrarPersonas from './MostrarPersonas'

const initialState: Persona = {
  nombre: '',
  apellido: '',
  edad: '',
  edad:'' ,
  categoria: 'Evento',
  descripcion: '',
  fecha: ''
}

export default function Home() {
  const [persona, setPersona] = useState<Persona>(initialState)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [errorNombre, setErrorNombre] = useState('')
  const [errorApellido, setErrorApellido] = useState('')
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setPersona({
      ...persona,
      [name]: name === 'edad' ? Number(value) : value
    })

    if (name === 'nombre') {
      setErrorNombre(value.length < 3 ? 'Debe tener al menos 3 caracteres' : '')
    }

    if (name === 'apellido') {
      setErrorApellido(value.length < 3 ? 'Debe tener al menos 3 caracteres' : '')
    }
  }

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault()

    if (persona.nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres.')
      return
    }

    if (persona.apellido.trim().length < 3) {
      setErrorApellido('El apellido debe tener al menos 3 caracteres.')
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
    setErrorNombre('')
    setErrorApellido('')
  }

  const traerPersona = (p: Persona) => {
    const index = personas.findIndex(
      item => item.nombre === p.nombre && item.apellido === p.apellido
    )
    if (index !== -1) {
      setPersona(p)
      setModoEditar(true)
      setIndiceEditar(index)
    }
  }

  const eliminarPersona = (index: number) => {
    if (!confirm('¿Seguro quieres eliminar?')) return
    const nuevasPersonas = personas.filter((_, i) => i !== index)
    setPersonas(nuevasPersonas)
  }

  return (
    <main>
      <h1>Registro de Personas</h1>
      <form onSubmit={handleRegistrar}>
        <label>Nombre</label><br />
        <input
          name="nombre"
          type="text"
          value={persona.nombre}
          onChange={handleChange}
          required
        /><br />
        <span>{errorNombre}</span><br />

        <label>Apellido</label><br />
        <input
          name="apellido"
          type="text"
          value={persona.apellido}
          onChange={handleChange}
          required
        /><br />
        <span>{errorApellido}</span><br />

        <label>Edad</label><br />
        <input
          name="edad"
          type="number"
          value={persona.edad}
          onChange={handleChange}
          required
        /><br />

        <label>Categoría</label><br />
        <select
          name="categoria"
          value={persona.categoria}
          onChange={handleChange}
          required
        >
          <option value="Evento">Evento</option>
          <option value="Voluntariado">Voluntariado</option>
          <option value="Proyecto">Proyecto</option>
        </select><br />

        <label>Descripción</label><br />
        <textarea
          name="descripcion"
          value={persona.descripcion}
          onChange={handleChange}
          required
        ></textarea><br />

        <label>Fecha</label><br />
        <input
          name="fecha"
          type="date"
          value={persona.fecha}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">{modoEditar ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <MostrarPersonas
        saludo="Listado de Registros"
        personas={personas}
        traerPersona={traerPersona}
        eliminarPersona={eliminarPersona}
      />
    </main>
  )
}
