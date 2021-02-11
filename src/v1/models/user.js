module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true }
      },
      name: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      birthDate: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "user"
    }
  );

  User.associate = models => {
    User.belongsTo(models.address, {
      as: "address"
    });
  };

  return User;
};
