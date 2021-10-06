import 'babel-polyfill';
import faker from 'faker';
import _ from 'underscore';

import database from '../index';

database.connect();

const generateProducts = (n = 5) => {
  const products = [];
  const sizes = ['small', 'medium', 'large'];
  
  for (let i = 0; i < n; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: _.random(299, 1899),
      color: faker.commerce.color(),
      size: JSON.stringify(sizes),
      description: faker.commerce.productDescription(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  
    products.push(product);
  }
  return products;
}

module.exports = {
  up: async (queryInterface) => {
    // Seed the products
    await queryInterface.bulkInsert('Products', 
      generateProducts(100),
    );
    
    // Get the existing ids from the Products table
    let productIds = await queryInterface.sequelize.query(
      `SELECT id from Products`
    )
    productIds = productIds[0];
    
    // Get the existing ids from the Categories table
    let categoryIds = await queryInterface.sequelize.query(
      `SELECT id from Categories;`
    );
    categoryIds = categoryIds[0];

    /*
    Seed the association table
    */
    let productsHasCategories = []

    for (let i = 0; i < productIds.length; i++) {
      let categories = JSON.parse(JSON.stringify(categoryIds));
      const randomNumber = Math.round(Math.random() * 5) + 1;

      for (let j = 0; j < randomNumber; j++) {
        const categoryIndex = Math.floor(Math.random() * categories.length);
        const category = categories.splice(categoryIndex, 1);

        productsHasCategories.push({
          productId: productIds[i].id,
          categoryId: category[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
          });
      }
    };

    await queryInterface.bulkInsert('CategoriesHasProducts',
      productsHasCategories,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};