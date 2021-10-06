/**
 * Product model
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			this.belongsToMany(models.Category, { 
				through: 'CategoriesHasProducts',
				foreignKey: 'productId',
			});
			this.belongsToMany(models.Order, { 
				through: 'OrdersHasProducts',
				foreignKey: 'productId',
			});
			this.hasMany(models.Review, {
				as: 'reviews',
				foreignKey: 'productId'
			});
			this.hasOne(models.Promotion, { foreignKey: 'productId' });
		}
	}

	Product.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Product',
		},
	);

	return Product;
};
