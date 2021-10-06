/**
* Routes
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The order ID
 *           example: 3
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: shipped
 *         total:
 *           type: float
 *           description: The total price of the order
 *           example: 2699.00
 *         userId:
 *           type: integer
 *           description: The user that placed the order.
 *           example: 7
 *
 *     Product:
 *       type: object
 *       properties:
  *         id:
 *           type: integer
 *           description: The product ID
 *           example: 21
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: Super Bike 64
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: "This bike is amazing for riding in the city!"
 *         price:
 *           type: float
 *           description: The price of the product
 *           example: 640.50
 *         color:
 *           type: string
 *           description: The color of the product
 *           example: blue
 *         size:
 *           type: string
 *           description: the sizes available for the product
 *           example: "[\"small\", \"medium\", \"large\"]"
 *             
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The order ID
 *           example: 17
 *         text:
 *           type: string
 *           description: The review for the product
 *           example: Couldn't be happier with this bike, the delivery was really fast too!
 *         rating:
 *           type: integer
 *           description: The rating between 1 and 5
 *           example: 4
*         productId:
 *           type: integer
 *           description: The product included in the order
 *           example: 28
 *         userId:
 *           type: integer
 *           description: The user that placed the order
 *           example: 6
 */

// Import packages
import express from 'express';

// Import custom packages
import * as categoryController from '../controllers/category.controller';
import * as productController from '../controllers/product.controller';
import * as promotionController from '../controllers/promotion.controller';
import * as orderController from '../controllers/order.controller';
import * as paymentController from '../controllers/payment.controller';
import * as reviewController from '../controllers/review.controller';
import * as userController from '../controllers/user.controller';
import * as profileController from '../controllers/profile.controller';

// Create router
const router = express.Router();

/*
Categories
*/
router.get('/categories', categoryController.getCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);
router.get('/categories/:categoryId/products', categoryController.getProductsByCategoryId);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

/*
Products
*/

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of all products
 *     tags:
 *       - product
 *     description:
 *     responses:
 *       200:
 *         description: Products found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Retrieve a specific product
 *     description: Retrieve a specific product.
 *     tags:
 *       - product
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: integer
 *         description: Product ID to return
 *         required: true
 *     responses:
 *       200:
 *         description: Product found!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/products/:productId', productController.getProductById);

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Retrieve all reviews from a specific product
 *     description: Retrieve all reviews from a specific product.
 *     tags:
 *       - product
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: integer
 *         description: Product ID to return
 *         required: true
 *     responses:
 *       200:
 *         description: Reviews found!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.get('/products/:productId/reviews', reviewController.getProductReviews);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     tags:
 *       - product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Super Bike 64
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: "This bike is amazing for riding in the city!"
 *               price:
 *                 type: float
 *                 description: The price of the product
 *                 example: 640.50
 *               color:
 *                 type: string
 *                 description: The color of the product
 *                 example: blue
 *               size:
 *                 type: string
 *                 description: the sizes available for the product
 *                 example: "[\"small\", \"medium\", \"large\"]"
 *     responses:
 *       201:
 *         description: Product successfully created!
 */
router.post('/products', productController.createProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update an existing product
 *     description: Update an existing product.
 *     tags:
 *       - product
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: integer
 *         description: The product that belongs to this productId will be updated
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Super Bike 64
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: "This bike is amazing for riding in the city!"
 *               price:
 *                 type: float
 *                 description: The price of the product
 *                 example: 640.50
 *               color:
 *                 type: string
 *                 description: The color of the product
 *                 example: blue
 *               size:
 *                 type: string
 *                 description: the sizes available for the product
 *                 example: "[\"small\", \"medium\", \"large\"]"
 *     responses:
 *       200:
 *         description: Product updated!
 */
router.put('/products/:productId', productController.updateProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete an existing product
 *     description:
 *     tags:
 *       - product
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: integer
 *         description: The product that belongs to this product ID will be deleted
 *         required: true
 *     responses:
 *       400:
 *         description: Invalid product ID!
 *       404:
 *         description: Product not found!
 */
router.delete('/products/:productId', productController.deleteProduct);

/*
Promotions
*/
router.get('/promotions', promotionController.getPromotions);
router.get('/promotions/:promotionId', promotionController.getPromotionById);
router.post('/promotions', promotionController.createPromotion);
router.put('/promotions/:promotionId', promotionController.updatePromotion);
router.delete('/promotions/:promotionId', promotionController.deletePromotion);

/*
Orders
*/

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of all orders
 *     tags:
 *       - order
 *     description:
 *     responses:
 *       200:
 *         description: Orders found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get('/orders', orderController.getOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Retrieve a specific order
 *     description: Retrieve a specific order.
 *     tags:
 *       - order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         type: integer
 *         description: Order ID to return
 *         required: true
 *     responses:
 *       200:
 *         description: Order found!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/orders/:orderId', orderController.getOrdersById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order.
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status of the order
 *                 example: shipped
 *               total:
 *                 type: float
 *                 description: The total price of the order
 *                 example: 2699.00
 *               userId:
 *                 type: integer
 *                 description: The user that placed the order.
 *                 example: 7
 *     responses:
 *       201:
 *         description: Order created!
 */
router.post('/orders', orderController.createOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update an existing order
 *     description: Update an existing order.
 *     tags:
 *       - order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         type: integer
 *         description: The order that belongs to this orderId will be updated
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status of the order
 *                 example: shipped
 *               total:
 *                 type: float
 *                 description: The total price of the order
 *                 example: 2699.00
 *               userId:
 *                 type: integer
 *                 description: The user that placed the order.
 *                 example: 7
 *     responses:
 *       200:
 *         description: Order updated!
 */
router.put('/orders/:orderId', orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete an existing order
 *     description:
 *     tags:
 *       - order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         type: integer
 *         description: The order that belongs to this order ID will be deleted
 *         required: true
 *     responses:
 *       400:
 *         description: Invalid order ID!
 *       404:
 *         description: Order not found!
 */
router.delete('/orders/:orderId', orderController.deleteOrder);

/**
 * @swagger
 * /api/orders/{orderId}/products:
 *   get:
 *     summary: Retrieve all products from a specific order
 *     description: Retrieve all products from a specific order.
 *     tags:
 *       - order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         type: integer
 *         description: Order ID used to return the products
 *         required: true
 *     responses:
 *       200:
 *         description: Products found!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/orders/:orderId/products', orderController.getProductsFromOrder);



/*
Payments
*/
router.get('/payments', paymentController.getPayments);
router.get('/payments/:paymentId', paymentController.getPaymentById);
router.post('/payments', paymentController.createPayment);
router.put('/payments/:paymentId', paymentController.updatePayment);
router.delete('/payments/:paymentId', paymentController.deletePayment);

/*
Reviews
*/

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Retrieve a list of all reviews
 *     tags:
 *       - review
 *     responses:
 *       200:
 *         description: Reviews found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
router.get('/reviews', reviewController.getReviews);

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   get:
 *     summary: Retrieve a specific review
 *     description: Retrieve a specific review.
 *     tags:
 *       - review
 *     parameters:
 *       - name: reviewId
 *         in: path
 *         type: integer
 *         description: Review ID to return
 *         required: true
 *     responses:
 *       200:
 *         description: Review found!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.get('/reviews/:reviewId', reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review.
 *     tags:
 *       - review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The review for the product
 *                 example: Couldn't be happier with this bike, the delivery was really fast too!
 *               rating:
 *                 type: integer
 *                 description: The rating between 1 and 5
 *                 example: 4
 *               productId:
 *                 type: integer
 *                 description: The product included in the order
 *                 example: 28
 *               userId:
 *                 type: integer
 *                 description: The user that placed the order
 *                 example: 6
 *     responses:
 *       201:
 *         description: Review successfully created!
 */
router.post('/reviews', reviewController.createReview);

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   put:
 *     summary: Update an existing review
 *     description: Update an existing review.
 *     tags:
 *       - review
 *     parameters:
 *       - name: reviewId
 *         in: path
 *         type: integer
 *         description: The review that belongs to this reviewId will be updated
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The review for the product
 *                 example: Couldn't be happier with this bike, the delivery was really fast too!
 *               rating:
 *                 type: integer
 *                 description: The rating between 1 and 5
 *                 example: 4
 *               productId:
 *                 type: integer
 *                 description: The product included in the order
 *                 example: 28
 *               userId:
 *                 type: integer
 *                 description: The user that placed the order
 *                 example: 6
 *     responses:
 *       200:
 *         description: Review updated!
 */
router.put('/reviews/:reviewId', reviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete an existing review
 *     description:
 *     tags:
 *       - review
 *     parameters:
 *       - name: reviewId
 *         in: path
 *         type: integer
 *         description: The review that belongs to this review ID will be deleted
 *         required: true
 *     responses:
 *       400:
 *         description: Invalid review ID!
 *       404:
 *         description: Review not found!
 */
router.delete('/reviews/:reviewId', reviewController.deleteReview);
router.get('/users/:userId/reviews', reviewController.getReviewsFromUser);
router.get('/product/:productId/reviews', reviewController.getReviewsFromProduct);

/*
Users
*/
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.get('/users/:userId/orders', orderController.getOrdersFromUser);
router.get('/users/:userId/profile', profileController.getProfileOfUser);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

/*
Profiles
*/
router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:profileId', profileController.getProfileById);
router.post('/users/:userId/profile', profileController.createProfile);
router.put('/users/:userId/profile/:profileId', profileController.updateProfile);
router.delete('/profiles/:profileId', profileController.deleteProfile);

// Export router
export default router;