import { db } from "@/prisma/db";
import { QueriesResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
type productCreateDTO = {
    url:string,
    title:string,
    price:string,
    imageUrl:string
}
export async function POST(request:NextRequest){
    const data = await request.json()
    const {url,title,price,imageUrl}:productCreateDTO = data
    const newProduct = await db.product.create({
        data:{
            url:url,
            title:title,
            price:price,
            imageUrl:imageUrl
        }
    })
    console.log(newProduct)
    return NextResponse.json({
        data:newProduct,
        message:"created successfully",
        error:null
    },{
        status:201
    })
}

export async function GET(): Promise<NextResponse> {
    try {
        const data = await db.product.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        const response: QueriesResponse = { data, error: null };
        return NextResponse.json(response, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        const response: QueriesResponse = { data: null, error: "failed to fetch" };
        return NextResponse.json(response, {
            status: 500
        });
    }
}
