const userOccasion = (sequelize, DataTypes) => {
  const UserOccasion = sequelize.define(
    "user_occasion",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      occasion_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      rsvp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      number_of_members: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      tableName: "user_occassion",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true
    }
  );

  UserOccasion.associate = models => {
    UserOccasion.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    UserOccasion.belongsTo(models.Occasion, {
      foreignKey: "occasion_id"
    });
  };

  return UserOccasion;
};

export default userOccasion;
