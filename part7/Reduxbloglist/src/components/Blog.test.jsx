import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Renders title and author ', () => {
  const blog = {
    title: 'React patterns',
    author:'W. Dijkstra',
    url:'https://reactpatterns.com/',
    user:'66de1cbf9ea3ff0c76021289'
  }

  const { container } = render(<Blog blog={blog} user='66de1cbf9ea3ff0c76021289'></Blog>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('React patterns W. Dijkstra')
})

test('When click the view button it shows the url and the likes',async () => {
  const blog = {
    title: 'React patterns',
    author:'W. Dijkstra',
    url:'https://reactpatterns.com/',
    user:'66de1cbf9ea3ff0c76021289',
    likes:7
  }

  const { container } = render(<Blog blog={blog} user='66de1cbf9ea3ff0c76021289'></Blog>)
  const div = container.querySelector('.blog')

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  expect(div).toHaveTextContent('https://reactpatterns.com/')
  expect(div).toHaveTextContent('Likes 7')
})
test('When click like button twice', async () => {
  const blog = {
    id: '66de375413ac847bf453e8d8',
    title: 'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    user:'66de1cbf9ea3ff0c76021289',
    likes:18
  }
  const mockUpdate = vi.fn()
  render(<Blog blog={blog} user='66de1cbf9ea3ff0c76021289' updateBlog={mockUpdate}></Blog>)
  const user = userEvent.setup()
  const view = screen.getByText('View')
  await user.click(view)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockUpdate.mock.calls).toHaveLength(2)
})