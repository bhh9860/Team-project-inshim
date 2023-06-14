//user테이블 정의
const Route = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Route", //시퀄라이즈에서 사용하는 이름
    {
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      route_city: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      route_day: {
        type: DataTypes.STRING(20),
        allowNull: false,
      }
    },
    {
      tableName: "route",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
module.exports = Route;
