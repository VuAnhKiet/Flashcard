import React from 'react'

function SearchCard({ searchProps }) {
  const { query, Search, checkValue } = searchProps;
  return (
    <div>
      <form onSubmit={Search}>
        <input type="text" id="mySearch" value={query} onChange={checkValue} placeholder="Search.."></input>
      </form>
    </div>
  )
}

export default SearchCard