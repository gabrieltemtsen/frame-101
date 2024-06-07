import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const user = req.body;
  const searchParams = req.nextUrl.searchParams
  const id:any = searchParams.get("id")
  const idAsNumber = parseInt(id)

 
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is a frame thanks ${user} </title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmPGVGuJBWfbFSggnGEx6pehsGqXwxGYxxGkTTSwDxncJc" />
    <meta property="fc:frame:button:1" content="${idAsNumber}" />
  </head></html>`);
  
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';