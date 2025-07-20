import axios from "axios";
import express from "express";

const routes = express.Router()

routes.post('/packages', async (req, res) => {

    try {
        const result = await axios.post('http://packages_service:3001/packages', req.body)
        res.status(200).json(result.data)
    } catch (err) {
        console.error('Error while creating package:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

})

export { routes }
