import { runCrawler } from "../lib/crawler";

async function main() {
  console.log("[test-crawler] Starting crawler run...\n");
  const summary = await runCrawler();
  console.log("\n[test-crawler] Crawler summary:");
  console.log(`  Sources crawled:    ${summary.sourcesCrawled}`);
  console.log(`  New articles found: ${summary.newArticlesFound}`);
  console.log(`  Articles generated: ${summary.articlesGenerated}`);
}

main().catch((err) => {
  console.error("[test-crawler] Fatal error:", err);
  process.exit(1);
});
