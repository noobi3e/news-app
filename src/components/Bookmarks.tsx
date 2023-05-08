import React from 'react'
import { cusSelector } from '../store/cusHooks'
import { SingleArticle } from './SingleArticle'

export const Bookmarks: React.FC = () => {
  const { bookmarks } = cusSelector((st) => st.bookmark)

  const errtxt = (
    <h2 className='fw-semibold fs-1 mt-5'>You don't have any bookmarks yet!</h2>
  )
  const bookmarkFeeds =
    bookmarks.length > 0
      ? bookmarks.map((brk) => <SingleArticle key={brk.id} {...brk} />)
      : errtxt
  return (
    <>
      <section className='row my-4'>{bookmarkFeeds}</section>
    </>
  )
}
