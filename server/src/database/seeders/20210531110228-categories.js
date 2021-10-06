import 'babel-polyfill';

import database from '../index';

database.connect();

module.exports = {
  up: async (queryInterface) => {
    // Seed the categories
    await queryInterface.bulkInsert('Categories', [
      {
        name: "Electric",
        description: "Electric bikes amplify your pedaling power and your ability to do and see more. They're quick and smooth, with predictable, easy-to-control power and a long-lasting removable battery that recharges at any household outlet.",
        color: "blue",
        image: "electric.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "City",
        description: "A bicycle designed for frequent short, moderately paced rides through relatively flat urban areas. It is a form of utility bicycle commonly seen around the world, built to facilitate everyday riding in normal clothes in a variety of weather conditions.",
        color: "blue",
        image: "city.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Women's",
        description: "Our women’s models have touchpoints like saddles and handlebars that can provide a better fit and feel to some women from the start. Every model is held to the same high standard of comfort and performance.",
        color: "pink",
        image: "womens.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mountain",
        description: "Mountain bikes share some similarities with other bicycles, but incorporate features designed to enhance durability and performance in rough terrain, which makes them heavy.",
        color: "green",
        image: "mountain.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "BMX",
        description: "Though originally denoting a bicycle intended for BMX racing, the term \"BMX bike\" is now used to encompass race bikes, as well as those used for the dirt, vert, park, street, flatland and BMX freestyle disciplines of BMX.",
        color: "brown",
        image: "bmx.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Racing",
        description: "The most important characteristics about a racing bicycle are its weight and stiffness which determine the efficiency at which the power from a rider's pedal strokes can be transferred to the drive-train and subsequently to its wheels.",
        color: "blue",
        image: "racing.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Trail",
        description: "They're versatile, light, and exceedingly capable, climbing as well as they descend, conquering trails from the Dolomites to Durango. No other bikes offer this level of no-compromise performance, any-situation versatility.",
        color: "brown",
        image: "trail.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cyclo-cross",
        description: "Specifically designed for the rigors of a cyclo-cross race. Cyclo-cross bicycles roughly resemble the racing bicycles used in road racing. The major differences between the two are the frame geometry, and the wider clearances that cyclo-cross bikes have for their larger tires and mud and other debris that they accumulate.",
        color: "green",
        image: "cyclo_cross.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gravel",
        description: "Gravel bikes, sometimes also referred to as adventure bikes, are essentially road bikes designed to tackle a variety of surfaces, carry additional gear and are suitable for all-day riding on roads less traveled.",
        color: "brown",
        image: "gravel.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kids'",
        description: "Remember your first bike? The sense of freedom and adventure? The thrill of moving faster than your feet could carry you? We want every kid to have a great first-bike experience, and a great experience with every bike after that.",
        color: "pink",
        image: "kids.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};