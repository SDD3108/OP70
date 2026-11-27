import React from 'react'
import SearchPageBuilder from '@/src/pageBuilders/SearchPageBuilder'

const SearchPage = async({searchParams}) => {
  const { q } = await searchParams;
  return (
    <>
      <SearchPageBuilder search={typeof q == "string" ? q : ""}/>
    </>
  )
}

export default SearchPage
