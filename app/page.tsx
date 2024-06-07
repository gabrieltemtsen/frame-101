import { getFrameMetadata } from "@coinbase/onchainkit/core";
import type { Metadata } from "next";

const frameMetadata  = getFrameMetadata({
  buttons: [
    {
      label: "Start"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmV1JEbHELKkyve1Cn5yAxUdkwWENnRuNr1gAJ2oGqaP5g`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "MEME FOR DEGEN",
  description: "TIP DEGEN TO MAKE ME SMILE",
  openGraph: {
    title: "MEME FOR DEGEN",
    description: "TIP DEGEN TO MAKE ME SMILE",
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmV1JEbHELKkyve1Cn5yAxUdkwWENnRuNr1gAJ2oGqaP5g`],
  },
  other: {
    ...frameMetadata,
  },

}
export default function Page() {
  return (
    <>
      <h1>Cosmic Cowboys</h1>
    </>
  );
}