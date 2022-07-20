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

//which blog has the most likes, toEqual to compare objects, compares all properties
const favoriteBlog = (blogs) => {

  if(blogs.length === 0)
    return {}
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)


}



module.exports = {
  dummy, totalLikes, favoriteBlog
}