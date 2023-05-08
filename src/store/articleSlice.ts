import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './index'
// import { ReducerAction } from 'react'

export interface Article {
  author: string
  imageUrl: string
  description: string
  id: string
  title: string
  sourceUrl: string
  date: string
  bookmarked: boolean
}

interface state {
  articles: Article[]
  isLoading: boolean
}

const init: state = {
  articles: [],
  isLoading: false,
}

export const articleSlice = createSlice({
  name: 'articles',
  initialState: init,
  reducers: {
    storeArticles(state, action: PayloadAction<Article[]>) {
      state.articles = [...action.payload]
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setBookmark(
      state,
      action: PayloadAction<{ id: string; bookmark: boolean }>
    ) {
      const index = state.articles.findIndex(
        (el) => el.title === action.payload.id
      )

      state.articles[index].bookmarked = action.payload.bookmark
    },
  },
})

export const aricleAction = articleSlice.actions

export const getData = (search: string, bookmarks: Article[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(aricleAction.setLoading(true))
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&language=en&apiKey=8e1b38905d87417ea894dd0cca7e57f2`
      )

      if (!res.ok) throw new Error("Can't able to find data for this topics")

      const data = await res.json()

      // fetching only 20 articles
      const articles: Article[] = []

      data.articles.forEach((el: any, i: number) => {
        if (i < 20) {
          const exist = bookmarks.some((brk) => brk.title === el.title)

          articles.push({
            title: el.title,
            description: el.description,
            id: el.publishedAt + Math.random().toFixed(5),
            date: el.publishedAt,
            author: el.author,
            sourceUrl: el.url,
            imageUrl: el.urlToImage,
            bookmarked: exist,
          })
        }
      })

      dispatch(aricleAction.storeArticles(articles))
      dispatch(aricleAction.setLoading(false))
    } catch (err) {
      dispatch(aricleAction.storeArticles([]))
      console.warn(err)
    }
  }
}
