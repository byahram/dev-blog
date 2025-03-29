// /utils/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  slug: string;
  category: string;
}

const postsDirectory = path.join(process.cwd(), "src", "posts");

export function getAllPosts(): BlogPostMeta[] {
  const categories = fs.readdirSync(postsDirectory);

  const posts = categories.flatMap((category) => {
    const dir = path.join(postsDirectory, category);
    const files = fs.readdirSync(dir);

    return files.map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.mdx$/, "");

      return {
        ...(data as Omit<BlogPostMeta, "slug" | "category">),
        slug,
        category,
      };
    });
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostSlugs(): { category: string; slug: string }[] {
  const categories = fs.readdirSync(postsDirectory);

  return categories.flatMap((category) => {
    const dir = path.join(postsDirectory, category);
    const files = fs.readdirSync(dir);

    return files.map((filename) => ({
      category,
      slug: filename.replace(/\.mdx$/, ""),
    }));
  });
}

// utils/posts.ts
export async function getPostsByCategory(
  category: string
): Promise<BlogPostMeta[]> {
  const dir = path.join(postsDirectory, category);
  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      ...(data as Omit<BlogPostMeta, "slug" | "category">),
      slug,
      category,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(category: string, slug: string) {
  const filePath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase();

  return getAllPosts().filter(
    (post) =>
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  );
}
