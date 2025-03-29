import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Header } from "@/components/layout/Header";
import { getPostsByCategory, getPostSlugs, BlogPostMeta } from "@/utils/posts";
import Link from "next/link";

const pageInfo = {
  name: "Dashboard",
  title: "Dashboard",
  description: "Snapshot of your endpoints and leads",
};

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts: BlogPostMeta[] = await getPostsByCategory(params.category);

  return (
    <>
      <Breadcrumbs pageName={pageInfo?.name} />
      <div className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full">
        <Header title={pageInfo?.title}>{pageInfo?.description}</Header>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold capitalize">
            {params.category} Posts
          </h1>
          <ul className="mt-4 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="text-blue-600 hover:underline text-xl"
                >
                  {post.title}
                </Link>
                <p className="text-gray-500 text-sm">{post.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function generateStaticParams(): { category: string }[] {
  const slugs = getPostSlugs(); // ✅ 이건 slug + category만 있음!
  const categories = [...new Set(slugs.map((s) => s.category))];

  return categories.map((category) => ({ category }));
}
