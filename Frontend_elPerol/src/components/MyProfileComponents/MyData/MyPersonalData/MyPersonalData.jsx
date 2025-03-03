import './MyPersonalData.css'
import { useRef, useState } from 'react'
import Button from '../../../Button/Button'
import { FaPencilAlt } from 'react-icons/fa'
import SpinnerLoading from '../../../SpinnerLoading/SpinnerLoading'
import { useUser } from '../../../../context/userProvider'
import { editData } from '../../../../utils/editData'
import { MdCameraAlt } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

const MyPersonalData = () => {
  const { userData, updateUserData, token } = useUser()
  const [imageSelected, setImageSelected] = useState(false)
  const [isEditing, setIsEditing] = useState({
    img: false,
    name: false,
    email: false,
    password: false,
    address: false,
    schedule: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const fieldRefs = {
    img: useRef(),
    name: useRef(),
    email: useRef(),
    password: useRef(),
    address: useRef(),
    schedule: useRef()
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSave = async (field) => {
    setLoading(true)
    try {
      const type = userData.rol === 'restaurant' ? 'restaurant' : 'user'

      let result

      if (field === 'img') {
        const file = fieldRefs.img.current.files[0]
        const formData = new FormData()
        formData.append('img', file)

        result = await editData(userData._id, field, formData, token, type)

        if (result.success) {
          const updatedField = result.response.img
          const updatedData = { ...userData, img: updatedField }
          updateUserData(updatedData)
          localStorage.setItem('userData', JSON.stringify(updatedData))

          setIsEditing((prevEditing) => ({ ...prevEditing, [field]: false }))
          setImageSelected(false) // Resetear la selección de imagen después de guardar
          setError('')
          setPasswordError('')
        } else {
          setError('Ocurrió un error, intente nuevamente')
        }
      } else {
        const value = fieldRefs[field].current.value

        if (field === 'password' && !validatePassword(value)) {
          setPasswordError(
            'La contraseña debe tener al menos 8 caracteres, incluir al menos una mayúscula y un número.'
          )
          return
        }

        result = await editData(userData._id, field, value, token, type)

        if (result.success) {
          const updatedData = { ...userData, [field]: value }
          updateUserData(updatedData)
          localStorage.setItem('userData', JSON.stringify(updatedData))

          setIsEditing((prevEditing) => ({ ...prevEditing, [field]: false }))
          setError('')
          setPasswordError('')
        } else {
          setError('Ocurrió un error, intente nuevamente')
        }
      }
    } catch (error) {
      setError('Ocurrió un error, intente nuevamente')
    } finally {
      setLoading(false)
    }
  }

  const renderField = (field, label) => {
    if (field === 'img') {
      return (
        <div className='div-render-field-my-data-img'>
          {isEditing.img && (
            <label
              htmlFor='input-file'
              className={`custom-file-label-profile flex-container ${
                imageSelected ? 'image-selected' : ''
              }`}
            >
              {imageSelected ? (
                '✔'
              ) : (
                <MdCameraAlt className='icon-camera-user' />
              )}
            </label>
          )}

          <div className='div-field-with-icon-img'>
            {isEditing.img ? (
              <div className='field-input-with-button flex-container'>
                <input
                  type='file'
                  ref={fieldRefs.img}
                  accept='image/*'
                  id='input-file'
                  className='input-file-field'
                  style={{ display: 'none' }}
                  onChange={() => setImageSelected(true)}
                />
                <Button
                  buttonTitle='Guardar'
                  className='button-dark-mini'
                  onClick={() => handleSave('img')}
                />
              </div>
            ) : (
              <>
                <div className='img-container'>
                  <img
                    src={userData.img || 'default-image-url.png'}
                    alt='Imagen de usuario'
                    className='user-image'
                  />
                </div>
                <FaPencilAlt
                  className='edit-icon-pencil'
                  onClick={() =>
                    setIsEditing((prevEditing) => ({
                      ...prevEditing,
                      [field]: true
                    }))
                  }
                />
              </>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className='div-render-field-my-data'>
        <label>{label}</label>
        <div className='div-field-with-icon'>
          {isEditing[field] ? (
            <div className='field-input-with-button flex-container'>
              <input
                type={field === 'password' ? 'password' : 'text'}
                ref={fieldRefs[field]}
                defaultValue={userData[field]}
                className='input-edit-field'
              />
              <Button
                buttonTitle='Guardar'
                className='button-dark-mini'
                onClick={() => handleSave(field)}
              />
            </div>
          ) : (
            <span className='span-display-field'>
              {field === 'password' ? '********' : userData[field]}
            </span>
          )}
          <FaPencilAlt
            className='edit-icon-pencil'
            onClick={() =>
              setIsEditing((prevEditing) => ({ ...prevEditing, [field]: true }))
            }
          />
        </div>
      </div>
    )
  }

  return (
    <article className='article-my-personal-data'>
      {error && <p className='error-message'>{error}</p>}
      {passwordError && <p className='error-message'>{passwordError}</p>}
      {loading && <SpinnerLoading />}
      <h2>Mis datos</h2>
      <div className='div-fields-my-data flex-container'>
        {(userData.rol === 'user' || userData.rol === 'admin') && (
          <>
            {renderField('img', 'Imagen')}
            {renderField('name', 'Nombre')}
            {renderField('email', 'Correo')}
            {renderField('password', 'Contraseña')}
          </>
        )}
        {userData.rol === 'restaurant' && (
          <>
            {renderField('img', 'Imagen')}
            {renderField('name', 'Nombre')}
            {renderField('email', 'Correo')}
            {renderField('password', 'Contraseña')}
            {renderField('address', 'Dirección')}
            {renderField('schedule', 'Horario')}
          </>
        )}
      </div>
    </article>
  )
}

export default MyPersonalData
