/**
 * Profile model 
 */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Profile extends Model {
  static associate(models) {
    this.hasOne(models.User, {
      foreignKey: 'profileId'
    });
  }
  }

  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      birthday: DataTypes.INTEGER,
      tel: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
 