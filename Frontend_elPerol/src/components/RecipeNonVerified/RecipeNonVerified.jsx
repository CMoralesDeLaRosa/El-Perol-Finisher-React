import './RecipeNonVerified.css'

const RecipeNonVerified = ({ imgSrc = '', recipeName = '' }) => {
  return (
    <article className='article-recipe-simple-non-verified'>
      <img src={imgSrc} alt={recipeName} />
      <h3>{recipeName}</h3>
    </article>
  )
}

const RecipeNonVerifiedAdmin = ({
  imgSrc = '',
  recipeName = '',
  region = '',
  difficulty = '',
  time = '',
  portions = '',
  ingredients = '',
  elaboration = ''
}) => {
  return (
    <article className='article-recipe-non-verified-admin'>
      <h3>{recipeName}</h3>
      <div className='div-recipe-non-verified-admin-img'>
        <img src={imgSrc} alt={recipeName} />
      </div>
      <div className='div-recipe-non-verified-admin-basics flex-container'>
        <h5>{region} |</h5>
        <h5>{difficulty} |</h5>
        <h5>{portions} porciones |</h5>
        <h5>{time} min</h5>
      </div>
      <div className='div-recipe-non-verified-admin-ingredients flex-container'>
        <h4>Ingredientes</h4>
        <ul className='flex-container'>
          {(ingredients || []).map((ingredient, index) => (
            <li key={index}>{ingredient} |</li>
          ))}
        </ul>
      </div>
      <div className='div-recipe-non-verified-admin-elaboration flex-container'>
        <h4>Elaboración</h4>
        <p>{elaboration}</p>
      </div>
    </article>
  )
}

export { RecipeNonVerified, RecipeNonVerifiedAdmin }
