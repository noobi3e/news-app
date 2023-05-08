import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { cusDisptach, cusSelector } from '../store/cusHooks'
import { getData } from '../store/articleSlice'

export const Header: React.FC = () => {
  const [searchString, setSearchString] = useState('')
  const [err, setErr] = useState(false)
  const dispatch = cusDisptach()
  const { bookmarks } = cusSelector((st) => st.bookmark)
  const searchArticle = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchString.trim().length > 0) {
      dispatch(getData(searchString, bookmarks))
      setSearchString('')
      setErr(false)
    } else {
      setErr(true)
    }
  }

  return (
    <header>
      <h1 className='my-4 fw-bold'>News App</h1>
      <div className='row'>
        <form action='' className='col' onSubmit={searchArticle}>
          <div className='input-group'>
            <div className='form-floating col'>
              <input
                type='search'
                id='search'
                className='form-control'
                placeholder=' '
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value)

                  setErr(false)
                }}
              />
              <label htmlFor='search'>Search for any topic ...</label>
            </div>
            <button type='submit' className='input-group-text'>
              <Search className='fs-3' />
            </button>
          </div>
          {err && (
            <p className='text-danger errtxt'>pls enter some data to search</p>
          )}
        </form>
      </div>
    </header>
  )
}
