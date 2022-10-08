import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author, but does not render url and likes by default', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Lamine Yamal',
    url: 'https://www.blog.com/',
    likes: 120
  }

  render(<Blog blog={ blog }/>)

  const title = screen.queryByText(blog.title)
  const author = screen.queryByText(blog.author)
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('clicks view details, displays url and likes', async () => {
  const currentUser = {
    name: 'Ruli Worst',
    username: 'ruliworst'
  }

  const blog = {
    title: 'Blog title',
    author: 'Lamine Yamal',
    url: 'https://www.blog.com/',
    likes: 120,
    user: {
      name: 'Ter Stegen',
      username: 'teri'
    }
  }

  render(<Blog blog={ blog } user={ currentUser } />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('clicks twice like button, event handler has registered twice clicks', async () => {
  const currentUser = {
    name: 'Ruli Worst',
    username: 'ruliworst'
  }

  const blog = {
    title: 'Blog title',
    author: 'Lamine Yamal',
    url: 'https://www.blog.com/',
    likes: 120,
    user: {
      name: 'Ter Stegen',
      username: 'teri'
    }
  }

  const mockUpdateLikes = jest.fn()

  render(<Blog blog={ blog } user={ currentUser } updateLikes={ mockUpdateLikes }/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateLikes.mock.calls).toHaveLength(2)
})