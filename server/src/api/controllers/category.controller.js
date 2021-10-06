/**
 * Category controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

/*
Get all categories
*/
const getCategories = async (req, res, next) => {
	try {
		// Get categories from database
		const categories = await database.Category.findAll();
		// Send response
		res.status(200).json(categories);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific category by id
*/
const getCategoryById = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}
		// Send response
		res.status(200).json(category);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

const getProductsByCategoryId = async (req, res, next) => {
	try {
		 // Get categoryId parameter
		 const { categoryId } = req.params;
		 const products = await database.Category.findAll({
			 include: [{
				 model: database.Product,
				 through: 'CategoriesHasProducts',
			 }],
			 where: {
				 '$Products.CategoriesHasProducts.categoryId$': categoryId
			 }
		 });
 
		 // Send response
		 res.status(200).json(products);
	 } catch (error) {
		 handleHTTPError(error, next);
	 }
 };

/*
Create a new category
*/
const createCategory = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Category.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an existing category
*/
const updateCategory = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		console.log(categoryId);
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Category.update(model, {
			where: {
				id: categoryId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an existing category
*/
const deleteCategory = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Category.destroy({
			where: {
				id: categoryId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
	getProductsByCategoryId,
  updateCategory,
};
