const getUserInfo = async function(ctx) {
    ctx.body = {
        id: '1',
        name: 'boyuan',
        password: '123'
    }
}

module.exports = {
    getUserInfo
}