const Companies = require('../models/Companies');
const Unity = require('../models/Units');

const Yup = require('yup');

class UnitsController {
  async show(req, res) {
    const { _id } = req.params;

    const unity = await Unity.findById(_id).populate('assets');

    if(!unity){
      return res.status(400).json({ error: 'Unidade não existe '});
    }

    return res.status(200).json(unity);
  }

  async index(req, res){
    const { company_id: _id } = req.params;

    const units = await Unity.find().where({ company: _id }).populate('company').populate('assets');


    return res.status(200).json(units);
  }

  async store(req, res){
    const { company_id: _id } = req.params;
    const data = req.body;
    
    const company = await Companies.findById(_id);

    if(!company){
      return res.status(400).json({ message: 'Essa empresa não existe'});
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const unity = await Unity.create({...data, company: _id});

    company.units.push(unity._id);
    
    await company.save();

    return res.status(200).json(unity);
  }

  async update(req, res){
    const { _id } = req.params;
    const data = req.body;

    const unity = await Unity.findById(_id);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const { ok } = await unity.updateOne(data);
    
    return res.status(200).json({ status: ok });
  }

  async destroy(req, res){
    const { _id } = req.params;

    const unity = await Unity.findByIdAndDelete(_id);

    if(!unity){
      return res.status(400).json({ error: 'Unidade não existe'})
    }
    
    return res.status(200).send();
  }
}

module.exports = new UnitsController();