"use client"

import { FaSearch } from 'react-icons/fa'
import { useGithubSearch } from '@/providers/GithubSearchProvider'

const Search = () => {
  const { search } = useGithubSearch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      form.reportValidity()
      return
    }

    try {
      const formData = new FormData(form)
      search(formData)
    } catch (error) {

    }
  }

  return (
    <form className='mx-6' onSubmit={handleSubmit}>
      <div className="container bg-bluish-gray flex items-center gap-2 p-2 rounded-xl">
        <FaSearch size={30} className="text-primary font-bold" />
        <input
          className='px-4 h-16 bg-transparent flex-1 border-none outline-none'
          type="search"
          name="username"
          placeholder='Search Github username...'
        />
        <button className='bg-primary h-16 px-4 rounded-xl'>Search</button>
      </div>
    </form>
  )
}

export default Search