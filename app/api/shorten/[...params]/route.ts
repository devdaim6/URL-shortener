import { connectMongoDB } from "@/lib/db";
import Url from "@/models/url";
import { NextResponse } from "next/server";
import randomstring from "randomstring";

export async function POST(
  request: any,
  { params }: { params: { params: string[] } }
) {
  const [url, length] = params.params;
  const origin = request.nextUrl.origin;
  try {
    await connectMongoDB();
    const urlCode = randomstring
      .generate({
        charset: "alphabetic",
        length: Number(length),
      })
      .toLocaleLowerCase();
    const shortUrl = `${origin}/${urlCode}`;

    await Url.create({
      originalUrl: url,
      urlCode,
    });

    return NextResponse.json({
      message: "Url Shortened.",
      shortUrl,
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while Shortening the URL.",
      success: false,
      status: 500,
    });
  }
}
