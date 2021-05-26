module.exports = (sequelize, dataTypes) => {
    const Node = sequelize.define('Nodes', {
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
        cellId: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        province: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        country: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        totalRooms: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })
    Node.associate = function (models) {
        Node.hasMany(models.Devices, {
            as: "Nodes",
            foreignKey: "nodesId"
        })
    }
    return Node;
}