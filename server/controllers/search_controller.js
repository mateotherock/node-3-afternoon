const swag =  require('../models/swag.js');

module.exports = {
    search: (req, res, next) => {
        if (req.query.category) {
            searchResult = swag.filter(swag => swag.category === req.query.category);
            res.status(200).send(searchResult)
        } else {
            res.status(200).send(swag);
        }
    }
}