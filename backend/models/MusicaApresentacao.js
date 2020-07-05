const Sequelize = require('sequelize');
const db = require('../config/database');

const MusicaApresentacao = db.define(
  'musica_apresentacao',
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
    apresentacao_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      references: {
        model: 'apresentacao',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MusicaApresentacao;
