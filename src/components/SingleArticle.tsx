import React from 'react'
import { Star, StarFill } from 'react-bootstrap-icons'
import { cusDisptach, cusSelector } from '../store/cusHooks'
import { Article, aricleAction } from '../store/articleSlice'
import { bookmarkActions } from '../store/bookmarkSlice'

export const SingleArticle: React.FC<Article> = (props) => {
  const dispatch = cusDisptach()
  const { articles } = cusSelector((st) => st.article)

  const toggleBookMark = () => {
    // checking if bookmarked or not
    if (props.bookmarked) {
      dispatch(bookmarkActions.removeBookmarks({ id: props.title }))
      dispatch(bookmarkActions.saveBookmarks())

      if (articles.length > 0)
        dispatch(aricleAction.setBookmark({ id: props.title, bookmark: false }))
    } else {
      dispatch(bookmarkActions.addBookmarks({ ...props, bookmarked: true }))
      dispatch(bookmarkActions.saveBookmarks())

      if (articles.length > 0)
        dispatch(aricleAction.setBookmark({ id: props.title, bookmark: true }))
    }
  }

  const date = new Date(props.date).toLocaleDateString()

  console.log(props.imageUrl)

  return (
    <article className='col col-md-6 mb-4 col-auto position-relative'>
      <div className='card h-100 py-3 px-3'>
        <img src={props.imageUrl} alt={props.title} className='list-img' />
        <div className='d-flex justify-content-between gap-4'>
          <p className='fw-semibold fs-6 mt-1'>Published At: {date} </p>
          <span className='bookmark mt-2' onClick={toggleBookMark}>
            {!props.bookmarked && <Star fill='black' className='fs-2' />}
            {props.bookmarked && (
              <StarFill fill='goldenrod' className='fs-2 text-shadow' />
            )}
          </span>
        </div>
        <section className='detail d-flex flex-column gap-2 mt-4'>
          <p className='title fw-semibold fs-4 '>{props.title}</p>
          <p className='desc fs-6'>{props.description}</p>
        </section>

        <div className='d-flex flex-wrap  gap-5 justify-content-center'>
          {props.author && (
            <p className='author fs-5'>
              <strong>Author:</strong> {props.author}
            </p>
          )}
          <a
            className='link fw-semibold btn btn-warning text-uppercase py-2 px-4'
            href={props.sourceUrl}
            target='_blank'>
            Details
          </a>
        </div>
      </div>
    </article>
  )
}
