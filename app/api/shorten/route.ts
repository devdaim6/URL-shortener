import { connectMongoDB } from "@/lib/db";
import { URL } from "@/models/url";
import { NextResponse } from "next/server";
import randomstring from "randomstring";

export async function POST(request: any) {
  const { longUrl, urlLength, customUrlCode } = await request.json();
  const origin = request?.nextUrl?.origin;
  try {
    await connectMongoDB();
    const urlCode = randomstring
      .generate({
        charset: "alphabetic",
        length: Number(urlLength),
      })
      .toLocaleLowerCase();
    const shortUrl = `${origin}/${customUrlCode ? customUrlCode : urlCode}`;

    await URL.create({
      originalUrl: longUrl,
      urlCode: customUrlCode ? customUrlCode : urlCode,
      type: customUrlCode ? "custom" : "random",
    });

    return NextResponse.json({
      message: "The URL has been successfully shortened.",
      shortUrl,
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while attempting to shorten the URL.",
      success: false,
      status: 500,
    });
  }
}
