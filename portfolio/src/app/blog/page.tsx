import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  // Server-side data fetching
  const posts = getAllPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thoughts on technology, development, and the journey of building
            digital experiences.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No blog posts yet.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} min read
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full flex items-center gap-1"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Author */}
                    <div className="text-sm text-gray-400">
                      By {post.author}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Results Count */}
        {posts.length > 0 && (
          <div className="mt-12 text-center text-gray-400">
            Showing {posts.length} posts
          </div>
        )}
      </div>
    </div>
  );
}
