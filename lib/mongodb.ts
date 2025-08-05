import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Database helper functions
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise
  const db = client.db("arabic-ecommerce")
  return { client, db }
}

// Collection helpers
export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}

// User operations
export async function createUser(userData: any) {
  const collection = await getCollection("users")
  return await collection.insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function getUserById(userId: string) {
  const collection = await getCollection("users")
  return await collection.findOne({ _id: userId })
}

export async function updateUser(userId: string, updateData: any) {
  const collection = await getCollection("users")
  return await collection.updateOne(
    { _id: userId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

// Product operations
export async function createProduct(productData: any) {
  const collection = await getCollection("products")
  return await collection.insertOne({
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function getProducts(filter = {}, limit = 20, skip = 0) {
  const collection = await getCollection("products")
  return await collection.find(filter).limit(limit).skip(skip).sort({ createdAt: -1 }).toArray()
}

export async function getProductById(productId: string) {
  const collection = await getCollection("products")
  return await collection.findOne({ _id: productId })
}

export async function updateProduct(productId: string, updateData: any) {
  const collection = await getCollection("products")
  return await collection.updateOne(
    { _id: productId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteProduct(productId: string) {
  const collection = await getCollection("products")
  return await collection.deleteOne({ _id: productId })
}

// Order operations
export async function createOrder(orderData: any) {
  const collection = await getCollection("orders")
  return await collection.insertOne({
    ...orderData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function getOrdersByUserId(userId: string) {
  const collection = await getCollection("orders")
  return await collection.find({ userId }).sort({ createdAt: -1 }).toArray()
}

export async function getOrderById(orderId: string) {
  const collection = await getCollection("orders")
  return await collection.findOne({ _id: orderId })
}

export async function updateOrderStatus(orderId: string, status: string) {
  const collection = await getCollection("orders")
  return await collection.updateOne(
    { _id: orderId },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )
}

// Category operations
export async function getCategories() {
  const collection = await getCollection("categories")
  return await collection.find({}).sort({ name: 1 }).toArray()
}

export async function createCategory(categoryData: any) {
  const collection = await getCollection("categories")
  return await collection.insertOne({
    ...categoryData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

// Seller operations
export async function getSellers() {
  const collection = await getCollection("sellers")
  return await collection.find({}).sort({ rating: -1 }).toArray()
}

export async function getSellerById(sellerId: string) {
  const collection = await getCollection("sellers")
  return await collection.findOne({ _id: sellerId })
}

export async function createSeller(sellerData: any) {
  const collection = await getCollection("sellers")
  return await collection.insertOne({
    ...sellerData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

// Analytics operations
export async function logEvent(eventData: any) {
  const collection = await getCollection("analytics")
  return await collection.insertOne({
    ...eventData,
    timestamp: new Date(),
  })
}

export async function getAnalytics(startDate: Date, endDate: Date) {
  const collection = await getCollection("analytics")
  return await collection
    .find({
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    .toArray()
}

// Search operations
export async function searchProducts(query: string, filters = {}) {
  const collection = await getCollection("products")
  const searchFilter = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
    ...filters,
  }

  return await collection
    .find(searchFilter)
    .sort({ score: { $meta: "textScore" } })
    .toArray()
}

// Wishlist operations
export async function addToWishlist(userId: string, productId: string) {
  const collection = await getCollection("wishlists")
  return await collection.updateOne(
    { userId },
    {
      $addToSet: { productIds: productId },
      $set: { updatedAt: new Date() },
    },
    { upsert: true },
  )
}

export async function removeFromWishlist(userId: string, productId: string) {
  const collection = await getCollection("wishlists")
  return await collection.updateOne(
    { userId },
    {
      $pull: { productIds: productId },
      $set: { updatedAt: new Date() },
    },
  )
}

export async function getWishlist(userId: string) {
  const collection = await getCollection("wishlists")
  return await collection.findOne({ userId })
}

// Cart operations (if you want to store cart in database)
export async function saveCart(userId: string, cartData: any) {
  const collection = await getCollection("carts")
  return await collection.updateOne(
    { userId },
    {
      $set: {
        ...cartData,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  )
}

export async function getCart(userId: string) {
  const collection = await getCollection("carts")
  return await collection.findOne({ userId })
}

export default clientPromise
