import './CreateRecipe.css'
import React, { useState } from 'react'
import { useUser } from '../../../context/userProvider'
import { handleCreateRecipe } from '../../../utils/handleCreateRecipe'
import FormCreateRecipe from '../../Forms/FormCreateRecipe'
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading'

const CreateRecipe = () => {
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetForm, setResetForm] = useState(false)
  const { userData, token, updateUserData } = useUser()

  const handleRecipeCreate = async (data) => {
    setLoading(true)
    setResetForm(false)
    try {
      await handleCreateRecipe(
        data,
        setError,
        setSuccessMessage,
        token,
        userData,
        updateUserData
      )
      setResetForm(true)
    } finally {
      setLoading(false)
    }
  }

  if (successMessage) {
    setError('')
  }

  setTimeout(() => {
    setSuccessMessage('')
  }, 10000)

  return (
    <section
      id='section-create-recipe'
      className='flex-container'
      style={{ position: 'relative' }}
    >
      {loading && <SpinnerLoading />}
      <FormCreateRecipe
        id='create-recipe'
        title='Publica una nueva receta'
        subtitle='Da a conocer una nueva receta de la gastronomía española'
        className='form-create-recipe'
        type='create-recipe'
        onSubmit={handleRecipeCreate}
        resetForm={resetForm}
        error={error}
        setError={setError}
      />

      {successMessage && (
        <div className='div-success-message flex-container'>
          <p className='success-message'>{successMessage}</p>
        </div>
      )}
    </section>
  )
}

export default CreateRecipe
