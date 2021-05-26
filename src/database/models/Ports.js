module.exports = (sequelize, dataTypes) => {
    const Ports = sequelize.define('ports', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        deviceId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        slot: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        subSlot: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        port: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        boardModule: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        license: {
            type: dataTypes.INTEGER(1),
            allowNull: false,
            default: 0
        },
        status: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        project: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        espejado: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        clientSide: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        editedByUser: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        createdAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATEONLY },
    }, {
        paranoid: true,
    })
    Ports.associate = function(models) {
        Ports.belongsTo(models.devices, {
            as: "devicePorts",
            foreignKey: "deviceId"
        })
    }
    return Ports;
}