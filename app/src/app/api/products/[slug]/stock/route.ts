import { type NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_BASE_URL ?? '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN ?? '';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/products/${slug}/stock`, {
    headers: { 'x-vercel-protection-bypass': BYPASS_TOKEN },
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json(data, {
    status: res.status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
