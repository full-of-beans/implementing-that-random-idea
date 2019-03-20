const occasion = (sequelize, DataTypes) => {
  const Occasion = sequelize.define(
    "occasion",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      rsvp_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "occasions",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true
    }
  );

  Occasion.associate = models => {
    Occasion.belongsToMany(models.User, {
      as: "users",
      through: {
        model: models.UserOccasion,
        unique: false
      },
      foreignKey: "occasion_id"
    });
  };
};

export default occasion;
