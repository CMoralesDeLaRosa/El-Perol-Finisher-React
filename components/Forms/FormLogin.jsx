import './Forms.css'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'

const FormLogin = ({
  id = '',
  title = '',
  subtitle = '',
  className = '',
  type = '',
  onSubmit,
  error
}) => {
  const defaultValuesByType = {
    login: {
      email: '',
      password: ''
    }
  }

  const { handleSubmit, register, formState } = useForm({
    defaultValues: defaultValuesByType[type]
  })

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
        {type === 'login' && (
          <>
            <input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Es necesario un email'
                }
              })}
              type='email'
              placeholder='Email'
              className={formState.errors.email ? 'input-error' : 'input'}
            />
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Es necesaria una contraseña'
                }
              })}
              type='password'
              placeholder='Contraseña'
              className={formState.errors.password ? 'input-error' : 'input'}
            />
          </>
        )}
      </div>

      {firstErrorMessage ? (
        <p className='error-message-form'>{firstErrorMessage}</p>
      ) : error ? (
        <p className='error-message-form'>{error}</p>
      ) : null}

      <Button
        buttonTitle={type === 'login' ? 'Iniciar Sesión' : 'Regístrate'}
        className='button-dark-s'
        type='submit'
      />
    </form>
  )
}

export default FormLogin
