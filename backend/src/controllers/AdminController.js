const crypto = require('crypto')
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const admin = await connection('admin').select('*');
    
        return response.json(admin);
    },

    async create(request, response) {
        const { admname, password, email } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');


    await connection('admin').insert({
            id,
            admname,
            password,
            email,
        })

        return response.json({ id });
    }
}