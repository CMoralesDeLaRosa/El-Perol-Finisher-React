import './Forms.css'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import { MdCameraAlt } from 'react-icons/md'

const FormRegisterRestaurant = ({
  id = '',
  title = '',
  subtitle = '',
  className = '',
  onSubmit,
  restaurantError,
  restaurantSuccess,
  setRestaurantSuccess,
  resetForm,
  setResetForm
}) => {
  const [imageRest, setImageRest] = useState(null)
  const defaultValues = {
    img: '',
    name: '',
    email: '',
    password: '',
    address: '',
    schedule: ''
  }

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues
  })

  useEffect(() => {
    if (resetForm) {
      reset(defaultValues)
      const timer = setTimeout(() => {
        setResetForm(false)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [resetForm, reset, defaultValues, setResetForm])

  const handleInputChange = () => {
    if (restaurantSuccess) {
      setRestaurantSuccess('')
    }
  }

  const firstErrorMessage = Object.values(formState.errors)[0]?.message || ''

  const handleImageChangeRest = (e) => {
    const file = e.target.files[0]
    setImageRest(file)
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className={`flex-container ${className}`}
      encType='multipart/form-data'
    >
      <div className='div-form-title flex-container'>
        <h3 className='form-title'>
          {Array.isArray(title)
            ? title.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            : title}
        </h3>
        <p>{subtitle}</p>
      </div>
      <div className='div-form-inputs'>
        <label
          htmlFor='imgRestaurant'
          className={`label-register-img-restaurant ${
            formState.errors.img ? 'label-register-img-error-restaurant' : ''
          } ${imageRest ? 'img-selected-restaurant' : ''}`}
        >
          <MdCameraAlt className='icon-camera-restaurant' />
          <span className='label-text-restaurant'>
            {imageRest ? imageRest.name : 'Imagen de perfil'}
          </span>
        </label>
        <input
          {...register('img', {
            required: {
              value: true,
              message: 'Es necesario elegir una imagen de perfil'
            }
          })}
          type='file'
          id='imgRestaurant'
          accept='image/*'
          className={formState.errors.img ? 'input-error' : 'input'}
          onChange={handleImageChangeRest}
        />
        <input
          {...register('name', {
            required: {
              value: true,
              message: 'Es necesario un nombre de restaurante'
            }
          })}
          type='text'
          id='nameRestaurant'
          placeholder='Nombre del restaurante'
          className={formState.errors.name ? 'input-error' : 'input'}
          onChange={handleInputChange}
        />
        <input
          {...register('email', {
            required: {
              value: true,
              message: 'Es necesario un email'
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El email no es válido'
            }
          })}
          type='email'
          id='restaurantRegisterEmail'
          placeholder='Email'
          className={formState.errors.email ? 'input-error' : 'input'}
          onChange={handleInputChange}
        />
        <input
          {...register('password', {
            required: {
              value: true,
              message: 'Es necesaria una contraseña'
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                'La contraseña debe tener al menos 8 caracteres, incluir al menos una mayúscula y un número.'
            }
          })}
          type='password'
          id='restaurantRegisterPassword'
          placeholder='Contraseña'
          className={formState.errors.password ? 'input-error' : 'input'}
          onChange={handleInputChange}
        />
        <input
          {...register('address', {
            required: {
              value: true,
              message: 'Es necesaria una dirección'
            }
          })}
          type='text'
          id='addressRestaurant'
          placeholder='Dirección'
          className={formState.errors.address ? 'input-error' : 'input'}
          onChange={handleInputChange}
        />
        <input
          {...register('schedule', {
            required: {
              value: true,
              message: 'Es necesario un horario de apertura'
            },
            pattern: {
              value:
                /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s*-\s*([01]?[0-9]|2[0-3]):[0-5][0-9](\sy\s([01]?[0-9]|2[0-3]):[0-5][0-9]\s*-\s*([01]?[0-9]|2[0-3]):[0-5][0-9])?$/,
              message:
                'Formato de horario no válido. Ejemplo: 9:00-12:00 o 9:00-12:00 y 14:00-18:00'
            }
          })}
          type='text'
          id='scheduleRestaurant'
          placeholder='Horario de apertura'
          className={formState.errors.schedule ? 'input-error' : 'input'}
          onChange={handleInputChange}
        />
      </div>

      {restaurantSuccess && !formState.isSubmitting && (
        <p className='success-message-register'>{restaurantSuccess}</p>
      )}

      {firstErrorMessage ? (
        <p className='error-message-form'>{firstErrorMessage}</p>
      ) : restaurantError ? (
        <p className='error-message-form'>{restaurantError}</p>
      ) : null}

      <Button
        buttonTitle='Regístrate'
        className='button-dark-s'
        type='submit'
      />
    </form>
  )
}

export default FormRegisterRestaurant
