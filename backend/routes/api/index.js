const router = require('express').Router();

router.use('/membros', require('./membros'));
router.use('/admin', require('./administradores'));
router.use('/grupos', require('./grupos'));
router.use('/grupoMembro', require('./grupoMembro'));
router.use('/materiais', require('./materiais'));
router.use('/compraMateriais', require('./compraMateriais'));
router.use('/musicas', require('./musicas'));
router.use('/apresentacoes', require('./apresentacoes'));

module.exports = router;
