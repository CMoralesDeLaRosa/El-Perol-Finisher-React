import './ConfirmationPrompt.css'
import Button from '../Button/Button'

export const ConfirmationPromptUser = ({ onConfirm, onCancel }) => {
  return (
    <article className='article-confirmation-prompt-user flex-container'>
      <p>¿Estás seguro que quieres eliminar tu cuenta?</p>
      <p>Esta acción no se podrá deshacer.</p>
      <div className='flex-container'>
        <Button
          buttonTitle='Aceptar'
          className='button-dark-xs'
          onClick={onConfirm}
        />
        <Button
          buttonTitle='Cancelar'
          className='button-dark-xs'
          onClick={onCancel}
        />
      </div>
    </article>
  )
}
export const ConfirmationPromptRecipe = ({ onConfirm, onCancel }) => {
  return (
    <article className='article-confirmation-prompt-recipe flex-container '>
      <p>¿Estás seguro que quieres eliminar esta receta?</p>
      <p>Esta acción no se podrá deshacer.</p>
      <div className='flex-container'>
        <Button
          buttonTitle='Aceptar'
          className='button-dark-xs'
          onClick={onConfirm}
        />
        <Button
          buttonTitle='Cancelar'
          className='button-dark-xs'
          onClick={onCancel}
        />
      </div>
    </article>
  )
}
export const ConfirmationPromptRestaurant = ({ onConfirm, onCancel }) => {
  return (
    <article className='article-confirmation-prompt-restaurant flex-container'>
      <p>¿Estás seguro que quieres eliminar este restaurante?</p>
      <p>Esta acción no se podrá deshacer.</p>
      <div className='flex-container'>
        <Button
          buttonTitle='Aceptar'
          className='button-dark-xs'
          onClick={onConfirm}
        />
        <Button
          buttonTitle='Cancelar'
          className='button-dark-xs'
          onClick={onCancel}
        />
      </div>
    </article>
  )
}
