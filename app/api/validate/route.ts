import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  console.log(data);

  // Return success response with the new frame image URL
  const responseData = {
    success: true,
    frameImage: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmNewFrameImageHash`, // Replace with actual IPFS hash
  };

  // Create headers and set Location for redirect
  const headers = new Headers();
  headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/new-frame-path`); // Replace with actual path
  headers.set("Content-Type", "application/json");

  // Return response with 302 status code
  return new NextResponse(JSON.stringify(responseData), {
    headers: headers,
    status: 302,
  });
}

export const dynamic = 'force-dynamic';
