/**
 * Profile controller
 */
import database from '../../database';
import { handleHTTPError } from '../../utils';

/*
Get all profiles
*/
const getProfiles = async (req, res, next) => {
	try {
		// Get profiles from database
		const profiles = await database.Profile.findAll();
		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get the profile of a specific user
*/
const getProfileOfUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// Get profiles from database
		const profiles = await database.Profile.findAll({
			where: {
				userId: userId
			}
		});
		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile
*/
const getProfileById = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findAll({
			where: {
				id: profileId,
			},
		});
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Create a new profile 
*/
const createProfile = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Profile.create(model, {
			where: {
				UserId: userId
			}
		});
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Update an existing profile 
*/
const updateProfile = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId, userId } = req.params;

		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId);

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Profile.update(model, {
			where: {
				id: profileId,
				userId: userId
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/* 
Delete an existing profile 
*/
const deleteProfile = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId);

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Delete a profile with specified id
		const message = await database.Profile.destroy({
			where: {
				id: profileId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
  createProfile,
  deleteProfile,
  getProfileById,
	getProfileOfUser,
  getProfiles,
  updateProfile,
};
