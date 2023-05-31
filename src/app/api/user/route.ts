import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mysearchParam = searchParams.get("mysearchParam");
  console.log(mysearchParam);
  console.log("GET REQUEST");

  return new Response(JSON.stringify({ name: "hui" }), { status: 401 });
}

export async function POST() {
  console.log("POST REQUEST");
}
