import { supabase, supabaseAdmin } from "./supabase";
import type { Article, ArticleCategory, ArticleInsert } from "./database.types";

export async function getLatestArticles(limit: number): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('getFeaturedArticle error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('getFeaturedArticle exception:', error)
    return null
  }
}

export async function getArticlesByCategory(
  category: ArticleCategory,
  limit: number
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getOpinionArticles(limit: number = 5): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_opinion', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('getOpinionArticles error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('getOpinionArticles exception:', error)
    return []
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}

export async function insertArticle(article: ArticleInsert): Promise<Article | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert(article)
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Insert exception:', error)
    return null
  }
}

export async function updateArticleImage(id: string, imageUrl: string) {
  const { error } = await supabaseAdmin
    .from('articles')
    .update({ image_url: imageUrl })
    .eq('id', id)
  if (error) console.error('Image update error:', error)
}
