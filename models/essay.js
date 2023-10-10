const User = require('./user');
const Route = require('./route');

// //user테이블 정의
// const Essay = (Sequelize, DataTypes) => {
//   return Sequelize.define(
//     "Essay", //시퀄라이즈에서 사용하는 이름
//     {
//       F_userinfo_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       essay_comment: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//       },
//       essay_day: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       esssay_star: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       F_route_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       essay_title: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "essay",
//       freezeTableName: true,
//       timestamps: false,
//     }
//   );

// };

// module.exports = Essay;

const Essay = (Sequelize, DataTypes) => {
  const EssayModel = Sequelize.define(
    'Essay',
    {
      F_userinfo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
      },
      essay_comment: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      essay_day: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      esssay_star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      F_route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      essay_title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'essay',
      freezeTableName: true,
      timestamps: false,
    }
  );

  EssayModel.associate = (models) => {
    EssayModel.belongsTo(models.User, {
      foreignKey: 'F_userinfo_id',
      targetKey: 'userinfo_id',
    });

    EssayModel.belongsTo(models.Route, {
      foreignKey: 'F_route_id',
      targetKey: 'route_id',
    });
  };

  return EssayModel;
};

module.exports = Essay;
