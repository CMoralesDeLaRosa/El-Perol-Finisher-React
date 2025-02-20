import './Forms.css'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'

const FormRegisterUser = ({
  id = '',
  title = '',
  subtitle = '',
  className = '',
  onSubmit,
  error
}) => {
  const defaultValues = {
    img: '',
    name: '',
    email: '',
    password: ''
  }

  const { handleSubmit, register, formState } = useForm({ defaultValues })

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
        <label htmlFor='imgUser' className='label-img'>
          {formState.errors.img ? (
            <span className='error-message'>
              Es necesario elegir una imagen de perfil
            </span>
          ) : (
            <span>Imagen de perfil</span>
          )}
        </label>
        <input
          {...register('img', {
            required: {
              value: true,
              message: 'Es necesario elegir una imagen de perfil'
            }
          })}
          type='file'
          id='imgUser'
          accept='image/*'
          className={formState.errors.img ? 'input-error' : 'input'}
        />
        <input
          {...register('name', {
            required: {
              value: true,
              message: 'Es necesario un nombre de usuario'
            }
          })}
          type='text'
          id='nameUser'
          placeholder='Nombre de usuario'
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
          id='userRegisterEmail'
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
          id='userRegisterPassword'
          placeholder='Contraseña'
          className={formState.errors.password ? 'input-error' : 'input'}
        />
      </div>
      {firstErrorMessage ? (
        <p className='error-message-form'>{firstErrorMessage}</p>
      ) : error ? (
        <p className='error-message-form'>{error}</p>
      ) : null}
      <div className='div-img-form-user'>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244367/elperol/web-images/Paella-image.png'
          alt='paella'
        />
      </div>
      <Button
        buttonTitle='Regístrate'
        className='button-dark-s'
        type='submit'
      />
    </form>
  )
}

export default FormRegisterUser
