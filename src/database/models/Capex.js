module.exports = (sequelize, dataTypes) => {
    const Capex = sequelize.define('capexs', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        solicitante: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        areaSolicitante: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        requerimiento: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        tituloProyecto: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        cellId: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        redundancia: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        bandwidth: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        puertosElectricos: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        puertosOpticos1gb: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        puertosOpticos10gb: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        puertosOpticos100gb: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        fechaObjetivo:{
            type: dataTypes.DATE,
            allowNull: false
        },
        comentarios: {
            type: dataTypes.STRING(450),
            allowNull: true
        },
        createdAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        updatedAt: { type: dataTypes.DATE, defaultValue: dataTypes.NOW },
        deletedAt: { type: dataTypes.DATE },
    }, {
        paranoid: true,
    })

    return Capex;
}