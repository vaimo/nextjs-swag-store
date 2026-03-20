import { NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_BASE_URL ?? '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN ?? '';

export async function GET() {
  const res = await fetch(`${BASE_URL}/categories`, {
    headers: { 'x-vercel-protection-bypass': BYPASS_TOKEN },
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
