/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suginfo', {
    engname: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    type: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    latlng: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false
    }
  }, {
    tableName: 'suginfo'
  });
};
