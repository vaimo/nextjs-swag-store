import { NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_BASE_URL ?? '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN ?? '';

export async function POST() {
  const res = await fetch(`${BASE_URL}/cart/create`, {
    method: 'POST',
    headers: {
      'x-vercel-protection-bypass': BYPASS_TOKEN,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ success: false }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
