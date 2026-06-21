"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const dataFilePath = path.join(process.cwd(), "data.json");

export async function updateMatchComplete(
  matchId: number, 
  dataUpdates: any
) {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);

    const matchIndex = data.matches.findIndex((m: any) => m.id === matchId);
    if (matchIndex === -1) throw new Error("Match not found");

    // Merge the incoming updates
    data.matches[matchIndex] = {
      ...data.matches[matchIndex],
      ...dataUpdates
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    revalidatePath("/");
    revalidatePath("/standings");
    revalidatePath("/fixtures");
    revalidatePath("/statistics");
    revalidatePath(`/match/${matchId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating match:", error);
    return { success: false, error: "Failed to update match" };
  }
}
