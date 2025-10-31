'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { NewsPost } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Pin, 
  PinOff, 
  X, 
  Upload,
  Heart,
  Eye,
  EyeOff,
  Copy,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image_url: '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [deletedPosts, setDeletedPosts] = useState<NewsPost[]>([]);
  const [columnsPerRow, setColumnsPerRow] = useState(3);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  useEffect(() => {
    // Determine columns per row based on window size
    const updateColumns = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) {
        setColumnsPerRow(3); // lg: 3 columns
      } else if (window.innerWidth >= 768) {
        setColumnsPerRow(2); // md: 2 columns
      } else {
        setColumnsPerRow(1); // mobile: 1 column
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setUser(data.user);
    } catch (error: any) {
      setLoginError(error.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      const response = await fetch('/api/news?includeUnpublished=true&includeDeleted=true');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        setPosts([]);
        setDeletedPosts([]);
        return;
      }
      const data = await response.json();
      console.log('Fetched posts:', data.posts);
      console.log('Number of posts:', data.posts?.length || 0);
      
      // Separate deleted and active posts, then sort: pinned first, then by display_order
      const allPosts = data.posts || [];
      const activePosts = allPosts
        .filter((p: NewsPost) => !p.deleted)
        .sort((a: NewsPost, b: NewsPost) => {
          // Pinned posts first
          if (a.is_pinned && !b.is_pinned) return -1;
          if (!a.is_pinned && b.is_pinned) return 1;
          // Then by display_order
          return (a.display_order || 0) - (b.display_order || 0);
        });
      setPosts(activePosts);
      setDeletedPosts(allPosts.filter((p: NewsPost) => p.deleted));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setDeletedPosts([]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadedFileName(file.name);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image_url: data.url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setUploadedFileName('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      console.log('Submitting post:', formData);
      console.log('Auth token:', token ? 'Present' : 'Missing');

      let response;
      if (editingPost) {
        // Update existing post
        response = await fetch('/api/news', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: editingPost.id,
            ...formData,
            updated_at: new Date().toISOString(),
          }),
        });
      } else {
        // Create new post
        response = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            is_pinned: false,
            published: false,
            display_order: posts.length || 0,
          }),
        });
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save post');
      }

      // Reset form
      setFormData({ title: '', author: '', content: '', image_url: '' });
      setUploadedFileName('');
      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert('Failed to save post: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      // Soft delete - set deleted=true
      await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          deleted: true,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          deleted: false,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error restoring post:', error);
      alert('Failed to restore post');
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to PERMANENTLY delete this post? This cannot be undone!')) return;

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      await fetch(`/api/news?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (error) {
      console.error('Error permanently deleting post:', error);
      alert('Failed to permanently delete post');
    }
  };

  const handleDuplicate = async (post: NewsPost) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `${post.title} (Copy)`,
          author: post.author,
          content: post.content,
          image_url: post.image_url,
          is_pinned: false,
          published: false,
          display_order: posts.length || 0,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error duplicating post:', error);
      alert('Failed to duplicate post');
    }
  };

  const handleTogglePin = async (post: NewsPost) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      // If pinning this post, unpin all others first
      if (!post.is_pinned) {
        // Unpin all other posts
        const unpinPromises = posts
          .filter(p => p.is_pinned && p.id !== post.id)
          .map(p => 
            fetch('/api/news', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                id: p.id,
                is_pinned: false,
              }),
            })
          );
        
        await Promise.all(unpinPromises);
      }

      // Toggle pin on the selected post
      await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: post.id,
          is_pinned: !post.is_pinned,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error toggling pin:', error);
      alert('Failed to update post');
    }
  };

  const handleTogglePublish = async (post: NewsPost) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: post.id,
          published: !post.published,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update post');
    }
  };

  const handleEdit = (post: NewsPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      content: post.content,
      image_url: post.image_url || '',
    });
    setUploadedFileName(post.image_url ? 'Current image' : '');
    setShowForm(true);
  };

  const movePost = async (postIndex: number, direction: 'left' | 'right') => {
    // Don't allow moving pinned posts
    if (posts[postIndex].is_pinned) return;
    
    // Calculate which row this post is in
    const currentRow = Math.floor(postIndex / columnsPerRow);
    const currentCol = postIndex % columnsPerRow;
    
    let targetIndex: number;
    
    if (direction === 'left') {
      // Move left within the same row
      if (currentCol === 0) return; // Already at leftmost position
      targetIndex = postIndex - 1;
    } else {
      // Move right within the same row
      targetIndex = postIndex + 1;
      // Check if target is in the same row
      const targetRow = Math.floor(targetIndex / columnsPerRow);
      if (targetRow !== currentRow) return; // Would move to next row
      if (targetIndex >= posts.length) return; // Would go beyond array
    }
    
    // Double-check target is in the same row
    const targetRow = Math.floor(targetIndex / columnsPerRow);
    if (targetRow !== currentRow) return; // Can't move between rows
    
    const items = Array.from(posts);
    const [movedItem] = items.splice(postIndex, 1);
    items.splice(targetIndex, 0, movedItem);

    setPosts(items);

    // Save new order to database
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      await fetch('/api/news/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ posts: items }),
      });
    } catch (error) {
      console.error('Error reordering posts:', error);
      fetchPosts(); // Revert on error
    }
  };

  // Login Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1a365d]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-[#1a365d] mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1a365d] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1a365d] focus:outline-none transition-colors"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#1a365d] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a7c] transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
          {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex justify-between items-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Alzheimer&apos;s LC{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Admin Dashboard</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Action Buttons */}
        <div className="mb-12 flex items-center gap-6">
          <button
            onClick={() => {
              setEditingPost(null);
              setFormData({ title: '', author: '', content: '', image_url: '' });
              setUploadedFileName('');
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
          >
            <Plus className="w-6 h-6" />
            Create New Post
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg border-2 border-slate-200"
          >
            View Site
          </button>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-slate-900">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Image (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-teal-100 text-slate-700 px-4 py-3 rounded-lg cursor-pointer hover:from-blue-200 hover:to-teal-200 transition-all font-semibold">
                        <Upload className="w-5 h-5" />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                      {uploadedFileName && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 text-sm font-semibold">✓</span>
                          <span className="text-slate-600 text-sm">{uploadedFileName}</span>
                        </div>
                      )}
                    </div>
                    {formData.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="mt-4 w-full h-48 object-cover rounded-lg border-2 border-slate-200"
                      />
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
                    >
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts List with Drag & Drop */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-10">
            All Posts <span className="text-slate-500">({posts.length})</span>
          </h2>

          {posts.length === 0 ? (
            <p className="text-slate-500 text-center py-12">
              No posts yet. Create your first post to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                const currentRow = Math.floor(index / columnsPerRow);
                const currentCol = index % columnsPerRow;
                
                // Check if can move left (not at leftmost position)
                const canMoveLeft = !post.is_pinned && currentCol > 0;
                
                // Check if can move right (not at rightmost position AND target is in same row)
                const nextIndex = index + 1;
                const nextRow = Math.floor(nextIndex / columnsPerRow);
                const canMoveRight = !post.is_pinned && 
                                     nextIndex < posts.length && 
                                     nextRow === currentRow;
                
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-slate-200 ${
                      post.is_pinned ? 'ring-2 ring-blue-400' : ''
                    }`}
                  >
                    {/* Arrow Controls */}
                    <div
                      className={`p-4 flex items-center justify-center gap-2 transition-colors ${
                        post.is_pinned 
                          ? 'bg-gradient-to-r from-blue-100 to-teal-100' 
                          : 'bg-slate-100'
                      }`}
                    >
                      {post.is_pinned ? (
                        <span className="text-xs text-slate-600 font-semibold">
                          Pinned to top
                        </span>
                      ) : (
                        <>
                          <motion.button
                            onClick={() => movePost(index, 'left')}
                            disabled={!canMoveLeft}
                            whileHover={canMoveLeft ? { scale: 1.1 } : {}}
                            whileTap={canMoveLeft ? { scale: 0.9 } : {}}
                            className={`p-2 rounded-lg transition-all ${
                              canMoveLeft
                                ? 'bg-white text-slate-700 hover:bg-blue-500 hover:text-white shadow-sm hover:shadow-md'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                            title="Move left"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </motion.button>
                          <span className="text-xs text-slate-600 font-semibold px-2">
                            Reorder
                          </span>
                          <motion.button
                            onClick={() => movePost(index, 'right')}
                            disabled={!canMoveRight}
                            whileHover={canMoveRight ? { scale: 1.1 } : {}}
                            whileTap={canMoveRight ? { scale: 0.9 } : {}}
                            className={`p-2 rounded-lg transition-all ${
                              canMoveRight
                                ? 'bg-white text-slate-700 hover:bg-blue-500 hover:text-white shadow-sm hover:shadow-md'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                            title="Move right"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                      {post.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <Heart className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 text-lg mb-3">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">
                        By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-slate-600 line-clamp-2 text-sm mb-6 leading-relaxed">
                        {post.content}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 pt-3 border-t border-slate-200">
                        {/* Row 1: Edit and Publish */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all font-semibold text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleTogglePublish(post)}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all font-semibold text-sm ${
                              post.published
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            {post.published ? (
                              <>
                                <Eye className="w-4 h-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4" />
                                Publish
                              </>
                            )}
                          </button>
                        </div>
                        
                        {/* Row 2: Duplicate, Pin, and Delete */}
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => handleDuplicate(post)}
                            className="flex items-center justify-center gap-1 py-2 px-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs font-semibold"
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleTogglePin(post)}
                            className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg transition-all text-xs font-semibold ${
                              post.is_pinned
                                ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {post.is_pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                            {post.is_pinned ? 'Unpin' : 'Pin'}
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center justify-center gap-1 py-2 px-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-semibold"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Deleted Posts Section */}
        {deletedPosts.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 mt-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-10">
              Deleted Posts <span className="text-slate-500">({deletedPosts.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deletedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 rounded-3xl shadow-xl overflow-hidden border-2 border-red-200 opacity-75"
                >
                  {/* Deleted Badge */}
                  <div className="bg-red-100 p-3 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <span className="text-xs text-red-600 ml-2 font-semibold">Deleted</span>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {post.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <Heart className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-slate-600 line-clamp-2 text-sm mb-6 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => handleRestore(post.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all font-semibold text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Restore
                      </button>
                      
                      <button
                        onClick={() => handlePermanentDelete(post.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

