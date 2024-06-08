import { NextRequest, NextResponse } from "next/server";

import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.NEXT_PUBLIC_PINATA_JWT as string,
  pinata_gateway: process.env.NEXT_PUBLIC_GATEWAY_URL as string,
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/frame`,
      buttons: [{ label: "Make Me Smile", action: "post" }],
      aspect_ratio: "1:1",
      cid: "QmV1JEbHELKkyve1Cn5yAxUdkwWENnRuNr1gAJ2oGqaP5g",
    });
    return new NextResponse(frameMetadata);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
    //   const body = await req.json();
    //   const fid = body.untrustedData.fid;
  
    //   const { isValid, message } = await fdk.validateFrameMessage(body);
  
      const frameMetadata = await fdk.getFrameMetadata({
        post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/redirect`,
        buttons: [
          { label: "Thankyou Champ!", action: "post_redirect" },
        ],
        aspect_ratio: "1:1",
        cid: "QmPGVGuJBWfbFSggnGEx6pehsGqXwxGYxxGkTTSwDxncJc",
      });
  
    //   if (isValid) {
    //     await fdk.sendAnalytics("frame-mint-tutorial-mint", body);
    //   }
  
      return NextResponse.json({ success: true, frameMetadata: frameMetadata });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ success: false, error: error.message });
    }
  }