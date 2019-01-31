const router = require('express').Router();
const checkJwt = require('../middlewares/check-jwt');
const Product = require('../models/product');
const faker = require('faker');

router.route('/products')
    .get(checkJwt, (req, res, next) => {
        Product.find({ owner: req.decoded.user._id })
            .populate('owner')
            .populate('category')
            .exec((err, products) => {
                if(products) {
                    res.json({
                        success: true,
                        message: 'Products',
                        products: products
                    });
                }
                else {
                    res.json({
                        success: true,
                        message: 'Products',
                        products: []
                    });
                }
            });
    })
    .post(checkJwt, (req, res, next) => {
        let product = new product();
        product.owner = req.decoded.user._id;
        if(req.body.categoryId) product.category = req.body.categoryId;
        if(req.body.title) product.title = req.body.title;
        if(req.body.description) product.description = req.body.description;
        if(req.body.price) product.price = req.body.price;
        
        product.save();

        res.json({
            success: true,
            message: 'Successfully added the product.'
        });
    });

/* just for testing */
router.get('/faker/test', (req, res, next) => {
    for (let index = 0; index < 20; index++) {
        let product = new Product();
        product.category = "5c51e222a1bc0740345736bb";
        product.owner = "5c4cafdceeefb31fae2605c8";
        product.image = faker.image.cats();
        product.title = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }
    res.json({
        message: "Successfully added 20 images."
    });
});
module.exports = router;