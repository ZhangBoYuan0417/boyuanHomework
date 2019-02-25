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
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    sendId: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    getTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    getId: {
      type: DataTypes.CHAR(128),
      allowNull: true
    },
    orderType: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    money: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    from: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    to: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    boxType: {
      type: DataTypes.CHAR(128),
      allowNull: false
    }
  }, {
    tableName: 'orderinfo'
  });
};
