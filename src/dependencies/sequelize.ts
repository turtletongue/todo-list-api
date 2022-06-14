import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_CONNECTION as string);

export const databaseConnection = (async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync();

    console.log('Database connection has been established successfully');
  } catch (error) {
    console.log('Unable to connect to the database:', error);

    throw error;
  }
})();
