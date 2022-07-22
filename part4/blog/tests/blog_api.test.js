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


afterAll(() => {
  mongoose.connection.close()
})