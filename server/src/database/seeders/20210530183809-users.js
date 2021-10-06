import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const generateUsers = (n = 10) => {
	const users = [];
	
	for (let i = 0; i < n; i++) {
		const user = {
			userName: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		users.push(user);
	}
	return users;
}

module.exports = {
  up: async (queryInterface) => {
		// Seed the users
    await queryInterface.bulkInsert('Users',
      generateUsers(40),
		);
  },
	
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};