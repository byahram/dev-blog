// /app/[category]/[slug]/page.tsx

import { getPostBySlug, getPostSlugs } from "@/utils/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type Props = {
  params: { category: string; slug: string };
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(({ category, slug }) => ({ category, slug }));
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.category, params.slug);
  if (!post) return notFound();

  return (
    <div className="prose mx-auto py-10">
      <h1>{post.frontmatter.title}</h1>
      <MDXRemote source={post.content} />
    </div>
  );
}
