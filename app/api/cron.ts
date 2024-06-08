import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}
