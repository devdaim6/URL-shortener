import { connectMongoDB } from "@/lib/db";
import { URL } from "@/models/url";
import { NextResponse } from "next/server";
import Cryptr from 'cryptr';


export async function POST(request: any) {
  const { urlCode } = await request.json();
  await connectMongoDB();
  const urlObject = await URL.findOne({ urlCode });
  if (!urlObject) {
    return NextResponse.json({ status: "Error" });
  }
  const currentDate = new Date();
  if (urlObject.age < currentDate) {
    await URL.deleteOne({ urlCode });
    return NextResponse.json({ status: 403 });
  }
  
  const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
  const decryptedOriginalUrl = cryptr.decrypt(urlObject?.originalUrl);
  try {
    return NextResponse.json({
      originalUrl: decryptedOriginalUrl,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while fetching Original URL.",
    });
  }
}
