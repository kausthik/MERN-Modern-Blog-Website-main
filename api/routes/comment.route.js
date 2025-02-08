import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  likeComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - postId
 *         - userId
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the comment
 *         postId:
 *           type: string
 *           description: The ID of the post the comment is associated with
 *         userId:
 *           type: string
 *           description: The ID of the user who created the comment
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the comment
 *         numberOfLikes:
 *           type: number
 *           description: The number of likes the comment has received
 *       example:
 *         content: "This is a comment on the post."
 *         postId: "603d2149f8459a12c58a1b92"
 *         userId: "603d2149f8459a12c58a1b93"
 *         likes: []
 *         numberOfLikes: 0
 */

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       403:
 *         description: Unauthorized, token missing or invalid
 */
router.post('/create', verifyToken, createComment);

/**
 * @swagger
 * /api/comment/getPostComments/{postId}:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: List of comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 */
router.get('/getPostComments/:postId', getPostComments);

/**
 * @swagger
 * /api/comment/likeComment/{commentId}:
 *   put:
 *     summary: Like a comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to like
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *       404:
 *         description: Comment not found
 */
router.put('/likeComment/:commentId', verifyToken, likeComment);

/**
 * @swagger
 * /api/comment/editComment/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
router.put('/editComment/:commentId', verifyToken, editComment);

/**
 * @swagger
 * /api/comment/deleteComment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;
