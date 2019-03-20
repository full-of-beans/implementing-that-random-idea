const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Occasion, {
      as: "occasions",
      through: {
        model: models.UserOccasion,
        unique: false
      },
      foreignKey: "user_id"
    });
  };

  return User;
};

export default user;
