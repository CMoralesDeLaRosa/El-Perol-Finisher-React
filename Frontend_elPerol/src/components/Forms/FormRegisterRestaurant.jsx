import './Forms.css'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import { MdCameraAlt } from 'react-icons/md'
import { useEffect } from 'react'

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
  const defaultValues = {
    img: '',
    name: '',
    email: '',
    password: '',
    address: '',
    schedule: ''
  }

  const { handleSubmit, register, formState, reset, watch } = useForm({
    defaultValues
  })

  const selectedImage = watch('img')

  useEffect(() => {
    if (resetForm) {
      reset(defaultValues)
      const timer = setTimeout(() => {
        setResetForm(false)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [resetForm, reset, defaultValues, setResetForm])

  const firstErrorMessage = Object.values(formState.errors)[0]?.message || ''

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
          htmlFor='imgRest'
          className={`label-register-img-restaurant ${
            formState.errors.img
              ? 'label-register-img-error-restaurant'
              : selectedImage?.length > 0
              ? ''
              : ''
          }`}
        >
          <MdCameraAlt className='icon-camera-restaurant' />
          <span className='label-text-restaurant'>
            {selectedImage?.length > 0
              ? '✔ Imagen seleccionada'
              : 'Imagen de perfil'}
          </span>
        </label>
        <input
          {...register('img', {
            required: {
              value: selectedImage?.length === 0,
              message: 'Es necesario elegir una imagen de perfil'
            }
          })}
          type='file'
          id='imgRest'
          accept='image/*'
          className={formState.errors.img ? 'input-error' : 'input'}
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
