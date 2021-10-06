/**
 * User model 
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
			this.belongsTo(models.Profile, { foreignKey: 'profileId' });
			this.hasMany(models.Order, {
				foreignKey: 'userId'
			});
			this.hasMany(models.Payment, {
				foreignKey: 'userId'
			});
			this.hasMany(models.Review, {
				foreignKey: 'userId'
			});
		}
	}

	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
      email: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);

	return User;
};
