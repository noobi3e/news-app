import React from 'react'
import { cusDisptach, cusSelector } from '../store/cusHooks'
import { bookmarkActions } from '../store/bookmarkSlice'

export const FilterOptions: React.FC = () => {
  const dispatch = cusDisptach()
  const { showBookmarks } = cusSelector((st) => st.bookmark)
  return (
    <section className='row mt-4'>
      <div className='col d-flex justify-content-center align-items-center gap-4'>
        <button
          onClick={() => dispatch(bookmarkActions.hideBookmark())}
          className={`text-uppercase ${
            !showBookmarks && 'active'
          } fw-semibold btn btn-outline-primary px-5 py-2`}>
          Articles
        </button>
        <button
          onClick={() => dispatch(bookmarkActions.showBookmark())}
          className={`text-uppercase fw-semibold btn btn-outline-info px-5 py-2 ${
            showBookmarks && 'active'
          }`}>
          favourites
        </button>
      </div>
    </section>
  )
}
