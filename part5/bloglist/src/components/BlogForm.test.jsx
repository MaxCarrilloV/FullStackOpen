import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('blog creation verification ', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog}></BlogForm>)
  const input = screen.getByPlaceholderText('Title blog')
  const sendButton = screen.getByText('Create')

  await user.type(input, 'testing blog form')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog form')
})