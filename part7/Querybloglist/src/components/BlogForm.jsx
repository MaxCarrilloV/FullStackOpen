import { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  GridColumn,
  FormInput,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(blog)
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <GridColumn>
        <Form onSubmit={handleSubmit}>
          <h1>Create a new blog</h1>
          Title:
          <FormInput
            placeholder="Title"
            data-testid="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          Author:
          <FormInput
            placeholder="Author"
            data-testid="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          URL:
          <FormInput
            placeholder="Url"
            data-testid="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button color="black" type="submit">
            Create
          </Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
