import './SpinnerLoading.css'
import { ImSpinner3 } from 'react-icons/im'

const SpinnerLoading = ({ className = 'spinner-container' }) => {
  return (
    <div className={className}>
      <ImSpinner3 className='spinner-icon' />
    </div>
  )
}

export default SpinnerLoading
