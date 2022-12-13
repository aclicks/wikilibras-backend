import express from 'express';
import { UserModel } from '../models/user.model.js';

const perfilUser = express.Router();

perfilUser.post('/new-user', async (req, res) => {
  try {
    const form = req.body;
    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.get('/all-users', async (req, res) => {
  try {
    const users = await UserModel.find({});

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.get('/user/:id'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(400).json({ msg: 'Usuário não encontrado!' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.erros);
    }
  };

perfilUser.delete('delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const editUser = await Usermodel.findByAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

//Tudo vai aqui dentro
export { perfilUser };
