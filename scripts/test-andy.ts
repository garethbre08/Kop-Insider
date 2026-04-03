import { generateArticle } from "../lib/andy";

async function main() {
  console.log("🔴 Andy Anfield — first article generation test\n");

  try {
    await generateArticle({
      sourceHeadline:
        "Liverpool set to sign midfielder in January window according to sources close to the club",
      sourceContent:
        "Liverpool FC are understood to be closing in on a deal for a top European midfielder. Manager Arne Slot has made the position a priority after injuries have hit the squad hard. The player is valued at around 60 million pounds and has been in exceptional form this season. A deal could be completed before the end of the January transfer window according to sources close to the club.",
      sourceJournalist: "James Pearce",
      sourceOutlet: "The Athletic",
      sourceUrl: "https://theathletic.com/placeholder",
      articleType: "transfers",
      isFeatured: true,
    });

    console.log("\n✅ Article generated and saved to Supabase successfully.");
  } catch (error) {
    console.error("\n❌ Error generating article:", error);
    process.exit(1);
  }
}

main();
