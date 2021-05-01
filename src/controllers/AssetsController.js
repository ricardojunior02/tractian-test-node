const Assets = require('../models/Assets') ;
const Unity = require('../models/Units') ;

const Yup = require('yup');

class AssetsController {
  async index(req, res){
    const { unity_id: _id } = req.params;

    const assets = await Assets.find().where({ unity: _id })
    .populate('responsible', 'name')
    .populate('unity', 'name').populate('company', 'name');

    return res.status(200).json(assets);
  }

  async show(req, res){
    const { _id } = req.params;

    const assets = await Assets.findById(_id)
    .populate('responsible', 'name')
    .populate('unity', 'name').populate('company', 'name');

    return res.status(200).json(assets);
  }

  async store(req, res){
    const { unity_id: _id } = req.params;
    const data = req.body;

    const schema = Yup.object().shape({
      image: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().required(),
      model: Yup.string().required(),
      status: Yup.string().required(),
      healthscore: Yup.string().required(),
      responsible: Yup.string().required()
    });

    const unity = await Unity.findById(_id);

    if(!unity){
      return res.status(400).json({ error: 'Unidade não existe'});
    }

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const active = await Assets.create({...data, unity: _id, company: unity.company._id});

    unity.assets.push(active._id);
    await unity.save();

    return res.status(200).json(active);
  }
  async update(req, res){
    const { _id } = req.params;
    const data = req.body;

    const active = await Assets.findById(_id);

    if(!active){
      return res.status(400).json({ error: 'Ativo não existe'})
    }

    const schema = Yup.object().shape({
      image: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().required(),
      model: Yup.string().required(),
      status: Yup.string().required(),
      healthscore: Yup.string().required(),
      responsible: Yup.string().required()
    });

    if(!(await schema.isValid(data))){
      return res.status(400).json({ error: 'Verifique todos os campos'});
    }

    const { ok } = await active.updateOne(data);

    return res.status(200).json({ status: ok });
  }
  async destroy(req, res){
    const { _id } = req.params;

    await Assets.findByIdAndDelete(_id);
    
    return res.status(200).send();
  }
}

module.exports =  new AssetsController();