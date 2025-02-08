import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: "john_doe@example.com"
 *         password: "Password123"
 * 
 *     SignupRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: "john_doe"
 *         email: "john_doe@example.com"
 *         password: "Password123"
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Bad request, all fields are required
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Sign in successful, returns user data and token in cookies
 *       400:
 *         description: Bad request, missing fields
 *       404:
 *         description: User not found
 */
router.post('/signin', signin);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Sign in or sign up using Google authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The Google email
 *               name:
 *                 type: string
 *                 description: The user's name
 *               googlePhotoUrl:
 *                 type: string
 *                 description: The URL to the user's Google profile picture
 *             example:
 *               email: "john_doe@example.com"
 *               name: "John Doe"
 *               googlePhotoUrl: "https://example.com/photo.jpg"
 *     responses:
 *       200:
 *         description: Google authentication successful, returns user data and token in cookies
 *       400:
 *         description: Bad request
 */
router.post('/google', google);

export default router;
