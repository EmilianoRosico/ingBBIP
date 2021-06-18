module.exports = (sequelize, dataTypes) => {
    const Vlans = sequelize.define('vlans', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        editedByUser: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        deviceVlanId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        vlan: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(150),
            allowNull: true,
        },
        createdAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATEONLY, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATEONLY },
    }, {
        paranoid: true,
    })
    Vlans.associate = function(models) {
        Vlans.belongsTo(models.devices, {
            as: "devicevlans",
            foreignKey: "deviceVlanId"
        })
    }
    return Vlans;
}