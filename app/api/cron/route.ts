import { NextResponse } from "next/server";
import { URL } from "@/models/url";

export async function PATCH() {
  try {
    const currentTime = new Date();
    await URL.updateMany(
      { active: true, linkExpiration: { $lt: currentTime } },
      { $set: { active: false } }
    );
    console.log("All Expired Links have been set as Inactive");
    return NextResponse.json({
      status: 200,
      message: "Bulk Deactivation and Rate Limit Reset Done",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cron Job Failed" });
  }
}
