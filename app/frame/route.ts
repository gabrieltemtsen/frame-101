import { NextRequest, NextResponse } from "next/server";

import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmOGNmYzVlMy1iMTUzLTQ2ZTYtOGY3Yy00MmVkZGNjMWNkYTIiLCJlbWFpbCI6ImdhYnJpZWx0ZW10c2VuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiOWRmMWQxZDRjMjY5NmEzNzIxOSIsInNjb3BlZEtleVNlY3JldCI6ImZlNWYzMWY5MjAyYjhkOThhOTBmZTdlYjg1NGE4YTg2ZTFhYjU1OTNkZDhjNWVjOWU2MTg4NmMyYTgwOTAyMmEiLCJpYXQiOjE3MTc4NTI5NTZ9.6Q-bbEbZU-o-vyEWsM0KEkptSsj6ZcZ64N0vths1Ris",
  pinata_gateway: "https://beige-lively-guppy-253.mypinata.cloud",
});
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.BASE_URL}/frame`,
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
      const body = await req.json();
      const fid = body.untrustedData.fid;
  
      const { isValid, message } = await fdk.validateFrameMessage(body);
  
      const frameMetadata = await fdk.getFrameMetadata({
        post_url: `${process.env.BASE_URL}/redirect`,
        buttons: [
          { label: "Thankyou Champ!", action: "post_redirect" },
        ],
        aspect_ratio: "1:1",
        cid: "QmPGVGuJBWfbFSggnGEx6pehsGqXwxGYxxGkTTSwDxncJc",
      });
  
      if (isValid) {
        await fdk.sendAnalytics("frame-mint-tutorial-mint", body);
      }
  
      return NextResponse.json({ success: true, frameMetadata: frameMetadata });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ success: false, error: error.message });
    }
  }