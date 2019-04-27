/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'userinfo'
  });
};
