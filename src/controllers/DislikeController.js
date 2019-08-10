const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const devLogged = await Dev.findById(user);

        const targetDev = await Dev.findById(devId);

        if (!devLogged) {
            return res.status(400).json({ error: 'Dev logado não encontrado!' });
        }

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev não encontrado!' });
        }

        devLogged.dislikes.push(targetDev._id);

        await devLogged.save();

        return res.json(devLogged);
    }
}