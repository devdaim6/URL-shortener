import { NextResponse } from "next/server";
import { URL } from "@/models/url";

export async function PATCH() {
  try {
    await URL.updateMany({}, { $set: { "ratelimit.$[].limit": 10 } });
    return NextResponse.json({
      status: 200,
      message: "Rate Limit Reset Done",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cron Job Failed" });
  }
}
