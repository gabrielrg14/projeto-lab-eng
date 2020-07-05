const express = require('express');
const router = express.Router();
const Musica = require('../../models/Musica');
const Grupo = require('../../models/Grupo');
const MusicaGrupo = require('../../models/MusicaGrupo');
const { ensureAuthenticated } = require('../../config/auth');

const findGroupOfMusics = musicas => {
  return musicas.map(async musica => {
    let musicaGrupo = await MusicaGrupo.findOne({
      where: { musica_id: musica.dataValues.id },
    });

    const { grupo_id } = musicaGrupo;

    const dadosGrupo = await Grupo.findOne({
      where: { id: grupo_id },
    });

    return { ...musica.dataValues, grupo: dadosGrupo.nome };
  });
};

// Get list of musics
router.get('/', ensureAuthenticated, async (req, res) => {
  let musicas = await Musica.findAll({
    order: [['createdAt', 'DESC']],
  });

  if (!musicas) {
    res.sendStatus(500);
  }

  musicas = findGroupOfMusics(musicas);

  Promise.all(musicas).then(responses => res.json(responses));
});

// Add a musica
router.post('/', ensureAuthenticated, (req, res) => {
  const { nome, descricao, tempo, qtdInstrumentos, grupoId } = req.body;

  if (!nome || !descricao || !tempo || !qtdInstrumentos || !grupoId) {
    return res.status(400).json({
      message:
        'Revise os parâmetros, é necessário um nome, descricao, tempo, qtdInstrumentos e grupoId',
    });
  }

  Musica.create({
    nome,
    descricao,
    tempo,
    formacao: 0, // por enquanto não há formação
    qtdInstrumentos,
  })
    .then(musica =>
      MusicaGrupo.create({
        musica_id: musica.id,
        grupo_id: grupoId,
      })
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        })
    )
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

// Edit a musica
router.put('/:musicaId', ensureAuthenticated, async (req, res) => {
  const { musicaId } = req.params;
  const { nome, descricao, tempo, qtdInstrumentos, grupoId } = req.body;
  let errors = [];

  if (!musicaId) {
    errors.push({ message: 'Informe o id de uma musica.' });
  }

  const musicaInformada = await Musica.findOne({ where: { id: musicaId } });

  if (!musicaInformada) {
    errors.push({ message: 'A musica informada não existe.' });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const updates = {
    nome: nome || musicaInformada.nome,
    descricao: descricao || musicaInformada.descricao,
    tempo: tempo || musicaInformada.tempo,
    qtdInstrumentos: qtdInstrumentos || musicaInformada.qtdInstrumentos,
  };

  await Musica.update({ ...updates }, { where: { id: musicaId } });

  if (grupoId) {
    await MusicaGrupo.update(
      { grupo_id: grupoId },
      { where: { musica_id: musicaId } }
    );
  }

  res.sendStatus(204);
});

// Delete a musica
router.delete('/:musicaId', ensureAuthenticated, async (req, res) => {
  const { musicaId } = req.params;
  let errors = [];

  if (!musicaId) {
    errors.push({ message: 'Informe o id de uma musica.' });
  }

  const musicaInformada = await Musica.findOne({ where: { id: musicaId } });

  if (!musicaInformada) {
    errors.push({ message: 'A musica informada não existe.' });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const deleteMusicaGrupo = await MusicaGrupo.destroy({
    where: {
      musica_id: musicaId,
    },
  });

  if (!deleteMusicaGrupo) {
    errors.push({ message: 'Erro ao excluir conexão entre grupo e musica.' });
    return res.status(500).json(errors);
  }

  const deleteMusica = await Musica.destroy({
    where: {
      id: musicaId,
    },
  });

  if (!deleteMusica) {
    errors.push({ message: 'Erro ao excluir musica.' });
    return res.status(500).json(errors);
  }

  return res.sendStatus(204);
});

module.exports = router;
