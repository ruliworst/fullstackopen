import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const createBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login(username, password)
      setUser(loggedUser)

      blogService.setToken(loggedUser.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const updateLikes = (blogId, updatedBlog) => {
    try {
      blogService
        .update(blogId, updatedBlog)
        .then(() => {
          const updatedBlogWithId = { ...updatedBlog, id: blogId }
          const newBlogs = blogs.map(blog => blog.id === blogId ? updatedBlogWithId : blog)
          setBlogs(newBlogs)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBlog = (blogId) => {
    try {
      blogService
        .deleteBlog(blogId)
        .then(() => {
          const newBlogs = blogs.filter(blog => blog.id !== blogId)
          setBlogs(newBlogs)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const createBlog = (title, author, url) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      blogService
        .create({ title, author, url, user })
        .then(blog => {
          if (blog) {
            setBlogs([...blogs, blog])
            setMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => { setMessage(null) }, 5000)
          }
        })
    } catch (e) {
      console.error(e)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : (
          <div>
            <h2>Blogs</h2>
            <Notification message={message} />
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="create" ref={createBlogFormRef}>
              <BlogForm createBlog={createBlog}/>
            </Togglable>
            {blogs.sort((prevBlog, blog) => (blog.likes >= prevBlog.likes) ? 1 : -1).map(blog =>
              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user} />
            )}
          </div>
        )
      }
    </div>
  )
}

export default App
