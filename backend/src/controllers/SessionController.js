const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const admin = await connection('admin')
        .where('id', id)
        .select('admname')
        .first();

        if (!admin) {
            return response.status(400).json({error: 'No USER found with this ID'});

        }

        return response.json(admin);
    }
}