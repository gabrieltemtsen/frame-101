import { NextRequest, NextResponse } from "next/server";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PUBLIC_PINATA_JWT as string,
  pinata_gateway: process.env.PUBLIC_GATEWAY_URL as string,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const buttonId = body.untrustedData.buttonIndex;
  const { isValid, message } = await fdk.validateFrameMessage(body);
  if (buttonId === 1) {
    try {
      if (isValid) {
        await fdk.sendAnalytics("Thankyou message", body);
      }
      return NextResponse.redirect(
        "https://meme-for-degen.vercel.app",
        { status: 302 },
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } 
}