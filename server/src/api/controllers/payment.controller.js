/**
 * Payment controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

/*
Get all payments
*/
const getPayments = async (req, res, next) => {
  try {
      // Get payments from database
      const payments = await database.Payment.findAll();
      // Send response
      res.status(200).json(payments);
  } catch (error) {
      handleHTTPError(error, next);
  }
};

/*
Get a specific payment by id
*/
const getPaymentById = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific payment from database
		const payment = await database.Payment.findByPk(paymentId);

		if (payment === null) {
			throw new HTTPError(`Could not found the payment with id ${paymentId}!`, 404);
		}
		// Send response
		res.status(200).json(payment);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new payment
*/
const createPayment = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a payment
		const createdModel = await database.Payment.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an existing payment
*/
const updatePayment = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;

		// Get specific payment from database
		const payment = await database.Payment.findByPk(paymentId);

		if (payment === null) {
			throw new HTTPError(`Could not found the payment with id ${paymentId}!`, 404);
		}

		// Update a specific payment
		const model = req.body;
		const updatedPost = await database.Payment.update(model, {
			where: {
				id: paymentId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an existing payment
*/
const deletePayment = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific payment from database
		const payment = await database.Payment.findByPk(paymentId);

		if (payment === null) {
			throw new HTTPError(`Could not found the payment with id ${paymentId}!`, 404);
		}

		// Delete a payment with specified id
		const message = await database.Payment.destroy({
			where: {
				id: paymentId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createPayment,
  deletePayment,
  getPaymentById,
  getPayments,
  updatePayment,
};