/**
 * Promotion model 
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Promotion extends Model {
		static associate(models) {
			this.belongsTo(models.Product, { foreignKey: 'productId' });
		}
	}

	Promotion.init(
		{
			description: DataTypes.STRING,
			newPrice: DataTypes.FLOAT,
			from: DataTypes.INTEGER,
      to: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Promotion',
		},
	);

	return Promotion;
};
