const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
    
    {
        date: {
            type: Date
        },
    
    
        time: {
            type: String,
            enum: ["18:00", "21:00"]
        },
        

        
        amountOfPersons: {
            
            type: Number
        },

        description: { type: String },

        
        guest: {
            name: {
    type: String
             },
     
    email: {type: String},

        
    mobile: {type: String}}
       
    }
    
);

module.exports = mongoose.model("booking", bookingSchema); 