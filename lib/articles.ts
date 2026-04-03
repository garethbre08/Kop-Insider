import { supabase } from "./supabase";
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
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
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

export async function getOpinionArticles(limit: number): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_opinion", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
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

export async function insertArticle(article: ArticleInsert): Promise<Article> {
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
}
