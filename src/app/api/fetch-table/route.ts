import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/aws";
import { ScanCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";

interface FetchTableRequest {
  tableName: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: FetchTableRequest = await req.json();

    if (!body.tableName) {
      throw new Error("Table name is required");
    }

    const result: ScanCommandOutput = await dynamoDb.send(
      new ScanCommand({ TableName: body.tableName })
    );

    return NextResponse.json(result.Items ?? []);
  } catch (error) {
    console.error("Error fetching table data:", error);
    return NextResponse.json(
      { error: "Failed to fetch table data" },
      { status: 500 }
    );
  }
}