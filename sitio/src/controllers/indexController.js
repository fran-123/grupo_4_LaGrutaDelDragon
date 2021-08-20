const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

module.exports ={
    index : (req,res) =>{
        const productsOfert = products.filter(product=>product.sale === true);
        return res.render("home",{products, productsOfert})
    },

    cartShop: (req,res) =>{
        return res.render("productCart")
    }
}