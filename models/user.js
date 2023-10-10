//user테이블 정의
const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'User', //시퀄라이즈에서 사용하는 이름
    {
      userinfo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_country: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_salt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
