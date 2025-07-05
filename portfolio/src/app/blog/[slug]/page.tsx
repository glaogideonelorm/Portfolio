/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft, BookOpen } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: any) {
  const { slug } = params;

  // Server-side data fetching
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="mb-16">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              By {post.author}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full flex items-center gap-1"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-700 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        {formatDate(relatedPost.date)}
                      </div>
                      <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
