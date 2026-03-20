import { type NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_BASE_URL ?? '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN ?? '';

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString();
  const res = await fetch(`${BASE_URL}/products?${qs}`, {
    headers: { 'x-vercel-protection-bypass': BYPASS_TOKEN },
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
