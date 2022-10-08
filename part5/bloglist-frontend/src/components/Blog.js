import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }

    updateLikes(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible &&
        <div>
          {blog.url} <br/>
          likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
          {blog.user.name} <br/>
          {blog.user.username === user.username ? <button onClick={handleDelete}>delete</button> : null}
        </div>
      }
    </div>
  )
}


Blog.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Blog