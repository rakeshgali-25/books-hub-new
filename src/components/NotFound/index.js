import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dlkkbb6xc/image/upload/v1669640516/Group_7484_ccxw0e.jpg"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)

export default NotFound
