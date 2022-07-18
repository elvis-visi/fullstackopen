//receive and empty array of blogs and rerturn 1
const dummy = (blogs) => {

  return 1
}


//return the total sum of the likes in all the blog posts
const totalLikes = (blogs) => {
  if(blogs.length === 0)
    return 0

  return blogs.reduce((sum,blog) => sum += blog.likes,0)

}


module.exports = {
  dummy, totalLikes
}