import './Forms.css'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Button from '../Button/Button'
import { MdCameraAlt } from 'react-icons/md'

const FormCreateRecipe = ({
  id = '',
  title = '',
  subtitle = '',
  className = '',
  type = '',
  onSubmit,
  resetForm,
  error,
  setError
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState,
    reset,
    trigger,
    getValues,
    watch
  } = useForm({
    defaultValues: {
      img: '',
      name: '',
      region: '',
      difficulty: '',
      time: '',
      portions: '',
      elaboration: '',
      ingredients: []
    }
  })

  const selectedImage = watch('img')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  const [newIngredient, setNewIngredient] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorIngredientMessage, setErrorIngredientMessage] = useState('')
  const [errorIngredient, setErrorIngredient] = useState(false)

  useEffect(() => {
    if (Object.keys(formState.errors).length > 0) {
      error && setError('')
    }
  }, [formState.errors, error, setError])

  const firstFrontendErrorMessage =
    Object.values(formState.errors).find((error) => error.message)?.message ||
    ''
  const firstErrorMessage = firstFrontendErrorMessage || error || ''

  const handleValidationAndSubmit = async () => {
    setIsSubmitting(true)
    setLoading(true)

    const validateIngredients = () => {
      if (Object.keys(formState.errors).length > 0) {
        error && setError('')
        return
      } else if (fields.length === 0) {
        setErrorIngredientMessage('Hace falta al menos un ingrediente')
        setErrorIngredient(true)
        return false
      } else {
        setErrorIngredientMessage('')
        setErrorIngredient(false)
        return true
      }
    }

    const isFormValid = await trigger()

    const ingredientsValid = validateIngredients()

    if (!isFormValid || !ingredientsValid) {
      setIsSubmitting(false)
      setLoading(false)
      return
    }

    const formData = getValues()
    const transformedData = {
      ...formData,
      ingredients: fields.map((item) => item.ingredient)
    }

    try {
      await onSubmit(transformedData)
      reset()
    } catch (error) {
      console.error('Error al enviar la receta:', error)
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if (newIngredient.trim() && fields.length < 10) {
      append({ ingredient: newIngredient.trim() })
      setNewIngredient('')
      setErrorIngredientMessage('')
      setErrorIngredient(false)
    } else if (!newIngredient.trim()) {
      alert('El ingrediente no puede estar vacío')
    } else {
      alert('No puedes añadir más de 10 ingredientes')
    }
  }
  const handleRemoveIngredient = (indexToRemove) => {
    remove(indexToRemove)
    if (fields.length === 0) {
      setErrorIngredientMessage('Hace falta al menos un ingrediente')
      setErrorIngredient(true)
    }
  }

  return (
    <form
      id={id}
      className={`flex-container ${className}`}
      encType='multipart/form-data'
      onSubmit={handleSubmit(handleValidationAndSubmit)}
    >
      <div className='div-form-title-create-recipe flex-container'>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1732045865/elperol/web-images/jar1.png'
          className='img-jar-right'
        />
        <div className='flex-container'>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1732045865/elperol/web-images/jar2.png'
          className='img-jar-left'
        />
      </div>

      <div className='div-form-inputs-create-recipe flex-container'>
        <div className='flex-container'>
          <label
            htmlFor='imgRecipe'
            className={`label-register-img-recipe ${
              formState.errors.img
                ? 'label-register-img-error-recipe'
                : selectedImage?.length > 0
                ? ''
                : ''
            }`}
          >
            <MdCameraAlt className='icon-camera-user' />
            <span className='label-text-user'>
              {selectedImage?.length > 0
                ? '✔ Imagen seleccionada'
                : 'Imagen de perfil'}
            </span>
          </label>
          <input
            {...register('img', {
              required: 'Es necesario elegir una imagen de la receta'
            })}
            type='file'
            id='imgRecipe'
            accept='image/*'
            className={formState.errors.img ? 'input-error' : 'input'}
          />
          <input
            {...register('name', {
              required: 'Es necesario el nombre de la receta'
            })}
            type='text'
            id='nameRecipe'
            placeholder='Nombre'
            className={formState.errors.name ? 'input-error' : 'input'}
          />
          <input
            {...register('region', {
              required: 'Es necesario la región de la receta'
            })}
            type='text'
            placeholder='Región'
            className={formState.errors.region ? 'input-error' : 'input'}
          />
          <select
            {...register('difficulty', {
              required: 'Es necesario seleccionar la dificultad de la receta'
            })}
            className={
              formState.errors.difficulty
                ? 'difficulty-input-error'
                : 'difficulty-input'
            }
          >
            <option value=''>Seleccione la dificultad</option>
            <option value='Fácil'>Fácil</option>
            <option value='Media'>Media</option>
            <option value='Difícil'>Difícil</option>
          </select>
          <input
            {...register('time', {
              required: 'Es necesario el tiempo de elaboración',
              min: 1
            })}
            type='number'
            placeholder='Tiempo de elaboración'
            className={formState.errors.time ? 'input-error' : 'input'}
          />
          <input
            {...register('portions', {
              required: 'Es necesario el número de porciones',
              min: 1
            })}
            type='number'
            placeholder='Porciones'
            className={formState.errors.portions ? 'input-error' : 'input'}
          />
        </div>

        <div className='flex-container'>
          <div className='ingredients-input-container'>
            <input
              type='text'
              placeholder='Añadir ingrediente'
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className={
                errorIngredient
                  ? 'input-error-ingredients'
                  : 'input-ingredients'
              }
            />
            <Button
              buttonTitle='Añadir'
              onClick={handleAddIngredient}
              className='button-dark-mini'
              disabled={!newIngredient.trim() || fields.length >= 10}
            />
          </div>
          {fields.length > 0 && (
            <div
              className='ingredients-list flex-container'
              style={{ maxHeight: '78px', overflowY: 'auto' }}
            >
              <ul className='ingredients-list-ul'>
                {fields.map((item, index) => (
                  <li key={item.id} className='ingredient-item'>
                    {item.ingredient}
                    <Button
                      buttonTitle='x'
                      onClick={() => handleRemoveIngredient(index)}
                      className='button-remove'
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <textarea
            {...register('elaboration', {
              required: 'Es necesario explicar cómo se elabora la receta',
              maxLength: 1000
            })}
            placeholder='Elaboración'
            className={
              formState.errors.elaboration ? 'textarea-error' : 'textarea'
            }
            maxLength={1000}
          />
        </div>
      </div>

      {(formState.errors.img ||
        formState.errors.name ||
        formState.errors.region ||
        formState.errors.difficulty ||
        formState.errors.portions) &&
        errorIngredientMessage && (
          <p className='error-message-form'>{firstErrorMessage}</p>
        )}

      {!(
        formState.errors.img ||
        formState.errors.name ||
        formState.errors.region ||
        formState.errors.difficulty ||
        formState.errors.portions
      ) &&
        errorIngredientMessage && (
          <p className='error-message-form'>{errorIngredientMessage}</p>
        )}

      {formState.errors.elaboration && !errorIngredientMessage && (
        <p className='error-message-form'>{firstErrorMessage}</p>
      )}

      {error && <p className='error-message-backend'>{error}</p>}

      <div className='button-container'>
        <Button
          buttonTitle='Crear receta'
          type='submit'
          className='button-dark-s'
          disabled={isSubmitting}
          onClick={handleValidationAndSubmit}
        />
      </div>
    </form>
  )
}

export default FormCreateRecipe
