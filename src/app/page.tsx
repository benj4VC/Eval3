'use client'

import { useEffect, useState } from 'react'
import { Persona } from './Interfaces/IPersona'
import MostrarPersonas from './MostrarPersonas'

import {
  agregarPersona,
  obtenerPersonas,
  actualizarPersona,
  eliminarPersona as eliminarPersonaFirebase
} from '../firebase/firebaseCRUD'

const initialState: Persona = {
  nombre: '',
  apellido: '',
  edad: '',
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
  const [personaIdEditar, setPersonaIdEditar] = useState<string | null>(null)

 
  useEffect(() => {
    cargarPersonas()
  }, [])

  const cargarPersonas = async () => {
    const data = await obtenerPersonas()
    setPersonas(data)
  }

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

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault()

    if (persona.nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres.')
      return
    }

    if (persona.apellido.trim().length < 3) {
      setErrorApellido('El apellido debe tener al menos 3 caracteres.')
      return
    }

    if (persona.edad < 8 || persona.edad > 120) {
      alert('La edad debe ser mayor o igual a 8 y menor o igual a 120.')
      return
    }

    if (modoEditar && personaIdEditar) {
      await actualizarPersona(personaIdEditar, persona)
      console.log('Persona actualizada en Firebase')
    } else {
      await agregarPersona(persona)
      console.log('Persona registrada en Firebase')
    }

    await cargarPersonas()
    setPersona(initialState)
    setErrorNombre('')
    setErrorApellido('')
    setModoEditar(false)
    setPersonaIdEditar(null)
  }

  const traerPersona = (p: Persona, index: number) => {
    setPersona(p)
    setModoEditar(true)
    setIndiceEditar(index)
    setPersonaIdEditar(p.id ?? null)
  }

  const handleEliminarPersona = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar esta persona?')) return
    await eliminarPersonaFirebase(id)
    console.log('Persona eliminada en Firebase')
    await cargarPersonas()
  }

  return (
    <main>
      <h1>Registro de Personas (Firebase)</h1>
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
          min={8}
          max={120}
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
        eliminarPersona={handleEliminarPersona}
      />
    </main>
  )
}
