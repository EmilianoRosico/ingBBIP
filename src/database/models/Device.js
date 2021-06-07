module.exports = (sequelize, dataTypes) => {
    const Device = sequelize.define('devices', {
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
        status: {
            type: dataTypes.STRING(150),
            allowNull: false

        },
        nsoLicense: {
            type: dataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
        },
        ipMgmt: {
            type: dataTypes.STRING(150),
            allowNull: true,
        },
        ipIgp: {
            type: dataTypes.STRING(150),
            allowNull: true,
        },
        room: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        row: {
            type: dataTypes.STRING(2),
            allowNull: true,
        },
        rack: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        rackUnit: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        hierarchy: {
            type: dataTypes.STRING(150),
            allowNull: false,
        },
        virtual: {
            type: dataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
        },
        VersionId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        nodesId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        modelsId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        roleId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        createdAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATEONLY },
    }, {
        paranoid: true,
    })
    Device.associate = function(models) {
        Device.belongsTo(models.devicemodels, {
                as: "devicemodels",
                foreignKey: "modelsId"
            }),
            Device.belongsTo(models.deviceroles, {
                as: "deviceroles",
                foreignKey: "roleId"
            }),
            Device.belongsTo(models.nodes, {
                as: "nodes",
                foreignKey: "nodesId"
            })
    }
    return Device;
}