import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        min:[2,'minimum first Name should be 2 characters'],
        max:[32,'maximum first Name should be 32 characters'],
        required:[true,'first Name is required'],
        trim:true
    },
    lastName:{
        type:String,
        min:[2,'minimum last Name should be 2 characters'],
        max:[32,'maximum last Name should be 32 characters'],
        required:[true,'last Name is required'],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
        trim:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        trim:true
    },
    phone:{
        type:String,
        required:[true,'phone is required'],
        match:/^(?:\+971|00971|971|0)?(?:50|51|52|54|55|56|2|3|4|6|7|9)\d{7}$/m
    },
    confirmPassword:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    typeOfUser:{
        type:String,
        enum:["agent","devloper","owner"],
    },
    refreshToken:{
        type:String,
        default:null
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
    resetPasswordCode:{
        type:Number,
        default:null
    },
    resetPasswordExpiresAt:{
        type:Date,
        default:null
    }
},{timestamps:true});

schema.plugin(mongoosePaginate)

export const User = mongoose.model('user', schema);