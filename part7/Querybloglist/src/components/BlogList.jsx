import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from '../NotificationContext'
import { create } from '../services/blogs'
import { Link } from 'react-router-dom'
import { Segment, Container, Header, Grid } from 'semantic-ui-react'
import BlogForm from './BlogForm'
import Toggable from './Toggable'
const BlogList = ({ blogs }) => {
  const Notidispatch = useNotificatioDispatch()
  const queryClient = useQueryClient()
  const blogFormRef = useRef()
  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
  })
  const createBlog = (Newblog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(Newblog)
      const data = {
        text: `A new blog ${Newblog.title} by ${Newblog.author} added`,
        style: 'exists',
      }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    } catch (error) {
      const data = { text: 'Wrong credentials', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <Container style={{marginTop:'2em'}}>
      <Header textAlign='center' as="h1">Blogs</Header>
      <Toggable buttonlabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Toggable>
      {blogs &&
        blogs.map((blog) => (
          <Segment size="large" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </Segment>
        ))}
    </Container>
  )
}
export default BlogList
