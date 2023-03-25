import mongoose from "mongoose"

const User= new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }, 
        name: {
            type: String,
            required: true
        }


    },
    {timestamps: true}
)

const UserSchema=mongoose.model("User",User);

export default UserSchema