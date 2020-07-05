const Sequelize = require('sequelize');
const db = require('../config/database');

const Apresentacao = db.define(
  'apresentacao',
  {
    data: {
      type: Sequelize.DATE,
    },
    horario: {
      type: Sequelize.TIME,
    },
    local: {
      type: Sequelize.STRING(50),
    },
    tempo: {
      type: Sequelize.TIME,
    },
  },
  {
    tableName: 'apresentacoes',
  }
);

module.exports = Apresentacao;
