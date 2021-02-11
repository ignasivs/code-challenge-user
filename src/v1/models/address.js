export default function(sequelize, Sequelize) {
  const Address = sequelize.define(
    "address",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true }
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "address"
    }
  );

  Address.associate = models => {
    Address.hasMany(models.user, {
      as: "address"
    });
  };

  return Address;
}
