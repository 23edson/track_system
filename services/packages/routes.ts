import express from 'express';
import Package from './domain/entity/Package';

const routes = express.Router();

routes.post('/packages', async (req, res) => {

    /*   try {
          console.log(req.body)
          const newPackage = await Package.create(req.body);
          return res.status(200).json(newPackage);
      } catch (error: any) {
          console.error('Error while creating package:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      } */
})

export { routes }