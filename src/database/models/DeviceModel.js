module.exports = (sequelize, dataTypes) => {
    const DeviceModel = sequelize.define('deviceModels', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        vendor: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        model: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        numberOfSlots: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })
    DeviceModel.associate = function(models) {
        DeviceModel.hasMany(models.devices, {
            as: "deviceModels",
            foreignKey: "modelsId"
        })
    }
    return DeviceModel;
}