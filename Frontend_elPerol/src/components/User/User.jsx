import './User.css'

const User = ({ imgSrc = '', userName = '', userEmail = '' }) => {
  return (
    <article className='article-user-admin'>
      <div className='div-user-admin-img'>
        <img src={imgSrc} alt={userName} />
      </div>
      <div className='div-user-admin-data'>
        <h3>{userName}</h3>
        <h3>{userEmail}</h3>
      </div>
    </article>
  )
}

export default User
