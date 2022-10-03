//TODO Make 4.6 and 4.7 pending exercises

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog['likes'], 0) 
}

const favouriteBlog = (blogs) => {
  let mostLikedBlog = blogs[0]
  
  blogs.forEach(blog => {
    if(blog['likes'] > mostLikedBlog['likes']) mostLikedBlog = blog
  })

  return mostLikedBlog
}



module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}