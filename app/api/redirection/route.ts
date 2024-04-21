import { connectMongoDB } from "@/lib/db";
import Url from "@/models/url";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const object = (await request.json()) as any;
  try {
    await connectMongoDB();
    const urlObject = await Url.findOne({ urlCode: object?.urlCode });

    return NextResponse.json({
      message: "Original URL fetched.",
      originalUrl: urlObject.originalUrl,
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while fetching Original URL.",
      success: false,
      status: 500,
    });
  }
}
