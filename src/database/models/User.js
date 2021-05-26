module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })
    User.associate = function (models) {

    }
    return User;
}