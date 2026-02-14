import { farcasterConfig } from "@/farcaster.config";
import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    accountAssociation: farcasterConfig.accountAssociation,
    miniapp: farcasterConfig.miniapp,
  };
  return NextResponse.json(manifest);
}
