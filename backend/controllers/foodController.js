import Food from "../models/Food.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    let image_filename = req.file ? req.file.filename : "";

    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("ADD_FOOD_ERROR:", error);
        res.json({ success: false, message: error.message || "Error adding food" });
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        if(food) {
            fs.unlink(`uploads/${food.image}`, () => {});
            await Food.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addFood, listFood, removeFood }
