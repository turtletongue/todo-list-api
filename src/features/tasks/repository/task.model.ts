import { DataTypes } from 'sequelize';

import { TaskStatus } from '../entity/task-status.enum';

import { sequelize } from '@dependencies';

export const TaskModel = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[TaskStatus.inProgress, TaskStatus.done]],
    },
  },
  isEditedByAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
