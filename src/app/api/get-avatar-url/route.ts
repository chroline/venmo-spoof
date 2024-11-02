import { fetchHtml } from "@/lib/data-fetching";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

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
  const avatarURL = $("img.MuiAvatar-img").attr("src") || null;

  return NextResponse.json({ avatarURL });
}
