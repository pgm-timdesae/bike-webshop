/**
 * Review controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

/*
Get all reviews
*/
const getReviews = async (req, res, next) => {
	try {
		// Get review from database
		const reviews = await database.Review.findAll();
		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get all reviews of a product
*/
const getProductReviews = async (req, res, next) => {
	try {
		const { productId } = req.params;
		// Get review from database
		const reviews = await database.Review.findAll({
			where: {
				productId: productId
			}
		});
		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific review
*/
const getReviewById = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;
		// Get specific review from database
		const review = await database.Review.findAll({
			where: {
				id: reviewId,
			},
		});
		// Send response
		res.status(200).json(review);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get all reviews from a user
*/
const getReviewsFromUser = async (req, res, next) => {
  try {
			const { userId } = req.params;
      const reviews = await database.Review.findAll({
				where: {
					userId: userId
				}
			});
      // Send response
      res.status(200).json(reviews);
  } catch (error) {
      handleHTTPError(error, next);
  }
};

/*
Get all reviews from a user
*/
const getReviewsFromProduct = async (req, res, next) => {
  try {
			const { productId } = req.params;
      const reviews = await database.Review.findAll({
				where: {
					productId: productId
				}
			});
      // Send response
      res.status(200).json(reviews);
  } catch (error) {
      handleHTTPError(error, next);
  }
};

/* 
Create a new review 
*/
const createReview = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Review.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Update an existing review 
*/
const updateReview = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;

		// Get specific review from database
		const review = await database.Review.findByPk(reviewId);

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${reviewId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Review.update(model, {
			where: {
				id: reviewId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Delete an existing review 
*/
const deleteReview = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;
		// Get specific review from database
		const review = await database.Review.findByPk(reviewId);

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${reviewId}!`, 404);
		}

		// Delete a review with specified id
		const message = await database.Review.destroy({
			where: {
				id: reviewId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createReview,
  deleteReview,
	getProductReviews,
  getReviewById,
  getReviews,
	getReviewsFromProduct,
	getReviewsFromUser,
  updateReview,
};
