const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('users').count();

        const users = await connection('users')
        .join('admin', 'admin.id', '=', 'users.admin_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['users.*', 'admin.admname', 'admin.password', 'admin.email']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(users);
    },

    async create(request, response) {
        const { name, phone, cellphone, address, registerdate } = request.body;
        const admin_id = request.headers.authorization;

        const [id] = await connection('users').insert({
            name,
            phone,
            cellphone,
            address,
            registerdate,
            admin_id,
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const admin_id = request.headers.authorization;

        const users = await connection('users')
            .where('id', id)
            .select('admin_id')
            .first();

        if (users.admin_id !== admin_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('users').where('id', id).delete();
        
        return response.status(204).send();
    }
};