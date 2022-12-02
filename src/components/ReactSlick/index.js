import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'
import './index.css'

const ReactSlick = props => {
  const {booksList, booksNum} = props
  const settings = {
    dots: false,
    slidesToShow: booksNum,
    slidesToScroll: 1,
    dotsClass: 'slick-buttons',
  }
  return (
    <ul className="slider-container">
      <Slider {...settings} className="slider">
        {booksList.map(each => (
          <li className="top-rated-list-item" key={each.title}>
            <Link to={`/books/${each.id}`} className="link">
              <div className="image-container">
                <img
                  src={each.coverPic}
                  alt={each.title}
                  key={each.id}
                  className="top-rated-image"
                />
              </div>
              <h1 className="title-name">{each.title}</h1>
              <p className="author-name">{each.authorName}</p>
            </Link>
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default ReactSlick
