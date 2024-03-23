const express = require('express');
const postsApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function from uuid package
const verifyToken = require('./middlewares/verifyToken');


postsApp.post('/create-post',verifyToken, expressAsyncHandler(async (req, res) => {
  const newPost = req.body;
  // console.log(req.body)
  const postId = uuidv4(); // Generate a unique post ID
  // Construct the post object
  newPost.postId=postId
  newPost.likes = { count: 0, users: [] }
  newPost.comments = { count: 0, comments: {} }

  const postCollectionObj = req.app.get("postCollectionObj"); // Get the postCollection from app settings
  const postCollectionResult = await postCollectionObj.insertOne(newPost);
  const userCollectionObj=req.app.get("userCollectionObj");
  const newPostObject = { postId, tags:newPost.tags }; 
  const userCollectionResult = await userCollectionObj.updateOne({ username: newPost.metadata.username },{ $push: { "posts": newPostObject } })
  res.status(201).json({ message: 'Post created successfully', postId: postId, postCollectionResult:postCollectionResult ,userCollectionResult:userCollectionResult});
}));

// Get all posts
postsApp.get('/posts-get', expressAsyncHandler(async (req, res) => {
  const postCollectionObj = req.app.get("postCollectionObj"); // Get the postCollection from app settings

  const posts = await postCollectionObj.find({}).toArray();
  res.status(200).json(posts);
}));

// // Update a post by ID
// postsApp.put('/posts/edit/:postId', invalidPostIdHandler, expressAsyncHandler(async (req, res) => {
//   const { postId } = req.params;
//   const { heading, body, imageUrl, tags } = req.body;
//   const updatedPost = { heading, body, imageUrl, tags };
//   const postCollection = dbClient.db('talent_space').collection('postCollection');
//   const result = await postCollection.updateOne({ _id: ObjectId(postId) }, { $set: updatedPost });
//   if (result.modifiedCount > 0) {
//     res.status(200).json({ message: 'Post updated successfully' });
//   } else {
//     res.status(404).json({ message: 'Post not found' });
//   }
// }));

// // Delete a post by ID
// postsApp.delete('/posts/delete/:postId', invalidPostIdHandler, expressAsyncHandler(async (req, res) => {
//   const { postId } = req.params;
//   const postCollection = dbClient.db('talent_space').collection('postCollection');
//   const result = await postCollection.deleteOne({ _id: ObjectId(postId) });
//   if (result.deletedCount > 0) {
//     res.status(200).json({ message: 'Post deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Post not found' });
//   }
// }));

// Error handling middleware

module.exports = postsApp;
