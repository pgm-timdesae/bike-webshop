/**
 * Product controller
 */
import database from '../../database';
import { convertArrayToPagedObject, handleHTTPError, HTTPError } from '../../utils';

 /* 
 Get all Products 
 */
 const getProducts = async (req, res, next) => {
  try {
    // Get query parameters
    const { itemsPerPage, currentPage } = req.query;

    // Get categories from database
    let products = null;
    if (itemsPerPage && currentPage) {
      products = await database.Product.findAll({
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      });
      products = convertArrayToPagedObject(products, itemsPerPage, currentPage, await database.Product.count());
    } else {
      products = await database.Product.findAll();
    }

    if (!products || products.length === 0) {
      throw new HTTPError('Could not found products!', 404);
    }

    // Send response
    res.status(200).json(products);
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/* 
Get a specific product 
*/
const getProductById = async (req, res, next) => {
	try {
		// Get product parameter
		const { productId } = req.params;
		// Get specific product from database
		const product = await database.Product.findByPk(productId);

		if (product === null) {
			throw new HTTPError(`Could not find the product with id ${productId}!`, 404);
		}
		// Send response
		res.status(200).json(product);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Create a new product 
*/
const createProduct = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Product.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Update an existing product 
*/
const updateProduct = async (req, res, next) => {
	try {
		// Get productId parameter
		const { productId } = req.params;

		// Get specific product from database
		const product = await database.Product.findByPk(productId);

		if (product === null) {
			throw new HTTPError(`Could not find the product with id ${productId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Product.update(model, {
			where: {
				id: productId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Delete an existing product 
*/
const deleteProduct = async (req, res, next) => {
	try {
		// Get productId parameter
		const { productId } = req.params;
		// Get specific product from database
		const product = await database.Product.findByPk(productId);

		if (product === null) {
			throw new HTTPError(`Could not found the product with id ${productId}!`, 404);
		}

		// Delete a product with specified id
		const message = await database.Product.destroy({
			where: {
				id: productId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
};