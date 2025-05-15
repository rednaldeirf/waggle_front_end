// src/components/NewPetForm.jsx
import React, { useState } from 'react'
import { createPet } from '../services/pets'
import { Description } from '@mui/icons-material'

export default function NewPetForm({ onPetAdded }) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [description, setDescription] = useState('')
  const [age, setAge] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const newPet = await  createPet({
          name,
           species,
          description,
          age,
        //   photo: photoUrl, // adjust if your field is called something else
        });
      


      // Clear form
      setName('')
      setSpecies('')
      setDescription('')
      setAge(0)
    //   setPhotoUrl('')

      // Let parent know if they passed a callback
      onPetAdded?.(newPet)
    } catch (err) {
      console.error(err)
      setError('Oops! Couldn’t add your pet. Try again?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Species</label>
        <input
          type="text"
          value={species}
          onChange={e => setSpecies(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Pet'}
      </button>
    </form>
  )
}
