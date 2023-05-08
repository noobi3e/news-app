import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Article } from './articleSlice'
import { AppDispatch } from '.'

interface Bookmark {
  showBookmarks: boolean
  bookmarks: Article[]
}

const init: Bookmark = {
  showBookmarks: false,
  bookmarks: [],
}

export const bookmarkSlice = createSlice({
  name: 'booksmarks',
  initialState: init,
  reducers: {
    showBookmark(state) {
      state.showBookmarks = true
    },
    hideBookmark(state) {
      state.showBookmarks = false
    },
    addBookmarks(state, action: PayloadAction<Article>) {
      const exists = state.bookmarks.some((el) => {
        console.log(el.title, action.payload.title)
        return el.title === action.payload.title
      })
      console.log(exists)
      if (!exists) {
        state.bookmarks.push(action.payload)
      }
    },
    removeBookmarks(state, action: PayloadAction<{ id: string }>) {
      const index = state.bookmarks.findIndex(
        (brk) => brk.title === action.payload.id
      )

      if (index >= 0) {
        state.bookmarks.splice(index, 1)
      }
    },
    saveBookmarks(state) {
      const data = JSON.stringify(state.bookmarks)
      localStorage.removeItem('bookmarks')
      localStorage.setItem('bookmarks', data)
    },

    restoreBookmarks(state, action: PayloadAction<Article[]>) {
      state.bookmarks = action.payload
    },
  },
})

export const bookmarkActions = bookmarkSlice.actions
