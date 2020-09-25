const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('rent').count();

        const rent = await connection('rent')
        .join('admin', 'admin.id', '=', 'rent.admin_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['rent.*', 'admin.admname', 'admin.password', 'admin.email']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(rent);
    },

    async create(request, response) {
        const { namerent, datainit, dataover, scaffolding, prop, debit } = request.body;
        const admin_id = request.headers.authorization;

        const [id] = await connection('rent').insert({
            namerent,
            datainit,
            dataover,
            scaffolding,
            prop,
            debit,
            admin_id,
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const admin_id = request.headers.authorization;

        const rent = await connection('rent')
            .where('id', id)
            .select('admin_id')
            .first();

        if (rent.admin_id !== admin_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('rent').where('id', id).delete();
        
        return response.status(204).send();
    }
};