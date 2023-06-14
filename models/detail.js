//루트상세페이지 모델
const detail = function (Sequelize, DataTypes) {
    const Detail = Sequelize.define(
        'detail',
        {
            detail_route_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            detail_comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },

        },
        {
            tableName: 'detail',
            freezeTableName: true,
            timestamps: false
        }
    );

    return Detail;
}

module.exports = detail;