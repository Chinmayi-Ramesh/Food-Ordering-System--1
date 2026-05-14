import mongoose from "mongoose";
import Food from "./models/Food.js";

const food_list = [
  { name: "Greek salad", image: "food_1.png", price: 90, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Veg salad", image: "food_2.png", price: 78, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Clover Salad", image: "food_3.png", price: 120, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Chicken Salad", image: "food_4.png", price: 140, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Lasagna Rolls", image: "food_5.png", price: 150, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Peri peri Rolls", image: "food_6.png", price: 160, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Chicken Rolls", image: "food_7.png", price: 170, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Veg Rolls", image: "food_8.png", price: 180, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Ripple ice cream", image: "food_9.png", price: 190, category: "Desserts", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Fruit ice cream", image: "food_10.png", price: 200, category: "Desserts", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "jar ice cream", image: "food_11.png", price: 210, category: "Desserts", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Vanilla ice cream", image: "food_12.png", price: 220, category: "Desserts", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Chicken sandwich", image: "food_13.png", price: 230, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Vegan sandwich", image: "food_14.png", price: 240, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Grilled sandwich", image: "food_15.png", price: 250, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Bread sandwich", image: "food_16.png", price: 260, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Cup cake", image: "food_17.png", price: 270, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Vegan cake", image: "food_18.png", price: 280, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Butterscotch cake", image: "food_19.png", price: 290, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Sliced cake", image: "food_20.png", price: 300, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Garlic Mushroom", image: "food_21.png", price: 310, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Fried Cauliflower", image: "food_22.png", price: 320, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Mix Veg Pulao", image: "food_23.png", price: 330, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Rice Zucchini", image: "food_24.png", price: 340, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Cheese pasta", image: "food_25.png", price: 350, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Tomato Pasta", image: "food_26.png", price: 360, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Creamy Pasta", image: "food_27.png", price: 370, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Chicken Pasta", image: "food_28.png", price: 380, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Butter Noodles", image: "food_29.png", price: 390, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Veg Noodles", image: "food_30.png", price: 400, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Samen Noodles", image: "food_31.png", price: 410, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
  { name: "Cooked Noodles", image: "food_32.png", price: 420, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" }
];

const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/foodDB')
    .then(() => console.log("DB Connected"));
}

const migrate = async () => {
    await connectDB();
    await Food.deleteMany({});
    console.log("Cleared existing foods");
    
    await Food.insertMany(food_list);
    console.log("Inserted 32 food items");
    
    mongoose.connection.close();
}

migrate();
