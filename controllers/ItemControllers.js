
const Item = require("../models/Item");

exports.getItems = (req,res,next)=>{
     
    Item.findAll()
    .then(items=>{
        res.send(items);
    })
    .catch(err=>console.log(err));
}

exports.postItems = (req,res,next)=>{
    
    let name = req.body.Name;
    let description = req.body.Description;
    let price = req.body.Price;
    let quantity = req.body.Quantity;

    Item.create({
        Name:name,
        Description:description,
        Price:price,
        Quantity:quantity
    })
    .then(result=>{
        res.send(result);
    })
    .catch(err=>console.log(err));
}

exports.putItems = (req,res,next)=>{
    let Id = req.params.id;
    Item.findByPk(Id)
    .then(item=>{
        tosendItem = item;
      let newQuantity = item.Quantity-1;
      return Item.update({Quantity:newQuantity},{
        where:{
            id:Id
        }
      })
    })
    .then(result=>{
       Item.findByPk(Id)
       .then(item=>{
        res.json(item.Quantity);
       })
       .catch(err=>console.log(err));
    })
    .catch(err=>{
        console.log(err)
    })
}