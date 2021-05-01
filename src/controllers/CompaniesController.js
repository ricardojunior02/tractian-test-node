const Companies = require('../models/Companies') ;
const Yup = require('yup');

class CompaniesController {
  async index(req, res){
    const companies = await Companies.find()
    .populate('units', 'name')
    .populate('users', 'name')

    return res.status(200).json(companies);
  }

  async show(req, res){
    const { _id } = req.params;

    const company = await Companies.findById(_id);

    return res.status(200).json(company);
  }

  async store(req, res){
    const data = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const company = await Companies.create(data);

    return res.status(201).json(company);
  }

  async update(req, res){
    const { _id } = req.params;
    const data = req.body;

    const company = await Companies.findById(_id);

    if(!company){
      return res.status(400).json({ error: 'Empresa não existe'})
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const { ok } = await company.updateOne(data);

    return res.status(200).json({ status: ok });
  }

  async destroy(req, res){
    const { _id } = req.params;

    const company = await Companies.findById(_id);

    if(!company){
      return res.status(400).json({ error: 'Empresa não existe'})
    }

    await company.deleteOne();

    return res.status(200).send()
  }
}

module.exports = new CompaniesController();