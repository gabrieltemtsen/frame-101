import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get('id');
  const idAsNumber = parseInt(id);

  const nextId = idAsNumber + 1;

  if (idAsNumber === 1) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is me</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmV1JEbHELKkyve1Cn5yAxUdkwWENnRuNr1gAJ2oGqaP5g" />
    <meta property="fc:frame:button:1" content="Tip me" />
    <meta property="fc:frame:button:1:action" content="post_redirect" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/validate" />
  </head></html>`);
  } else {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmPGVGuJBWfbFSggnGEx6pehsGqXwxGYxxGkTTSwDxncJc" />
    <meta property="fc:frame:button:1" content="Take gift" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/validate?id=1" />
  </head></html>`);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';