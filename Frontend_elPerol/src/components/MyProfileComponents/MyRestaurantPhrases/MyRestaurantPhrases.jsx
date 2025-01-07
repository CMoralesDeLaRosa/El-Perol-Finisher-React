import './MyRestaurantPhrases.css'
import { useState, useEffect } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import Button from '../../Button/Button'
import { useUser } from '../../../context/userProvider'
import { handleUpdatePhrases } from '../../../utils/handleUpdatePhrases'

const MyRestaurantPhrases = () => {
  const { userData, updateUserData, token } = useUser()
  const [phrases, setPhrases] = useState({
    phrase1: 'No has añadido ningún anuncio',
    phrase2: 'No has añadido ningún anuncio',
    phrase3: 'No has añadido ningún anuncio'
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (Array.isArray(userData?.phrases)) {
      setPhrases({
        phrase1: userData.phrases[0] || 'No has añadido ningún anuncio',
        phrase2: userData.phrases[1] || 'No has añadido ningún anuncio',
        phrase3: userData.phrases[2] || 'No has añadido ningún anuncio'
      })
    }
  }, [userData])

  const [isEditing, setIsEditing] = useState({
    phrase1: false,
    phrase2: false,
    phrase3: false
  })

  const handleInputChange = (e, field) => {
    const { value } = e.target
    setPhrases((prevPhrases) => ({
      ...prevPhrases,
      [field]: value
    }))
  }

  const handleSave = async (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false
    }))

    const index = field === 'phrase1' ? 0 : field === 'phrase2' ? 1 : 2
    const updatedPhrase = phrases[field]

    try {
      const updatedPhrases = [...userData.phrases]
      updatedPhrases[index] = updatedPhrase

      await handleUpdatePhrases(
        userData._id,
        token,
        updatedPhrase,
        index,
        setPhrases,
        setError
      )

      const updatedData = {
        ...userData,
        phrases: updatedPhrases
      }
      updateUserData(updatedData)
      localStorage.setItem('userData', JSON.stringify(updatedData))
    } catch (error) {
      setError('Error al guardar la frase')
    }
  }

  const handleDelete = async (field) => {
    const updatedPhrases = {
      ...phrases,
      [field]: 'No has añadido ningún anuncio'
    }

    setPhrases(updatedPhrases)

    const index = field === 'phrase1' ? 0 : field === 'phrase2' ? 1 : 2

    try {
      await handleUpdatePhrases(
        userData._id,
        token,
        updatedPhrases[field],
        index,
        setPhrases,
        setError
      )

      const updatedData = {
        ...userData,
        phrases: [
          updatedPhrases.phrase1,
          updatedPhrases.phrase2,
          updatedPhrases.phrase3
        ]
      }
      updateUserData(updatedData)
      localStorage.setItem('userData', JSON.stringify(updatedData))
    } catch (error) {
      setError('Error al eliminar la frase')
    }
  }

  const renderPhrase = (field) => (
    <article className='article-my-restaurant-phrase flex-container'>
      {error && <p className='error-message'>{error}</p>}
      {isEditing[field] ? (
        <div className='phrase-edit-container flex-container'>
          <input
            type='text'
            value={phrases[field]}
            onChange={(e) => handleInputChange(e, field)}
            className='input-edit-phrase flex-container'
            maxLength={100}
          />
          <Button
            buttonTitle='Guardar'
            className='button-light-xs'
            onClick={() => handleSave(field)}
          />
        </div>
      ) : (
        <>
          <p>{phrases[field]}</p>
          <div className='icon-container'>
            <FaPencilAlt
              className='edit-icon-pencil-phrase'
              onClick={() =>
                setIsEditing((prevEditing) => ({
                  ...prevEditing,
                  [field]: true
                }))
              }
            />
            <FaTrash
              className='delete-icon-trash-phrase'
              onClick={() => handleDelete(field)}
            />
          </div>
        </>
      )}
    </article>
  )

  return (
    <section id='section-my-restaurant-phrases' className='flex-container'>
      <h2>Mis anuncios</h2>
      {renderPhrase('phrase1')}
      {renderPhrase('phrase2')}
      {renderPhrase('phrase3')}
    </section>
  )
}

export default MyRestaurantPhrases
