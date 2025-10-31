'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Link as LinkIcon, Hash } from 'lucide-react';
import type { NewsPost } from '@/lib/supabase';

export default function NewsFeed() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        setPosts([]);
        return;
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-3s"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Latest News &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Updates</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed text-center">
            Stay informed about the latest developments in lipid management and cardiovascular health
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <p className="text-lg">No news articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden cursor-pointer h-full group-hover:scale-105 flex flex-col"
                  onClick={() => setSelectedPost(post)}
                >
                              {/* Image */}
                              <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {post.image_url ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                    <Heart className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                                  </div>
                                )}
                                {post.is_pinned && (
                                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                    Pinned
                                  </div>
                                )}
                              </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">By {post.author}</p>
                    <p className="text-slate-600 line-clamp-3 text-sm mb-4">
                      {truncateText(post.content, 120)}
                    </p>
                    
                    {/* Links and Hashtags */}
                    {(post.links && post.links.length > 0) || (post.hashtags && post.hashtags.length > 0) ? (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.links && post.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.startsWith('http') ? link : `https://${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors border border-blue-200/50"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            <span className="max-w-[120px] truncate">{link}</span>
                          </a>
                        ))}
                        {post.hashtags && post.hashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-teal-200/50"
                          >
                            <Hash className="w-3.5 h-3.5" />
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    
                    <div className="mt-auto text-blue-700 font-semibold text-sm group-hover:text-blue-800 transition-colors">
                      Read More →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="sticky top-0 z-20 flex justify-end p-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

                  {/* Image */}
                  <div className="relative h-64 md:h-96 bg-gray-200 -mt-16 flex items-center justify-center overflow-hidden">
                    {selectedPost.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedPost.image_url}
                        alt={selectedPost.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <Heart className="w-24 h-24 text-gray-400" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

              {/* Content */}
              <div className="p-8">
                {selectedPost.is_pinned && (
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Pinned Article
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  {selectedPost.title}
                </h2>
                <p className="text-slate-500 mb-6">
                  By {selectedPost.author} • {new Date(selectedPost.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedPost.content}
                </div>

                {/* Links and Hashtags */}
                {(selectedPost.links && selectedPost.links.length > 0) || (selectedPost.hashtags && selectedPost.hashtags.length > 0) ? (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex flex-wrap gap-3">
                      {selectedPost.links && selectedPost.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors border border-blue-200/50"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span className="max-w-[200px] truncate">{link}</span>
                        </a>
                      ))}
                      {selectedPost.hashtags && selectedPost.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium border border-teal-200/50"
                        >
                          <Hash className="w-4 h-4" />
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

