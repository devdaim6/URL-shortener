import { connectMongoDB } from "@/lib/db";
import { URL } from "@/models/url";
import { NextResponse } from "next/server";
import Cryptr from "cryptr";

const RATE_LIMIT_WINDOW = 60000;

export async function POST(request: any) {
  const { urlCode } = await request.json();
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  const ip = data.ip;
  console.log(urlCode);
  try {
    await connectMongoDB();
    const urlObject = await URL.findOne({ urlCode });
    if (!urlObject) {
      return NextResponse.json({ status: "Error" });
    }
    const currentDate = new Date();
    if (urlObject.linkExpiration < currentDate) {
      await URL.deleteOne({ urlCode });
      return NextResponse.json({ status: 403 });
    }

    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const decryptedOriginalUrl = cryptr.decrypt(urlObject?.originalUrl);

    const ipEntry = urlObject.ratelimit.find((entry: any) => entry.ip === ip);

    if (ipEntry) {
      const lastAccessed = new Date(ipEntry.lastAccessed);

      if (currentDate.getTime() - lastAccessed.getTime() <= RATE_LIMIT_WINDOW) {
        if (ipEntry.limit <= 1) {
          return NextResponse.json({
            status: 429,
            message: "Rate limit exceeded. Please try again later.",
          });
        } else {
          ipEntry.limit -= 1;
        }
      } else {
    
        ipEntry.limit = 10;
      }

      ipEntry.lastAccessed = currentDate;  
    } else {
      urlObject.ratelimit.push({ ip, limit: 10, lastAccessed: currentDate });
    }

    await URL.updateOne(
      { urlCode },
      {
        lastAccessed: currentDate,
        $set: { ratelimit: urlObject.ratelimit, clicks: urlObject.clicks + 1 }, // Update the entire ratelimit array
      }
    );

    return NextResponse.json({
      originalUrl: decryptedOriginalUrl,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while fetching Original URL.",
    });
  }
}
