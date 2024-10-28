// PACKAGES
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'

// Utils
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import ProductRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const port = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, './env') })

connectDB()

const app = express()

// Enable CORS with the frontend origin
app.use(cors({
  origin: 'https://kimimi-final.vercel.app',
  credentials: true, // Include this if you need cookies or authorization headers
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/products", ProductRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)
app.use('/api', uploadRoutes)

app.listen(port, () => console.log(`Server running on port: ${port}`))
