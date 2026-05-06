'use client';

import React, { useState, useRef } from 'react';
import { FORUM_POSTS, MENTORS, getLoggedInUser, logUserActivity } from '@/lib/mock-data';
import { 
  ThumbsUp, 
  MessageSquare, 
  Tag, 
  Plus, 
  Search, 
  Flame, 
  Clock, 
  TrendingUp, 
  Folder, 
  ChevronDown, 
  Filter, 
  MoreVertical,
  LayoutGrid,
  List as ListIcon,
  Menu,
  Image as ImageIcon,
  Smile,
  X,
  Plus as PlusIcon,
  AtSign,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const EMOJIS = ['😀', '😍', '🚀', '🔥', '👏', '💡', '🙌', '💯', '🤔', '👍', '🎓', '💼', '💙', '🧡'];

export default function ForumPage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState(FORUM_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [selectedTag, setSelectedTag] = useState('Tất cả các thẻ');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [activeSort, setActiveSort] = useState('Mới nhất');

  // Load posts from localStorage or mock data
  React.useEffect(() => {
    setUser(getLoggedInUser());
    const savedPosts = localStorage.getItem('forum_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(FORUM_POSTS);
      localStorage.setItem('forum_posts', JSON.stringify(FORUM_POSTS));
    }
  }, []);

  const categories = ['Tất cả danh mục', ...Array.from(new Set(FORUM_POSTS.map(p => p.category || 'Chưa phân loại')))];
  const tags = ['Tất cả các thẻ', ...Array.from(new Set(FORUM_POSTS.flatMap(p => p.tags)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả danh mục' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'Tất cả các thẻ' || post.tags?.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleCreatePost = (newPost: any) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
    
    // Log activity to user profile
    logUserActivity({
      type: 'post',
      title: `Đã đăng bài viết: ${newPost.title}`,
      description: `Bạn vừa chia sẻ một thảo luận mới trong danh mục ${newPost.category}.`
    });
    
    setIsCreateModalOpen(false);
  };

  const isGuest = !user;

  return (
    <div className="max-w-7xl mx-auto flex gap-8 pb-20">
      
      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            className="w-64 hidden lg:block space-y-8"
          >
            <div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4 flex items-center justify-between">
                DANH MỤC <ChevronDown size={14} />
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all",
                      selectedCategory === cat ? "bg-uel-blue text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4 flex items-center justify-between">
                THẺ PHỔ BIẾN <Tag size={14} />
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 8).map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-black border transition-all",
                      selectedTag === tag 
                        ? "bg-uel-orange border-uel-orange text-white" 
                        : "bg-white border-slate-200 text-slate-500 hover:border-uel-blue"
                    )}
                  >
                    #{tag === 'Tất cả các thẻ' ? 'All' : tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Forum Content */}
      <div className="flex-1 space-y-6">
        
        {/* Interaction Prompt / Post Input */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          {isGuest ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase">Bạn muốn tham gia thảo luận?</h4>
                  <p className="text-xs font-medium text-slate-500">Đăng nhập ngay để bắt đầu chia sẻ kiến thức của bạn.</p>
                </div>
              </div>
              <Link 
                href="/login"
                className="bg-uel-blue text-white px-8 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-uel-blue/20 hover:brightness-110 transition-all"
              >
                ĐĂNG NHẬP NGAY
              </Link>
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <img 
                  src={user.avatar_url} 
                  className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm" 
                  alt="Avatar" 
                />
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 transition-colors rounded-full px-6 py-2.5 text-left text-slate-500 text-sm font-medium border border-slate-100"
                >
                  {user.full_name} ơi, bạn đang nghĩ gì thế?
                </button>
              </div>
              <div className="h-[1px] bg-slate-50" />
              <div className="flex justify-between px-2">
                <QuickActionButton onClick={() => setIsCreateModalOpen(true)} icon={ImageIcon} label="Ảnh/Video" color="text-emerald-500" />
                <QuickActionButton onClick={() => setIsCreateModalOpen(true)} icon={AtSign} label="Gắn thẻ" color="text-uel-blue" />
                <QuickActionButton onClick={() => setIsCreateModalOpen(true)} icon={Smile} label="Cảm xúc" color="text-uel-orange" />
              </div>
            </>
          )}
        </div>

        {/* UIT Style Header Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <TabButton label="Mới nhất" active={activeSort === 'Mới nhất'} onClick={() => setActiveSort('Mới nhất')} />
              <TabButton label="Hot" active={activeSort === 'Hot'} onClick={() => setActiveSort('Hot')} />
              <TabButton label="Hàng đầu" active={activeSort === 'Hàng đầu'} onClick={() => setActiveSort('Hàng đầu')} />
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block" />

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm thảo luận..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-uel-blue transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewType('grid')}
                className={cn("p-1.5 rounded-md transition-all", viewType === 'grid' ? "bg-slate-100 text-uel-blue shadow-sm" : "hover:bg-slate-50")}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={cn("p-1.5 rounded-md transition-all", viewType === 'list' ? "bg-slate-100 text-uel-blue shadow-sm" : "hover:bg-slate-50")}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Topic List / Grid */}
        {viewType === 'list' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-slate-50/50 border-b border-slate-200 px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
              <div className="col-span-7">CHỦ ĐỀ</div>
              <div className="col-span-2 text-center">DANH MỤC</div>
              <div className="col-span-1 text-center">TRẢ LỜI</div>
              <div className="col-span-2 text-right">HOẠT ĐỘNG</div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/dashboard/forum/${post.id}`}
                  className="grid grid-cols-12 px-6 py-5 items-center hover:bg-slate-50/50 transition-all group cursor-pointer"
                >
                  <div className="col-span-12 md:col-span-7 flex gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author_id}`} className="w-10 h-10 rounded-full border-2 border-slate-100" alt="Avatar" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-uel-blue transition-colors line-clamp-1 flex items-center gap-2">
                        {post.title}
                        {post.images && post.images.length > 0 && <ImageIcon size={14} className="text-emerald-500" />}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2].map(i => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white bg-slate-200" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{post.tags?.slice(0, 2).map((t: any) => `#${t}`).join(' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex col-span-2 justify-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded border border-slate-200">
                      {post.category}
                    </span>
                  </div>

                  <div className="hidden md:block col-span-1 text-center">
                    <span className="text-xs font-black text-slate-700">{post.replies_count}</span>
                  </div>

                  <div className="hidden md:block col-span-2 text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.div 
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <Link href={`/dashboard/forum/${post.id}`}>
                  {post.images && post.images.length > 0 ? (
                    <div className="aspect-video w-full overflow-hidden">
                      <img src={post.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-gradient-to-br from-uel-blue/5 to-uel-orange/5 flex items-center justify-center">
                      <div className="text-uel-blue/20"><MessageSquare size={48} /></div>
                    </div>
                  )}
                  
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 group-hover:text-uel-blue transition-colors line-clamp-2 h-10">
                      {post.title}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author_id}`} className="w-6 h-6 rounded-full border border-slate-100" alt="Author" />
                        <span className="text-[10px] font-bold text-slate-600">User-{post.author_id.slice(-4)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-slate-400">
                          <MessageSquare size={12} />
                          <span className="text-[10px] font-bold">{post.replies_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <ThumbsUp size={12} />
                          <span className="text-[10px] font-bold">{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create Post Modal - Facebook Style */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="w-8" />
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Tạo bài viết</h2>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={user.avatar_url} className="w-10 h-10 rounded-full" alt="Me" />
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-none">{user.full_name}</p>
                  </div>
                </div>

                <CreatePostForm user={user} onSubmit={handleCreatePost} categories={categories.filter(c => c !== 'Tất cả danh mục')} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function CreatePostForm({ user, onSubmit, categories }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [images, setImages] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const insertAtCursor = (text: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newContent = content.substring(0, start) + text + content.substring(end);
    setContent(newContent);
    // Reset focus and cursor position after render
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + text.length;
      }
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author_id: user.id,
      title,
      content,
      tags: ['New'],
      category,
      created_at: new Date().toISOString(),
      likes: 0,
      replies_count: 0,
      images: images
    };

    onSubmit(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <input 
        type="text" 
        placeholder="Tiêu đề thảo luận..." 
        className="w-full text-lg font-bold placeholder:text-slate-300 outline-none border-none focus:ring-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea 
        ref={textareaRef}
        placeholder={`${user.full_name} ơi, bạn đang nghĩ gì thế?`}
        className="w-full min-h-[120px] text-base font-medium placeholder:text-slate-300 outline-none border-none focus:ring-0 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Image Preview Area */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-100">
              <img src={img} className="w-full h-full object-cover" alt="Preview" />
              <button 
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-uel-blue hover:text-uel-blue transition-all"
          >
            <PlusIcon size={24} />
            <span className="text-[10px] font-black uppercase mt-1">Thêm ảnh</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl relative">
        <p className="text-xs font-black text-slate-400 uppercase flex-1">Thêm vào bài viết</p>
        <div className="flex gap-4 items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload} 
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="hover:scale-110 transition-transform">
            <ImageIcon size={22} className="text-emerald-500 cursor-pointer" />
          </button>
          
          <div className="relative">
            <button type="button" onClick={() => setShowTagPicker(!showTagPicker)} className="hover:scale-110 transition-transform">
              <AtSign size={22} className="text-uel-blue cursor-pointer" />
            </button>
            <AnimatePresence>
              {showTagPicker && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-4 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 p-2 overflow-hidden"
                >
                  <p className="text-[9px] font-black text-slate-400 uppercase p-2 border-b border-slate-50 mb-1">Gắn thẻ Mentor</p>
                  <div className="max-h-40 overflow-y-auto custom-scrollbar">
                    {MENTORS.map(m => (
                      <button 
                        key={m.id}
                        type="button"
                        onClick={() => { insertAtCursor(` @${m.id} `); setShowTagPicker(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <User size={12} className="text-uel-blue" />
                        <span className="text-[10px] font-bold text-slate-700">{m.id}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="hover:scale-110 transition-transform">
              <Smile size={22} className="text-uel-orange cursor-pointer" />
            </button>
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-4 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 p-3"
                >
                  <div className="grid grid-cols-4 gap-2">
                    {EMOJIS.map(emoji => (
                      <button 
                        key={emoji}
                        type="button"
                        onClick={() => { insertAtCursor(emoji); setShowEmojiPicker(false); }}
                        className="text-xl hover:scale-125 transition-transform p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chọn danh mục</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: string) => (
            <button 
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border",
                category === cat ? "bg-uel-blue border-uel-blue text-white shadow-md" : "bg-white border-slate-100 text-slate-500 hover:border-uel-blue"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button 
        type="submit"
        disabled={!title || !content}
        className="w-full py-3 bg-uel-blue text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all disabled:opacity-50 disabled:shadow-none"
      >
        ĐĂNG BÀI
      </button>
    </form>
  );
}

function QuickActionButton({ icon: Icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors group">
      <Icon size={20} className={color} />
      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900">{label}</span>
    </button>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-md text-[11px] font-black transition-all uppercase tracking-wider",
        active ? "bg-white text-uel-blue shadow-sm" : "text-slate-500 hover:text-slate-900"
      )}
    >
      {label}
    </button>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
