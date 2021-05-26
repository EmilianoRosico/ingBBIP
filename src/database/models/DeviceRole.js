module.exports = (sequelize, dataTypes) => {
    const DeviceRole = sequelize.define('deviceRoles', {
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
    DeviceRole.associate = function(models) {
        DeviceRole.hasMany(models.devices, {
                as: "devices",
                foreignKey: "roleId"
            }),
            DeviceRole.hasMany(models.versions, {
                as: "versions",
                foreignKey: "forRoleId"
            })
    }
    return DeviceRole;
}