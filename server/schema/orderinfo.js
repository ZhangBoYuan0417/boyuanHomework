/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderinfo', {
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sendTime: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sendId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    getTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    getId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'orderinfo'
  });
};
