import React, { useState, useCallback, useEffect } from 'react'
import { Search, Mic } from 'lucide-react'
 
const sampleData = [
  {
    id: 1,
    title: 'React Official Documentation',
    url: 'https://reactjs.org/',
  },
  {
    id: 2,
    title: 'Mozilla Developer Network (MDN)',
    url: 'https://developer.mozilla.org/',
  },
  {
    id: 3,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com/',
  },
  {
    id: 4,
    title: 'GitHub',
    url: 'https://github.com/',
  },
  {
    id: 5,
    title: 'npm',
    url: 'https://www.npmjs.com/',
  },
]
 
const GoogleSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
 
  const debounce = (func : ()=>{}, delay : number) => {
    let timeoutId : number
    return (...args : []) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }
 
  const handleSearch = useCallback(
    debounce((term) => {
      if (term.trim() === '') {
        setSearchResults([])
      } else {
        const results = sampleData.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase()),
        )
        setSearchResults(results)
      }
    }, 300),
    [],
  )
 
  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])
 
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }
 
  // Todo for you: Add the below code to the GoogleSearchBar component:
  return (
    <div className="">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=""
      >
        <div className="">
          <input type="text" onChange={handleInputChange} className=""
            placeholder="Search a country"
          />
          <div className="">
            <button type="submit" className="">
              <Search size={20} />{' '}
            </button>{' '}
          </div>{' '}
        </div>{' '}
      </form>{' '}
      {searchResults.length > 0 && (
        <div className="">
          <h2 className=""> Search Results: </h2>{' '}
          <ul>
            {' '}
            {searchResults.map((result) => (
              <li key={result.id} className="">
                <a
                  href={result.url}
                  className=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  {result.title}{' '}
                </a>{' '}
              </li>
            ))}{' '}
          </ul>{' '}
        </div>
      )}{' '}
    </div>
  )
}
 
export default GoogleSearchBar