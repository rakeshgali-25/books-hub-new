import './index.css'
import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import ReactSlick from '../ReactSlick'

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, booksList: []}

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.books.map(each => ({
        id: each.id,
        coverPic: each.cover_pic,
        authorName: each.author_name,
        title: each.title,
      }))
      this.setState({apiStatus: apiConstants.success, booksList: updatedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.replace('/books')
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {booksList} = this.state

    return (
      <div className="carousel-container">
        <div className="carousel-heading-container">
          <h1 className="title-name">Top Rated Books</h1>
          <button
            type="button"
            onClick={this.onClickFindBooks}
            className="find-books-button"
          >
            Find Books
          </button>
        </div>

        <div className="carousel-desktop">
          <ReactSlick booksList={booksList} booksNum={4} />
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getTheData()
  }

  renderFailure = () => {
    const {booksList} = this.state
    return (
      <div className="carousel-container">
        <div className="carousel-heading-container">
          <h1 className="title-name">Top Rated Books</h1>
          <button
            type="button"
            onClick={this.onClickFindBooks}
            className="find-books-button"
          >
            Find Books
          </button>
        </div>
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/meetup/not-found-img.png"
            alt="failure view"
            className="failure-img"
          />
          <p>Something went wrong. Please try again</p>
          <button
            type="button"
            onClick={this.onClickTryAgain}
            className="try-again-button"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  renderCarousel = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <div className="home-top-container">
            <h1 className="top-home-heading">Find Your Next Favorite Books?</h1>
            <p className="top-home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type="button"
              onClick={this.onClickFindBooks}
              className="find-books-button-mobile"
            >
              Find Books
            </button>
          </div>
          {this.renderCarousel()}
          <div className="footer-container">
            <div className="icons-container">
              <FaGoogle />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
