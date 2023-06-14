//essayview 페이지에 사용되는 DetailEssay 데이터베이스
const DetailEssay = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "DetailEssay", //시퀄라이즈에서 사용하는 이름
    {
      idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      F_route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
      },
      detail_Etitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      detail_Ecomment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      detail_city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      detail_day: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      regdate: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          // 날짜를 숫자 형식으로 포맷팅하여 반환
          const date = this.getDataValue("regdate");
          return date ? date.getTime() : null;
        },
      },
      hit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "detail_essay",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
module.exports = DetailEssay;
