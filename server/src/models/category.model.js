/**
 * Payment model
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { 
				through: 'CategoriesHasProducts', 
				foreignKey: 'categoryId',
			});
		}
	}

	Category.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			color: DataTypes.STRING,
			image: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};
