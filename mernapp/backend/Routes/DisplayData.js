import React from 'react'
import  express from "express";

const router = express.Router();

router.post("/foodData",(req,res) => {
    try{
        res.send([global.food_items,global.food_items_cat]);
    } catch(error){
        console.error(error.message);
        res.send("server Error");
    }
})

export default router;
