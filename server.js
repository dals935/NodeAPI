const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.get('/', (req, res) => {
//     res.send ('Hello NODE API')
// })

// app.get('/blog', (req, res) => {
//     res.send ('Hello BLOGGERS')
// })

//get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get product by id
app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        //for finding if product is in database
        if (!product)
        {
            return res.status(404).json({message: `Cant find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//create product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update product
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //for finding if product is in database
        if (!product)
        {
            return res.status(404).json({message: `Cant find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //for finding if product is in database
        if (!product)
        {
            return res.status(404).json({message: `Cant find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose
.connect('mongodb+srv://andaluser:root123@cluster0.vfoaysw.mongodb.net/nodeapi?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    });
    
}).catch(() => {
    console.log(error)
})