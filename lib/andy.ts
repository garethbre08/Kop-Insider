import Anthropic from "@anthropic-ai/sdk";
import { insertArticle, updateArticleImage } from "./articles";
import { selectArticleImage } from "./imageUtils";
import type { ArticleCategory } from "./database.types";

async function fetchAndSaveImage(articleId: string, title: string, category: string, content: string): Promise<void> {
  const image = await selectArticleImage(title, content, category, articleId)
  if (image) {
    await updateArticleImage(articleId, image)
    console.log(`[Andy Anfield] Image saved for: "${title}" — ${image}`)
  } else {
    console.log(`[Andy Anfield] No image found for: "${title}"`)
  }
}

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
- Never use an em dash (—) in article titles or anywhere in your writing. Instead use a colon, comma, or rewrite the sentence to avoid it entirely. For example instead of 'Liverpool's ticket price fight isn't just about us — it's about football's soul' write 'Liverpool's ticket price fight: it's about football's soul' or 'Liverpool's ticket price fight is about more than just us'
- Always write in UK English. Use British spellings throughout: colour not color, favourite not favorite, defence not defense, organised not organized, recognise not recognize, travelling not traveling, centre not center, licence not license, practise not practice (verb), cheque not check, tyre not tire, programme not program, whilst not while, amongst not among
- Use British football terminology: match not game, pitch not field, nil not zero for scores, boots not cleats, kit not uniform, manager not coach, fixture not schedule, supporter not fan where appropriate
- Refer to competitions correctly: Premier League, Champions League, FA Cup, Carabao Cup — never use Soccer or other American terms
- Use British date format where needed: day month year
- Never use Americanisms in any article

Your golden rule:
The truth about Liverpool, told by someone who actually cares.

Important: If the source article is not primarily about Liverpool FC, do not write about it. Return a JSON error response instead.

When categorising articles as injuries, only use this category if the article is PRIMARILY about a specific player being injured, returning from injury, or a fitness update. Articles about poor performances, tactical failures, or general match analysis should NEVER be categorised as injuries even if they mention physical effort or players being exhausted. If in doubt categorise as news not injuries.

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
  originalImageUrl?: string | null;
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

    if (!parsed.title || !parsed.content || !parsed.excerpt) {
      throw new Error(`[Andy Anfield] Incomplete article response — missing title, content or excerpt. Skipping.`);
    }

    const insertedArticle = await insertArticle({
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category: parsed.category as ArticleCategory,
      is_opinion: parsed.category === 'opinion' || parsed.is_opinion === true,
      is_featured: params.isFeatured || false,
      source_journalist: params.sourceJournalist,
      source_outlet: params.sourceOutlet,
      source_url: params.sourceUrl,
      image_url: null,
      match_related: false,
    });

    console.log(`[Andy Anfield] Article generated: "${parsed.title}"`);

    if (insertedArticle?.id) {
      if (params.originalImageUrl) {
        console.log(`[Andy Anfield] Using original article image`)
        await updateArticleImage(insertedArticle.id, params.originalImageUrl)
        console.log(`[Andy Anfield] Image added for: "${parsed.title}"`)
      } else {
        await fetchAndSaveImage(insertedArticle.id, parsed.title, parsed.category, parsed.content)
      }
    }
  } catch (error) {
    console.error("[Andy Anfield] Failed to generate article:", error);
    throw error;
  }
}
