import { Product } from "@prisma/client"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function getProducts() {
    const response = await fetch(`${baseUrl}/api/v1/products`)
    const products = await response.json()
    console.log("these are the products",products)
    return products.data as Product[]
}