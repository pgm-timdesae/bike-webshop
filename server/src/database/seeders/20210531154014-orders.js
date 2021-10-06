import 'babel-polyfill';
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

		/*
		Seed the orders
		*/
		const orders = [];

		// Set the amount of orders you want to seed
		const n = 80;

		for (let i = 0; i < n; i++) {
			const statusArr = ['cart', 'ordered', 'shipped', 'delivered'];
			const randomStatus = statusArr[Math.floor(Math.random() * statusArr.length)]

			orders.push({
				status: randomStatus,
				total: _.random(299, 4899),
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: _.sample(userIds).id
			});
		}

		await queryInterface.bulkInsert('Orders',
			orders,
		);
		
		// Get the existing ids from the Orders table
		let orderIds = await queryInterface.sequelize.query(
			`SELECT id from Orders;`
		);
		orderIds = orderIds[0];

		// Get the existing ids from the Products table
		let productIds = await queryInterface.sequelize.query(
			`SELECT id from Products`
		)
		productIds = productIds[0];

		/*
		Seed the association table
		*/
    let ordersHasProducts = []

    for (let i = 0; i < orderIds.length; i++) {
      let products = JSON.parse(JSON.stringify(productIds));
			const randomNumber = Math.round(Math.random() * 5) + 1;

      for (let j = 0; j < randomNumber; j++) {
        const productIndex = Math.floor(Math.random() * products.length);
        const product = products.splice(productIndex, 1);

				ordersHasProducts.push({
					orderId: orderIds[i].id,
					productId: product[0].id,
					createdAt: new Date(),
					updatedAt: new Date()
				});
      }
    };
		
		await queryInterface.bulkInsert('OrdersHasProducts',
      ordersHasProducts,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};