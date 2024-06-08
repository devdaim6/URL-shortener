import { NextResponse } from "next/server";

import { URL } from "@/models/url";

export async function PATCH() {
  try {
    const urls = await URL.find().exec();
    urls.forEach((url: any) => {
      if (url.linkExpiration < new Date()) {
        url.active = false;
      }
      url.ratelimit = url.ratelimit.map((rateLimit: any) => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        if (rateLimit.lastAccessed < oneHourAgo) {
          rateLimit.limit = 10;
        }
        const tenMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        if (rateLimit.lastAccessed < tenMinutesAgo) {
          rateLimit.lastAccessed = new Date();
        }
        return rateLimit;
      });
    });
    await URL.bulkSave(urls);
    return NextResponse.json({
      status: 200,
      message: "Bulk Deactivation and Rate Limit Reset Done",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Cron Job Failed" });
  }
}
