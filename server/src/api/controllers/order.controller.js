/**
 * Order controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

/*
Get all orders
*/
const getOrders = async (req, res, next) => {
  try {
      // Get orders from database
      const orders = await database.Order.findAll();
      // Send response
      res.status(200).json(orders);
  } catch (error) {
      handleHTTPError(error, next);
  }
};

/*
Get all orders from a user
*/
const getOrdersFromUser = async (req, res, next) => {
  try {
			const { userId } = req.params;
      const orders = await database.Order.findAll({
				where: {
					userId: userId
				}
			});
      // Send response
      res.status(200).json(orders);
  } catch (error) {
      handleHTTPError(error, next);
  }
};

/*
Get a specific order by id
*/
const getOrdersById = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}
		// Send response
		res.status(200).json(order);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get all the products from an order
*/
const getProductsFromOrder = async (req, res, next) => {
	try {
		// Get categoryId parameter
    const { orderId } = req.params;
    // Get all products with categoryId
 
    console.log(orderId);
 
		const products = await database.Order.findAll({
      include: [{
        model: database.Product,
        through: 'OrdersHasProducts',
      }],
      where: {
        '$Products.OrdersHasProducts.orderId$': orderId
      }
    });

		// Send response
		res.status(200).json(products);
	} catch (error) {
		handleHTTPError(error, next);
	}
}

/*
Create a new order
*/
const createOrder = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create an order
		const createdModel = await database.Order.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an existing order
*/
const updateOrder = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;

		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedPost = await database.Order.update(model, {
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an existing order
*/
const deleteOrder = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Delete a order with specified id
		const message = await database.Order.destroy({
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createOrder,
  deleteOrder,
  getOrdersById,
  getOrders,
  getOrdersFromUser,
	getProductsFromOrder,
  updateOrder,
};
