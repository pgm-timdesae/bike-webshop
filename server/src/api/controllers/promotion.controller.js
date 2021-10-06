/**
 * Promotion controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

/*
Get all promotions
*/
const getPromotions = async (req, res, next) => {
	try {
		// Get promotions from database
		const promotions = await database.Promotion.findAll();
		// Send response
		res.status(200).json(promotions);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific promotion
*/
const getPromotionById = async (req, res, next) => {
	try {
		// Get promotionId parameter
		const { promotionId } = req.params;
		// Get specific promotion from database
		const promotion = await database.Promotion.findAll({
			where: {
				id: promotionId,
			},
		});
		// Send response
		res.status(200).json(promotion);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Create a new promotion 
*/
const createPromotion = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Promotion.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Update an existing promotion 
*/
const updatePromotion = async (req, res, next) => {
	try {
		// Get promotionId parameter
		const { promotionId } = req.params;

		// Get specific promotion from database
		const promotion = await database.Promotion.findByPk(promotionId);

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${promotionId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Promotion.update(model, {
			where: {
				id: promotionId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Delete an existing promotion 
*/
const deletePromotion = async (req, res, next) => {
	try {
		// Get promotionId parameter
		const { promotionId } = req.params;
		// Get specific promotion from database
		const promotion = await database.Promotion.findByPk(promotionId);

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${promotionId}!`, 404);
		}

		// Delete a promotion with specified id
		const message = await database.Promotion.destroy({
			where: {
				id: promotionId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createPromotion,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
};
