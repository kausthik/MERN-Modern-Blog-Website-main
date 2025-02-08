import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The unique username of the user
 *         email:
 *           type: string
 *           description: The unique email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: string
 *           description: Profile picture URL
 *         isAdmin:
 *           type: boolean
 *           description: Is the user an admin or not
 *       example:
 *         username: "john_doe"
 *         email: "john_doe@example.com"
 *         password: "Password123"
 *         profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
 *         isAdmin: false
 */

/**
 * @swagger
 * /api/user/test:
 *   get:
 *     summary: Test the user route
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success message
 */
router.get('/test', test);

/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     summary: Update a user's details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/update/:userId', verifyToken, updateUser);

/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/delete/:userId', verifyToken, deleteUser);

/**
 * @swagger
 * /api/user/signout:
 *   post:
 *     summary: Sign out the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User signed out successfully
 */
router.post('/signout', signout);

/**
 * @swagger
 * /api/user/getusers:
 *   get:
 *     summary: Retrieve all users (admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden, only admins can access this route
 */
router.get('/getusers', verifyToken, getUsers);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: The user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:userId', getUser);

export default router;
