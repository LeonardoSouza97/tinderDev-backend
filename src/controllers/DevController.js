const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        console.log('entrou no index');
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {_id: {$ne: loggedDev}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}}
            ]
        })

        return res.json(users);
    },

    async store(req, res) {
        console.log('entrou no store');
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        console.log(response.data);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
}