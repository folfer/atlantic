const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const admin_id = request.headers.authorization;

        const users = await connection('users')
            .where('admin_id', admin_id)
            .select('*');

        return response.json(users);
    }
}