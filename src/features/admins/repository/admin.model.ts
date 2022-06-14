import { DataTypes } from 'sequelize';

import { sequelize } from '@dependencies';

export const AdminModel = sequelize.define('Admin', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
