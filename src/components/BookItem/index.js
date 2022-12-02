import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {each} = props
  const {coverPic, id, title, authorName, rating, readStatus} = each
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-item-container" key={id}>
        <img src={coverPic} alt={title} className="cover-pic" />
        <div className="book-item-details">
          <h1 className="book-name">{title}</h1>
          <p className="book-author">{authorName}</p>
          <p className="book-rating">
            Avg rating
            <BsFillStarFill className="star" />
            {rating}
          </p>
          <p className="book-status">Status:</p>{' '}
          <label className="label2">{readStatus}</label>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
