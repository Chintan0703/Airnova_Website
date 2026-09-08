import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const contentDir = path.join(process.cwd(), "content");

const fileMap: Record<string, string> = {
  site: "site.json",
  captain: "captain.json",
  subsystems: "subsystems.json",
  projects: "projects.json",
  achievements: "achievements.json",
  timeline: "timeline.json",
  sponsors: "sponsors.json",
};

export async function GET() {
  try {
    const data: Record<string, any> = {};

    for (const [key, filename] of Object.entries(fileMap)) {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");
      data[key] = JSON.parse(fileContent);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error reading content files:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, payload } = body;

    // If a specific key is provided, update that file; otherwise update all provided keys
    if (key && fileMap[key]) {
      const filePath = path.join(contentDir, fileMap[key]);
      await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");
      return NextResponse.json({
        success: true,
        message: `Successfully updated ${fileMap[key]}`,
      });
    }

    // Bulk update multiple files
    if (payload && typeof payload === "object") {
      for (const [k, content] of Object.entries(payload)) {
        if (fileMap[k]) {
          const filePath = path.join(contentDir, fileMap[k]);
          await fs.writeFile(filePath, JSON.stringify(content, null, 2), "utf-8");
        }
      }
      return NextResponse.json({
        success: true,
        message: "Successfully updated all content files",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload format" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error writing content files:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save content" },
      { status: 500 }
    );
  }
}
