const UsuarioModel = require('../model/UsuarioModel');

class UsuarioController {

  async registrar(req, res) {
    const { name, email, cpf, gender, password } = req.body;
    try {
      if (await UsuarioModel.findOne({ email })) {
        return res.status(400).json({ error: "E-mail já registrado" });
      }
      else if (await UsuarioModel.findOne({ cpf })) {
        return res.status(400).json({ error: "Cpf já registrado" });
      }

      const user = new UsuarioModel(req.body);
      await user.save()
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        })
    }
    catch (err) {
      return res.status(400).json({ error: "Erro ao cadastrar um usuario" });
    }
  }

  async autenticar(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UsuarioModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Usuario não encontrado" });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: "Senha invalida" });
      }

      return res.json({
        token: user.generateToken()
      });
    }
    catch (err) {
      return res.status(400).json({ error: "Ocorreu um erro na autenticação - " + err });
    }
  }
  async eu(req, res) {
    try {
      const { userId } = req;
      
      return res.json({ userId });
    }
    catch (err) {
      return res.status(400).json({ error: "Não foi possivel recuperar as informações do usuario" });
    }
  }
};

module.exports = new UsuarioController();
