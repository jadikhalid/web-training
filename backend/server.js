import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    // 1. On attend la connexion à la DB
    await connectDB();
    console.log("Connecté à la base de données avec succès !");

    // 2. Si (et seulement si) la connexion réussit, on lance le serveur
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    // 3. Gestion des erreurs : si la DB échoue, on stoppe tout
    console.error("Erreur de connexion à la base de données :", error.message);
    process.exit(1); // On quitte le processus Node avec un code d'erreur
  }
};

startServer();
