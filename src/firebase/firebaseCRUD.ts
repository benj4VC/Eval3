import { db } from './firebaseConfig'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

import { Persona } from '../Interfaces/IPersona'

// Crear
export const agregarPersona = async (persona: Persona) => {
  try {
    await addDoc(collection(db, 'personas'), persona)
    console.log('Persona agregada correctamente en Firebase')
  } catch (error) {
    console.error('Error al agregar persona:', error)
  }
}

// Leer
export const obtenerPersonas = async (): Promise<Persona[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'personas'))
    const personas: Persona[] = querySnapshot.docs.map(doc => ({
      ...(doc.data() as Persona),
      id: doc.id
    }))
    return personas
  } catch (error) {
    console.error('Error al obtener personas:', error)
    return []
  }
}

// Actualizar
export const actualizarPersona = async (id: string, personaActualizada: Persona) => {
  try {
    const personaRef = doc(db, 'personas', id)
    await updateDoc(personaRef, personaActualizada)
    console.log('Persona actualizada correctamente')
  } catch (error) {
    console.error('Error al actualizar persona:', error)
  }
}

// Eliminar
export const eliminarPersona = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'personas', id))
    console.log('Persona eliminada correctamente')
  } catch (error) {
    console.error('Error al eliminar persona:', error)
  }
}
