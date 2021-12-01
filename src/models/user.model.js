const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    first_name : {type: "string", required: true},
    last_name : {type: "string", required: true},
    email : {type: "string", required: true},
    role: {type: "string", required: false}
},{
    versionKey:false,
    timestamps: true
});


module.exports = model("user",userSchema);