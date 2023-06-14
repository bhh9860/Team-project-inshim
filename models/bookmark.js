//즐겨찾기 모델
const bookmark = function (Sequelize, DataTypes) {
    const Bookmark = Sequelize.define(
        'bookmark',
        {
            F_userinfo_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            F_route_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'bookmark',
            freezeTableName: true,
            timestamps: false
        }
    );

    return Bookmark;
}

module.exports = bookmark;