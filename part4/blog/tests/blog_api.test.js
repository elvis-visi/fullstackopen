//import express application, pass it to supertest function.
//import http so we can test HTTP requests

const mongoose = require('mongoose') //need connection to mongoDb
const supertest = require('supertest') //superagent object
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

//initialize the database before every test, esnuring the DB is in the same
//state before every test is run
const initialBlogs = [

  {
    'title': 'dilahutaku',
    'author': 'lejm',
    'url': 'xhurxh',
    'likes': 23

  },

  {
    'title': 'hutaku',
    'author': 'james',
    'url': 'bosh',
    'likes': 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

})

//correct amount of blog posts returned in the JSON format

test('there are 2 blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)

})

test('bogs posts are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('unique identifier property of the blog posts is named id', async () => {
  const response  = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body[0].id.toBedefined)
  expect(response.body[0]._id).toBe(undefined)

})

//verify new post has been added => number of total posts has increased by 1
test('a valid blog post has been added', async () => {
  const newPost =  {  //new post to be added
    'title': 'react',
    'author': 'lejm',
    'url': 'react.web',
    'likes': 11

  }

  await api
    .post('/api/blogs')  //post request to the url
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response  =await api.get(('/api/blogs')) //successful operation or not

  const contents = response.body.map(r => r.title) //new array with title of each blog post

  //expect total number of posts to have increased by 1
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  //assuring the correct post has been added to the database => same title
  expect(contents).toContain('react')


})

//if likes property is missing from the from the request, it will default to 0
test('likes property missing , likes will default to 0', async () => {
  const newPost =  {  //new post to be added
    'title': 'react',
    'author': 'lejm',
    'url': 'react.web',
  }

  const response = await api
    .post('/api/blogs')
    .send(newPost)
    .expect('Content-Type',/json/)
    .expect(201)


  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('verify if title and url are in the body', async () => {

  const newPost = {
    author: 'deku',
    likes: 16
  }
  const response = await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)

  expect(response.body.error).toBe('title or url is missing')
})






afterAll(() => {
  mongoose.connection.close()
})