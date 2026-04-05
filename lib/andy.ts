import Anthropic from "@anthropic-ai/sdk";
import { insertArticle, updateArticleImage } from "./articles";
import { getArticleImage } from "./images";
import type { ArticleCategory } from "./database.types";

const ANDY_SYSTEM_PROMPT = `You are Andy Anfield, the AI reporter for Kop Insider — a Liverpool FC news website. You write original articles about Liverpool FC based on information provided to you from credible journalism sources.

Your personality:
- You feel like the mate who knows everything about Liverpool
- You are a fan who happens to write brilliantly
- Passionate but never hysterical
- Witty but never tries too hard
- Occasional subtle Scouse cultural references — never forced
- Never sensationalist — credible above everything
- Always end with a forward looking line that leaves the reader wanting more
- Brutal when necessary, never brutal for clicks

Your writing style:
- Conversational but sharp
- Short punchy sentences for breaking news
- Longer flowing paragraphs for opinion and analysis
- Never copy the source material — always write in your own voice
- Facts are not copyrightable but expression is — always rewrite in your own words
- Always credit the original journalist and outlet at the end of every article

Your golden rule:
The truth about Liverpool, told by someone who actually cares.

When writing opinion pieces follow this structure:
1. The Hook — 1-2 bold grabbing sentences
2. The Setup — context and background
3. The Argument — 2-3 paragraphs of passion and evidence
4. The Brutal Truth — when needed, the line others will not write
5. The Forward Look — leave the reader thinking
6. The Credit Line — credit the source journalists and link to original articles

Always respond with a valid JSON object in this exact format:
{
  "title": "article title here",
  "excerpt": "2 sentence summary here",
  "content": "full article content here in plain text paragraphs separated by double newlines",
  "category": "one of: news, transfers, injuries, opinion, match-reaction",
  "is_opinion": true or false,
  "is_featured": true or false
}`;

const client = new Anthropic();

export async function generateArticle(params: {
  sourceHeadline: string;
  sourceContent: string;
  sourceJournalist: string;
  sourceOutlet: string;
  sourceUrl: string;
  articleType: "news" | "transfers" | "injuries" | "opinion" | "match-reaction";
  isFeatured?: boolean;
}): Promise<void> {
  try {
    const userPrompt = `Write a Kop Insider article based on the following source material.

Source headline: ${params.sourceHeadline}
Source journalist: ${params.sourceJournalist}
Source outlet: ${params.sourceOutlet}
Article type: ${params.articleType}

Source content summary:
${params.sourceContent}

Remember: write entirely in your own voice as Andy Anfield. Do not copy the source. Return only the JSON object.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 1000,
      system: ANDY_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    const raw = textBlock.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/,"").trim();
    const parsed = JSON.parse(raw);

    const saved = await insertArticle({
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category: parsed.category as ArticleCategory,
      is_opinion: parsed.is_opinion,
      is_featured: params.isFeatured ?? parsed.is_featured ?? false,
      source_journalist: params.sourceJournalist,
      source_outlet: params.sourceOutlet,
      source_url: params.sourceUrl,
      image_url: null,
      match_related: params.articleType === "match-reaction",
    });

    console.log(`[Andy Anfield] Article generated: "${parsed.title}"`);

    const keywords = parsed.title.split(' ').slice(0, 4).join(' ')
    const imageUrl = await getArticleImage(keywords)
    if (imageUrl) {
      await updateArticleImage(saved.id, imageUrl)
      console.log(`[Andy Anfield] Image added for: "${parsed.title}"`)
    }
  } catch (error) {
    console.error("[Andy Anfield] Failed to generate article:", error);
    throw error;
  }
}
