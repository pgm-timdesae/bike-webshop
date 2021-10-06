import 'babel-polyfill';
import faker from 'faker';
import _ from 'underscore';

import database from '../index';

database.connect();

module.exports = {
	up: async (queryInterface) => {
		// Get all the existing ids from the Users table
		let userIds = await queryInterface.sequelize.query(
			`SELECT id from Users`
		)
		userIds = userIds[0];

		// Get all the existing ids from the Users table
		let productIds = await queryInterface.sequelize.query(
			`SELECT id from Products`
		)
		productIds = productIds[0];

		/*
		Seed the reviews
		*/
		const reviews = [];

		// Set the amount of orders you want to seed
		const n = 80;

		// Generate the reviews
		for (let i = 0; i < n; i++) {
			reviews.push({
				text: faker.lorem.sentence(),
				rating: _.random(1, 5),
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: _.sample(userIds).id,
				productId: _.sample(productIds).id
			});
		}

		// Insert in the database table
		await queryInterface.bulkInsert('Reviews',
			reviews,
		);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};