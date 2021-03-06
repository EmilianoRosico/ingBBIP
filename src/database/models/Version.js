module.exports = (sequelize, dataTypes) => {
    const Version = sequelize.define('versions', {
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
        servicePack: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        smuPatch: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        psrrLink: {
            type: dataTypes.STRING(250),
            allowNull: true
        },
        forRoleId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        forModelId: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })
    Version.associate = function(models) {
        Version.belongsTo(models.deviceroles, {
                as: "versiontorole",
                foreignKey: "forRoleId"
            }),
            Version.belongsTo(models.devicemodels, {
                as: "versiondevicemodels",
                foreignKey: "forModelId"
            })
    }
    return Version;
}