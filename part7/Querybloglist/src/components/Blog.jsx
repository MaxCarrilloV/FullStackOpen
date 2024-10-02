import { useState } from 'react'
import { update, remove, addComment } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from '../NotificationContext'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Header,
  Segment,
  Container,
  List,
  ListItem
} from 'semantic-ui-react'
const Blog = ({ blog, user }) => {
  const [coment, setComment] = useState('')
  const [userView, setUserView] = useState(user)
  const [blogView, setBlogView] = useState(blog)
  const navigate = useNavigate()
  const Notidispatch = useNotificatioDispatch()
  const queryClient = useQueryClient()
  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== id)
      )
    },
  })
  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (blog) => {
      setBlogView(blog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  let showRemove
  if (blogView.user.id) {
    showRemove = { display: blogView.user.id === userView.id ? '' : 'none' }
  } else {
    showRemove = { display: blogView.user === userView.id ? '' : 'none' }
  }
  const removeBlog = (blogdel) => {
    try {
      if (window.confirm(`Remove blog ${blogdel.title} by ${blogdel.author}`)) {
        removeBlogMutation.mutate(blogdel.id)
        const data = {
          text: `blog ${blogdel.title} is deleted`,
          style: 'exists',
        }
        navigate('/')
        Notidispatch({ type: 'setNotification', payload: data })
        setTimeout(() => {
          Notidispatch({ type: 'hideNotification' })
        }, 5000)
      }
    } catch (error) {
      const data = { text: 'Wrong credentials', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      NotisetTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }
  const updateBlog = (blogup) => updateBlogMutation.mutate(blogup)

  const handleLike = (blogup) => {
    const update = { ...blogup, likes: blogup.likes + 1 }
    updateBlog(update)
    setBlogView(update)
    setUserView(userView)
  }
  const handleRemove = () => removeBlog(blogView)
  const comment = () => {
    const blogUp = {
      ...blogView,
      comments: blogView.comments.concat({
        comment: coment,
      }),
    }
    addCommentMutation.mutate(blogUp)
    setComment('')
  }

  return (
    <Container style={{marginTop:'2em'}}>
      <Segment style={{ padding: '1em 1em' }}>
        <div className="blog">
          <Header as="h1"> {blogView.title} </Header>
          <p> {blogView.url}</p>
          <p>
            Likes {blogView.likes}
            <Button color="black" onClick={() => handleLike(blogView)}>
              Like
            </Button>
          </p>
          <p>added by {blogView.author} </p>
          <Header as="h3">Comments</Header>
          <div>
            <Input
              type="text"
              value={coment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button color="black" onClick={() => comment()}>
              add comment
            </Button>
          </div>
          <List bulleted>
            {blogView.comments.map((comment) => (
              <ListItem key={comment._id}>{comment.comment}</ListItem>
            ))}
          </List>
          <Button color="black" style={showRemove} onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Segment>
    </Container>
  )
}
export default Blog
