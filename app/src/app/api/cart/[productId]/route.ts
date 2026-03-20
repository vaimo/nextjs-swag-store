import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_BASE_URL!;
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN!;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const cartToken = req.headers.get('x-cart-token');
  if (!cartToken) {
    return NextResponse.json(
      { success: false, error: 'Missing cart token' },
      { status: 400 }
    );
  }

  const body = await req.json();
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-cart-token': cartToken,
      'x-vercel-protection-bypass': BYPASS_TOKEN,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const cartToken = req.headers.get('x-cart-token');
  if (!cartToken) {
    return NextResponse.json(
      { success: false, error: 'Missing cart token' },
      { status: 400 }
    );
  }

  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      'x-cart-token': cartToken,
      'x-vercel-protection-bypass': BYPASS_TOKEN,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
