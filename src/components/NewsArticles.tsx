import React from 'react'
import { cusSelector } from '../store/cusHooks'
import { SingleArticle } from './SingleArticle'

export const NewsArticles: React.FC = () => {
  const { articles, isLoading } = cusSelector((st) => st.article)

  const errTxt = <h2 className='fw-semibold fs-1 mt-5'>No Article Found!!</h2>
  const feeds =
    articles.length > 0
      ? articles.map((art) => <SingleArticle key={art.id} {...art} />)
      : errTxt

  return (
    <section className='row my-4 rows-cols-2'>
      {isLoading && (
        <p className='text-center fs-3 fw-bold text-primary'>Loading...</p>
      )}
      {!isLoading && feeds}
    </section>
  )
}
