import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  console.log(data);

  const newFrameImageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmPGVGuJBWfbFSggnGEx6pehsGqXwxGYxxGkTTSwDxncJc`;

  return NextResponse.json({
    success: true,
    frameImage: newFrameImageUrl,
  });
}

export const dynamic = 'force-dynamic';