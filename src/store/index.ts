import { configureStore } from '@reduxjs/toolkit'
import { bookmarkSlice } from './bookmarkSlice'
import { articleSlice } from './articleSlice'

export const store = configureStore({
  reducer: { bookmark: bookmarkSlice.reducer, article: articleSlice.reducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
