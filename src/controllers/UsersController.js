const Companies = require('../models/Companies');
const User = require('../models/Users') ;

const Yup = require('yup') ;
const Assets = require('../models/Assets') ;

class UsersController {
  async index(req, res){
    const { company_id: _id } = req.params;

    const users = await User.find().where({ company: _id });

    return res.status(200).json(users)
  }
  async store(req, res){
    const { company_id:  _id } = req.params;
    const data = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string().required(),
    });

    const company = await Companies.findById(_id);

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const user = await User.create({...data, company: _id});

    company.users.push(user._id);

    await company.save();

    return res.status(200).json(user);
  }
  async update(req, res){
    const { _id } = req.params;
    const data = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string().required(),
    });

    const user = await User.findById(_id);

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const { ok } = await user.updateOne(data);

    return res.status(200).json(ok)
  }
  async destroy(req, res){
    const { _id } = req.params;

    const verify = await Assets.find().where({ responsible: _id });

    if(verify.length > 0){
      return res.status(400).json({ error: 'Usuário não pode ser excluido, pois é responsável por um ativo'})
    }

    const user = await User.findById(_id);

    await user.deleteOne();

    return res.status(200).send()
  }
}

module.exports = new UsersController();