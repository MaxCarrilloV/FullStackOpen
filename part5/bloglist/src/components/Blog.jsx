import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [view, setView] = useState(false)
  const [blogView, setBlogView] = useState(blog)
  const show = { display: view ? '' : 'none' }

  const toggleVisibility = () => {
    setView(!view)
  }

  const showRemove = { display: blogView.user.id === user ? '' : 'none' }

  const handleLike = (blogup) => {
    blogup.likes += 1    
    updateBlog(blogup)
    setBlogView(blogup)
  }

  const handleRemove = () => removeBlog(blogView)

  const label = view ? 'Hide' : 'View'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div >
        {blogView.title} {blogView.author}
        <button onClick={toggleVisibility}> {label}</button>
      </div>
      <div style={show}>
        <p> {blogView.title} </p>
        <p >{blogView.author} </p>
        <p>
          Likes {blogView.likes}
          <button onClick={() => handleLike(blogView)}>Like</button>
        </p>
        <p> {blogView.url}</p>
        <button style={showRemove} onClick={() => handleRemove(blogView)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default Blog
