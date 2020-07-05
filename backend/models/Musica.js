const Sequelize = require('sequelize');
const db = require('../config/database');

const Musica = db.define('musica', {
  nome: {
    type: Sequelize.STRING,
  },
  descricao: {
    type: Sequelize.STRING,
  },
  formacao: {
    type: Sequelize.INTEGER,
  },
  tempo: {
    type: Sequelize.TIME,
  },
  qtdInstrumentos: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Musica;
