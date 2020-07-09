const express = require('express');
const router = express.Router();
const Musica = require('../../models/Musica');
const Apresentacao = require('../../models/Apresentacao');
const MusicaApresentacao = require('../../models/MusicaApresentacao');
const { ensureAuthenticated } = require('../../config/auth');

const findMusicasOfApresentacoes = apresentacoes => {
  return apresentacoes.map(async apresentacao => {
    let musicas = await MusicaApresentacao.findAll({
      where: { apresentacao_id: apresentacao.dataValues.id },
    });

    musicas = musicas.map(musica => musica.musica_id);

    return { ...apresentacao.dataValues, musicas };
  });
};

// Get list of apresentacoes
router.get('/', ensureAuthenticated, async (req, res) => {
  let apresentacoes = await Apresentacao.findAll({
    order: [['createdAt', 'DESC']],
  });

  if (!apresentacoes) {
    res.sendStatus(500);
  }

  apresentacoes = findMusicasOfApresentacoes(apresentacoes);

  Promise.all(apresentacoes).then(responses => res.json(responses));
});

// Add an apresentacao
router.post('/', ensureAuthenticated, (req, res) => {
  const { data, horario, local, tempo, musicas } = req.body;

  if (!data || !horario || !tempo || !local || !musicas) {
    return res.status(400).json({
      message:
        'Revise os parâmetros, é necessário um data, horario, tempo, local e um array de ids de musicas',
    });
  }

  Apresentacao.create({
    data,
    horario,
    local,
    tempo,
  })
    .then(apresentacao => {
      const createMusicasApresentacao = musicas.map(musicaId =>
        MusicaApresentacao.create({
          apresentacao_id: apresentacao.id,
          musica_id: musicaId,
        })
      );

      Promise.all(createMusicasApresentacao)
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

// Edit a apresentacao
router.put('/:apresentacaoId', ensureAuthenticated, async (req, res) => {
  const { apresentacaoId } = req.params;
  const { data, horario, local, tempo, musicas } = req.body;
  let errors = [];

  if (!apresentacaoId) {
    errors.push({ message: 'Informe o id de uma apresentacao.' });
  }

  const apresentacaoInformada = await Apresentacao.findOne({
    where: { id: apresentacaoId },
  });

  if (!apresentacaoInformada) {
    errors.push({ message: 'A apresentacao informada não existe.' });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const updates = {
    data: data || apresentacaoInformada.data,
    horario: horario || apresentacaoInformada.horario,
    local: local || apresentacaoInformada.local,
    tempo: tempo || apresentacaoInformada.tempo,
  };

  await Apresentacao.update({ ...updates }, { where: { id: apresentacaoId } });

  if (musicas) {
    await MusicaApresentacao.destroy({
      where: { apresentacao_id: apresentacaoId },
    });

    const createMusicasApresentacao = musicas.map(musicaId =>
      MusicaApresentacao.create({
        apresentacao_id: apresentacaoId,
        musica_id: musicaId,
      })
    );

    return Promise.all(createMusicasApresentacao)
      .then(() => res.sendStatus(204))
      .catch(err => {
        console.log(err);
        return res.sendStatus(500);
      });
  }

  res.sendStatus(204);
});

// Delete a apresentacao
router.delete('/:apresentacaoId', ensureAuthenticated, async (req, res) => {
  const { apresentacaoId } = req.params;
  let errors = [];

  if (!apresentacaoId) {
    errors.push({ message: 'Informe o id de uma apresentacao.' });
  }

  const apresentacaoInformada = await Apresentacao.findOne({
    where: { id: apresentacaoId },
  });

  if (!apresentacaoInformada) {
    errors.push({ message: 'A apresentacao informada não existe.' });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const musicasDaApresentacao = await MusicaApresentacao.findAll({
    where: { apresentacao_id: apresentacaoId },
  });

  if (musicasDaApresentacao && musicasDaApresentacao.length > 0) {
    const deleteMusicaApresentacao = await MusicaApresentacao.destroy({
      where: { apresentacao_id: apresentacaoId },
    });

    if (!deleteMusicaApresentacao) {
      errors.push({
        message: 'Erro ao excluir conexão entre musica e apresentacao.',
      });
      return res.status(500).json(errors);
    }
  }

  const deleteApresentacao = await Apresentacao.destroy({
    where: {
      id: apresentacaoId,
    },
  });

  if (!deleteApresentacao) {
    errors.push({ message: 'Erro ao excluir apresentacao.' });
    return res.status(500).json(errors);
  }

  return res.sendStatus(204);
});

module.exports = router;
