/**
 * Order model
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
			this.belongsToMany(models.Product, { 
				through: 'OrdersHasProducts',
				foreignKey: 'orderId',
			});
			this.hasOne(models.Payment, { foreignKey: 'orderId' });
		}
	}

	Order.init(
		{
			status: DataTypes.STRING,
      total: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: 'Order',
		},
	);

	return Order;
};
