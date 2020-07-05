const Sequelize = require('sequelize');
const db = require('../config/database');

const MusicaGrupo = db.define(
  'musica_grupo',
  {
    musica_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      references: {
        model: 'musica',
        key: 'id',
      },
    },
    grupo_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      references: {
        model: 'grupo',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MusicaGrupo;
