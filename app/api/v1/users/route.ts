import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt-ts";

export async function POST(request:NextRequest) {
   try {
    const data = await request.json()
    const { email, password,name,image} = data
    const existingUser = await db.user.findUnique({
        where:{
            email
        }
    })
    if(existingUser){
        return NextResponse.json({
            data:null,
            error:"user already exists",
        },{
            status:409
        })
    }
    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
        data:{
            email,
            password:hashedPassword,
            name,
            image
        }
    })
    console.log(newUser)
    return NextResponse.json({
        data:newUser,
        message:"created successfully",
        error:null
    },{
        status:201
    })
   } catch (error) {
    console.log(error)
    return NextResponse.json({
        data:null,
        error:"something went wrong"
    },{
        status:500
    })
   }
}