/**
 * Review model 
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Review extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
			this.belongsTo(models.Product, { foreignKey: 'productId' });
		}
	}

	Review.init(
		{
			text: DataTypes.TEXT,
			rating: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Review',
		},
	);

	return Review;
};
