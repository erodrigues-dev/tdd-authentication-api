const bcrypt = require('bcryptjs')

const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', ()=> {
    beforeEach(async() => await truncate())

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'any_name',
            email: 'any_email@email.com',
            password: '1234'
        })
        const compare = await bcrypt.compare('1234', user.password_hash);

        expect(compare).toBe(true)
    })

   
})
