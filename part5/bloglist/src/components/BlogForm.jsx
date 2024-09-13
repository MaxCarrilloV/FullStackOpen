import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog ={
      title:title,
      author:author,
      url:url,
    }
    createBlog(blog)
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a new blog</h1>
      <div>
        Title:
        <input
          data-testid='title'
          type="text"
          name="title"
          placeholder='Title blog'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          data-testid='author'
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          data-testid='url'
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
