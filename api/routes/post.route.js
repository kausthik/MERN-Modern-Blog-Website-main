import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, dislikePost, getLikesAndDislikes, getposts, likePost, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who created the post
 *         title:
 *           type: string
 *           description: Title of the blog post
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         category:
 *           type: string
 *           description: Category of the post
 *         image:
 *           type: string
 *           description: Image URL for the blog post
 *         slug:
 *           type: string
 *           description: Slug generated from the post title
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the post
 *         dislikes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who disliked the post
 *       example:
 *         title: "My First Blog Post"
 *         content: "This is the content of my first post."
 *         category: "Technology"
 *         image: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
 *         slug: "my-first-blog-post"
 *         likes: []
 *         dislikes: []
 */

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *       400:
 *         description: Bad request, missing required fields
 *       403:
 *         description: Unauthorized, only admins can create posts
 */
router.post('/create', verifyToken, create);

/**
 * @swagger
 * /api/post/getposts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts to return
 *       - in: query
 *         name: startIndex
 *         schema:
 *           type: integer
 *         description: Starting index for pagination
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for filtering posts by title or content
 *     responses:
 *       200:
 *         description: The list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/getposts', getposts);

/**
 * @swagger
 * /api/post/deletepost/{postId}/{userId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user performing the delete action
 *     responses:
 *       200:
 *         description: The post was deleted
 *       403:
 *         description: Unauthorized, only admins or the post owner can delete the post
 *       404:
 *         description: Post not found
 */
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);

/**
 * @swagger
 * /api/post/updatepost/{postId}/{userId}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user performing the update action
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated successfully
 *       403:
 *         description: Unauthorized, only admins or the post owner can update the post
 *       404:
 *         description: Post not found
 */
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

/**
 * @swagger
 * /api/post/like/{postId}:
 *   put:
 *     summary: Like a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to like
 *     responses:
 *       200:
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.put('/like/:postId', verifyToken, likePost);

/**
 * @swagger
 * /api/post/dislike/{postId}:
 *   put:
 *     summary: Dislike a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to dislike
 *     responses:
 *       200:
 *         description: Post disliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.put('/dislike/:postId', verifyToken, dislikePost);

/**
 * @swagger
 * /api/post/likes-dislikes/{postId}:
 *   get:
 *     summary: Get the details of users who liked or disliked a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: List of users who liked or disliked the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Username of the user who liked the post
 *                 dislikes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Username of the user who disliked the post
 *       404:
 *         description: Post not found
 */
router.get('/likes-dislikes/:postId', verifyToken, getLikesAndDislikes);

export default router;
