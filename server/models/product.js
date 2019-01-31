const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaProduct = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    image: String,
    price: Number,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', SchemaProduct);
