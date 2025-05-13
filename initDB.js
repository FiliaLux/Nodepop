import readline from "node:readline";
import connectMongoose from "./lib/connectMongoose.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

const connection = await connectMongoose();
console.log("Connected to Mongo DB:", connection.name);

const answer = await ask("Are you sure you want to delete all database connections? (n)");
if (answer !== "y") {
    console.log("Operation aborted");
};

await initUsers();
await initProducts();

await connection.close();

async function initUsers() {
    // delete all users
    const result = await User.deleteMany();
    console.log(`Deleted ${result.deletedCount} users`);
    //create users
    const insertResult = await User.insertMany([
        {email: "admin@example.com", password: await User.hashPassword("1234")},
        {email: "user@example.com", password: await User.hashPassword("5678")}
    ]);
    console.log(`Inserted ${insertResult.length} users`);
};


async function initProducts() {
    const result = await Product.deleteMany();
    console.log(`Deleted ${result.deletedCount} products`);
    
    const [admin, user] = await Promise.all([
        User.findOne({email: "admin@example.com"}),
        User.findOne({email: "user@example.com"})
    ])
    
    const insertResult = await Product.insertMany([
        {name: "Blender", price: 45, owner: admin._id},
        {name: "T-shirt", price: 10, owner: user._id},
        {name: "Car", price: 24000, owner: admin._id}
     ]);
    console.log(`Inserted ${insertResult.length} products`);
};

async function ask (question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const result = await new Promise(resolve => {
        rl.question(question, resolve)});
    //const result = rl.question(question);
    rl.close();
    return result;
};