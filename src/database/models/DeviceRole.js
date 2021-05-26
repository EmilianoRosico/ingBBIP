module.exports = (sequelize, dataTypes) => {
    const DeviceRole = sequelize.define('DeviceRoles', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })
    DeviceRole.associate = function (models) {
        DeviceRole.hasMany(models.Devices, {
            as: "Devices",
            foreignKey: "roleId"
        }),
        DeviceRole.hasMany(models.Versions, {
            as: "Versions",
            foreignKey: "forRoleId"
        })
    }
    return DeviceRole;
}