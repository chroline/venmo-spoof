import { fetchHtml } from "@/lib/data-fetching";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  if (!username)
    return NextResponse.json(
      { error: "Username not provided" },
      { status: 400 }
    );

  const htmlText = await fetchHtml(`https://account.venmo.com/u/${username}`);
  if (!htmlText)
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );

  const $ = cheerio.load(htmlText);
  const name = $("p[class^='profileInfo_username']").first().text() || null;

  return NextResponse.json({ name });
}
