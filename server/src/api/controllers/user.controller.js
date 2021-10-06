/**
 * User controller
 */
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils'

/* 
Get all users
*/
const getUsers = async (req, res, next) => {
	try {
		// Get users from database
		const users = await database.User.findAll();
		// Send response
		res.status(200).json(users);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Get a specific user 
*/
const getUserById = async (req, res, next) => {
	try {
		// Get user parameter
		const { userId } = req.params;
		// Get specific user from database
		const user = await database.User.findByPk(userId);

		if (user === null) {
			throw new HTTPError(`Could not found the category with id ${userId}!`, 404);
		}
		// Send response
		res.status(200).json(user);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Create a new user 
*/
const createUser = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.User.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Update an existing user 
*/
const updateUser = async (req, res, next) => {
	try {
		// Get userId parameter
		const { userId } = req.params;

		// Get specific user from database
		const user = await database.User.findByPk(userId);

		if (user === null) {
			throw new HTTPError(`Could not found the user with id ${userId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.User.update(model, {
			where: {
				id: userId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};


// Delete an existing user
const deleteUser = async (req, res, next) => {
	try {
		// Get userId parameter
		const { userId } = req.params;
		// Get specific user from database
		const user = await database.User.findByPk(userId);

		if (user === null) {
			throw new HTTPError(`Could not found the user with id ${userId}!`, 404);
		}

		// Delete a user with specified id
		const message = await database.User.destroy({
			where: {
				id: userId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
};
