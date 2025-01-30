import express from 'express';
 import dotEnv from 'dotenv';
dotEnv.config();
 import cors from 'cors';
 import { configureRoutes } from './configuration/configureRoutes.js';
 import { connectDatabase } from './configuration/configureDatabase.js';

 const app = express(); 
 app.use(express.json({ limit: '50mb' }));
 app.use(express.urlencoded({ limit: '50mb' }));
 app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
 }));


 configureRoutes(app);

 connectDatabase(); 

 const PORT = process.env.PORT || 4000;  
 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
 });

