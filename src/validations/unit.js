const {body}=require("express-validator") 

const validUnit=[
    body("unitName").isString()
    .withMessage("name must be string")
    .isLength({min:2,max:100})
    .withMessage("name should be at least 2 character and at most 100 character")
]
module.exports={
    validUnit
}