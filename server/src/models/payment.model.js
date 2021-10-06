/**
 * Payment model
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Payment extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
			this.belongsTo(models.Order, { foreignKey: 'orderId' });
		}
	}

	Payment.init(
		{
			method: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Payment',
		},
	);

	return Payment;
};
