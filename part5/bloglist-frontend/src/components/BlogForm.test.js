import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={ mockCreateBlog }/>)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.queryByText('create blog')

  await user.type(inputs[0], 'writing a text')
  await user.type(inputs[1], 'writing a text')
  await user.type(inputs[2], 'writing a text')
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(JSON.stringify(mockCreateBlog.mock.calls[0])).toBe(JSON.stringify(['writing a text', 'writing a text', 'writing a text']))
})