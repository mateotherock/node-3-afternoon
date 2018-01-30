const swag = require('../models/swag.js');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        const { session } = req;
        if (!session.user.cart.includes(+id)) {
            const swagToAdd = swag.find(swag => swag.id === +id);
            session.user.cart.push(swagToAdd);
            session.user.total += swagToAdd.price;
        }
        res.status(200).send(session.user)
    },
    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;
        
        const selectedSwag = swag.find( swag => swag.id == id );
        
        if ( selectedSwag ) {
            const i = cart.findIndex( swag => swag.id == id );
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }
  
        res.status(200).send( req.session.user );
    },
    checkout: (req, res, next) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user);
    }
}