import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Header } from './components/Header'
import { FilterOptions } from './components/FilterOptions'
import { NewsArticles } from './components/NewsArticles'
import { Bookmarks } from './components/Bookmarks'
import { cusDisptach, cusSelector } from './store/cusHooks'
import { bookmarkActions } from './store/bookmarkSlice'

// API Key- 8e1b38905d87417ea894dd0cca7e57f2

export const App: React.FC = () => {
  const { showBookmarks } = cusSelector((st) => st.bookmark)
  const dispatch = cusDisptach()

  useEffect(() => {
    if (localStorage.getItem('bookmarks')) {
      const book: [] = JSON.parse(localStorage.getItem('bookmarks')!)

      if (book.length > 0) dispatch(bookmarkActions.restoreBookmarks(book))
    }
  }, [])

  return (
    <>
      <div className='container text-center'>
        <Header />
        <FilterOptions />
        {!showBookmarks && <NewsArticles />}
        {showBookmarks && <Bookmarks />}
      </div>
    </>
  )
}
