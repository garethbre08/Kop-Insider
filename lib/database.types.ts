export type ArticleCategory =
  | "news"
  | "transfers"
  | "injuries"
  | "opinion"
  | "match-reaction";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  source_journalist: string;
  source_outlet: string;
  source_url: string;
  created_at: string;
  is_opinion: boolean;
  is_featured: boolean;
  image_url: string | null;
  match_related: boolean;
};

export type ArticleInsert = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  source_journalist: string;
  source_outlet: string;
  source_url: string;
  created_at?: string;
  is_opinion?: boolean;
  is_featured?: boolean;
  image_url?: string | null;
  match_related?: boolean;
};

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: ArticleInsert;
        Update: Partial<ArticleInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
