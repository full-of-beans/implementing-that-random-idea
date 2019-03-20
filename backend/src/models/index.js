import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres"
  }
);

const models = {
  User: sequelize.import("./User"),
  Occasion: sequelize.import("./Occasion"),
  UserOccasion: sequelize.import("./UserOccasion.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
