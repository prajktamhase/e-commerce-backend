import express from "express";
import mongoose, { model, Schema } from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = 5000;

//connection mongodb import
const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    //find connection
    if (conn) {
        console.log('MongoDB connected successfully..');
    }
};

connectMongoDB();

//create schema
const commerceSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String,
});

//create model
const Commerce = model('Commerce', commerceSchema);

// send request from using get
app.get('/commerce', (req, res) => {
    res.json({ status: "Hello E-commerce" });
});

app.get('/website', async (req, res) => {
    const { email } = req.query;

    const product = await Commerce.find({ email: email })
    res.json({
        success: true,
        data: product,
        message: "website visit"
    });
});

app.get('/website', async (req, res) => {

    await Commerce.find()
    res.json({
        success: true,
        data: product,
        message: "website visit"
    });
});

app.post('/commerces', async (req, res) => {
    const { name, description, price, imageURI, brand } = req.body;

    if (!name) {
        return res.json({
            success: false,
            message: "name is required"
        })
    }

    if (!description) {
        return res.json({
            success: false,
            message: "description is required"
        })
    }

    if (!price) {
        return res.json({
            success: false,
            message: "price is required"
        })
    }

    if (!imageURI) {

        return res.json({
            success: false,
            message: "imageURI is required"
        })
    }

    if (!brand) {
        return res.json({
            success: false,
            message: "brand is required"
        })
    }

    const newWeb = new Commerce({
        name: name,
        description: description,
        price: price,
        imageURI: imageURI,
        brand: brand
    })

    const saveWebsite = await newWeb.save();
    res.json({
        success: true,
        data: saveWebsite,
        message: "successfully added new produce"
    })

});


//delete 
app.delete('/website/:_id', async (req, res) => {
    const { _id } = req.params;

    await Commerce.deleteOne({ _id: _id })

    res.json({
        success: true,
        data: {},
        message: `successfully deleted product ${_id}`
    })

    app.put('/product/:_id', async (req, res) => {

        const { _id } = req.params;

        const { name, description, price, imageURI, brand } = req.body;


        if (!name) {
            return res.json({
                success: false,
                message: "name is required"
            })
        }

        if (!description) {
            return res.json({
                success: false,
                message: "description is required"
            })
        }

        if (!price) {
            return res.json({
                success: false,
                message: "price is required"
            })
        }

        if (!imageURI) {

            return res.json({
                success: false,
                message: "imageURI is required"
            })
        }

        if (!brand) {
            return res.json({
                success: false,
                message: "brand is required"
            })
        }

        await Commerce.updateOne(

            { _id: _id },
            { $set: {
                    name: name,
                    description: description,
                    price: price,
                    imageURI: imageURI,
                    brand: brand
                }
            }
        )
        const updateProduct = await Commerce.findOne({ _id: _id });
        res.json({
            success: true,
            data: updateProduct,
            message: `Successfully updated`
        })

    })
})

app.patch('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const { name, description, price, imageURI, brand } = req.body;

    const product = await Commerce.findOne({ _id: _id });

    if (name && name!==product.name) {     
            product.name=name;
    }

    if (description && description!==product.description) {
        product.description=description;
    }

    if (price && price!==product.price) {
        product.price=price;
    }

    if (imageURI && imageURI!==product.imageURI) {
        product.imageURI=imageURI;
    }

    if (brand && brand!==product.brand) {
        product.brand=brand;
    }

    const updateProduct= await product.save();

    res.json({
        success: true,
        data: updateProduct,
        message: `Successfully updated`

    })

})

app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})
