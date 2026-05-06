'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FORUM_POSTS, REPLIES, CURRENT_USER, getLoggedInUser } from '@/lib/mock-data';
import { 
  Heart, 
  Link as LinkIcon, 
  Share2, 
  Reply as ReplyIcon, 
  MoreHorizontal, 
  ChevronLeft,
  Users,
  Eye,
  MessageSquare,
  Clock,
  History,
  X,
  Check,
  Send,
  Edit2,
  Trash2,
  Share2 as FacebookIcon,
  Camera as InstagramIcon,
  MessageCircle as ZaloIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const loadData = () => {
    setUser(getLoggedInUser());

    // Load Post
    const savedPosts = localStorage.getItem('forum_posts');
    const postsList = savedPosts ? JSON.parse(savedPosts) : FORUM_POSTS;
    const foundPost = postsList.find((p: any) => p.id === id);
    setPost(foundPost);

    // Load Replies
    const savedReplies = localStorage.getItem(`forum_replies_${id}`);
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    } else {
      const initialReplies = REPLIES.filter(r => r.post_id === id);
      setReplies(initialReplies);
      localStorage.setItem(`forum_replies_${id}`, JSON.stringify(initialReplies));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      post_id: id,
      author_id: user.id,
      content: replyText,
      created_at: new Date().toISOString(),
      likes: 0,
      edit_history: []
    };

    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    localStorage.setItem(`forum_replies_${id}`, JSON.stringify(updatedReplies));
    setReplyText('');
  };

  const handleUpdatePost = (updatedPost: any) => {
    const savedPosts = localStorage.getItem('forum_posts');
    const postsList = savedPosts ? JSON.parse(savedPosts) : FORUM_POSTS;
    const updatedPosts = postsList.map((p: any) => p.id === updatedPost.id ? updatedPost : p);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
    setPost(updatedPost);
  };

  const handleUpdateReply = (updatedReply: any) => {
    const updatedReplies = replies.map((r: any) => r.id === updatedReply.id ? updatedReply : r);
    setReplies(updatedReplies);
    localStorage.setItem(`forum_replies_${id}`, JSON.stringify(updatedReplies));
  };

  const handleDeletePost = (postId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    
    const savedPosts = localStorage.getItem('forum_posts');
    const postsList = savedPosts ? JSON.parse(savedPosts) : FORUM_POSTS;
    const updatedPosts = postsList.filter((p: any) => p.id !== postId);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
    router.push('/dashboard/forum');
  };

  const handleDeleteReply = (replyId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;
    
    const updatedReplies = replies.filter((r: any) => r.id !== replyId);
    setReplies(updatedReplies);
    localStorage.setItem(`forum_replies_${id}`, JSON.stringify(updatedReplies));
  };

  if (loading) return <div className="p-20 text-center font-bold">Đang tải...</div>;
  if (!post) return <div className="p-20 text-center font-bold">Không tìm thấy bài viết</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-uel-blue transition-colors">
          <ChevronLeft size={16} /> QUAY LẠI
        </button>
        <span>/</span>
        <span className="text-uel-blue">{post.category}</span>
      </div>

      {/* Title Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="p-3 bg-slate-50 hover:bg-uel-blue hover:text-white rounded-xl transition-all text-slate-400"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Main Post */}
      <ForumPostItem 
        post={post}
        isOriginalPost
        onShare={() => setIsShareModalOpen(true)}
        onUpdate={handleUpdatePost}
        onDelete={() => handleDeletePost(post.id)}
      />

      {/* Topic Map / Stats Section */}
      <div className="bg-slate-50 border-y border-slate-100 p-6 flex flex-wrap gap-12 items-center">
        <StatItem icon={Clock} label="Ngày tạo" value="Tháng 4, 2024" />
        <StatItem icon={Eye} label="Lượt xem" value="1.2k" />
        <StatItem icon={Users} label="Người tham gia" value="8" />
        <StatItem icon={MessageSquare} label="Phản hồi" value={replies.length.toString()} />
        <StatItem icon={Heart} label="Lượt thích" value={post.likes.toString()} />
      </div>

      {/* Replies Stream */}
      <div className="space-y-6">
        {replies.map((reply) => (
          <ForumPostItem 
            key={reply.id}
            post={reply}
            onShare={() => setIsShareModalOpen(true)}
            onUpdate={handleUpdateReply}
            onDelete={() => handleDeleteReply(reply.id)}
          />
        ))}
      </div>

      {/* Quick Reply Box / Login Prompt */}
      <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 mt-12">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <MessageSquare size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Tham gia thảo luận ngay</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Đăng nhập để chia sẻ ý kiến và đặt câu hỏi cho cộng đồng.</p>
            </div>
            <Link 
              href="/login"
              className="bg-uel-blue text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all"
            >
              ĐĂNG NHẬP ĐỂ PHẢN HỒI
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-uel-blue flex items-center justify-center text-white font-black text-xs overflow-hidden">
              {user.avatar_url ? <img src={user.avatar_url} alt="Me" className="w-full h-full object-cover" /> : user.full_name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 space-y-4">
              <textarea 
                rows={4} 
                placeholder="Viết phản hồi của bạn..."
                className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-uel-blue/10 outline-none resize-none"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end">
                <button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="bg-uel-blue text-white px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-uel-blue/20 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  GỬI PHẢN HỒI
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsShareModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-900 uppercase tracking-tight">Chia sẻ bài viết</h3>
                <button onClick={() => setIsShareModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 grid grid-cols-3 gap-4">
                <ShareOption icon={FacebookIcon} label="Facebook" color="bg-[#1877F2]" />
                <ShareOption icon={InstagramIcon} label="Instagram" color="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" />
                <ShareOption icon={ZaloIcon} label="Zalo" color="bg-[#0068FF]" />
              </div>
              <div className="p-6 pt-0">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 truncate flex-1 mr-4">
                    https://mentor-portal.uel.edu.vn/forum/{id}
                  </span>
                  <button className="text-[10px] font-black text-uel-blue uppercase whitespace-nowrap">Sao chép</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ForumPostItem({ post, isOriginalPost, onShare, onUpdate, onDelete }: { post: any, isOriginalPost?: boolean, onShare?: () => void, onUpdate?: (post: any) => void, onDelete?: () => void }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);

  const isMyPost = user && (post.author_id === user.id);

  const handleLike = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim() || editContent === post.content) {
      setIsEditing(false);
      return;
    }

    const newHistoryEntry = {
      content: post.content,
      edited_at: new Date().toISOString()
    };

    const updatedPost = {
      ...post,
      content: editContent,
      edit_history: [...(post.edit_history || []), newHistoryEntry]
    };

    onUpdate?.(updatedPost);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-6 group relative">
      <div className="w-16 flex flex-col items-center gap-2 flex-shrink-0">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author_id}`} 
          className="w-12 h-12 rounded-full border-2 border-white shadow-md ring-2 ring-slate-100" 
          alt="Avatar" 
        />
        <div className="w-[2px] h-full bg-slate-100 group-last:bg-transparent" />
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-sm text-uel-blue uppercase">{post.author_id}</span>
            <span className="text-xs font-bold text-slate-300">•</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {new Date(post.created_at).toLocaleDateString('vi-VN')}
            </span>
            {isOriginalPost && (
              <span className="px-2 py-0.5 bg-uel-orange/10 text-uel-orange text-[8px] font-black uppercase rounded">Tác giả</span>
            )}
            {post.edit_history && post.edit_history.length > 0 && (
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[8px] font-black uppercase rounded transition-colors"
              >
                <History size={10} /> Đã chỉnh sửa
              </button>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-slate-300 hover:text-slate-600 transition-colors p-1"
            >
              <MoreHorizontal size={18} />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-40 overflow-hidden"
                  >
                    {isMyPost && (
                      <>
                        <button 
                          onClick={() => { setIsEditing(true); setShowMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          <Edit2 size={14} className="text-uel-blue" /> Chỉnh sửa bài viết
                        </button>
                        <button 
                          onClick={() => { onDelete?.(); setShowMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 size={14} /> Xóa bài viết
                        </button>
                        <div className="h-[1px] bg-slate-50" />
                      </>
                    )}
                    <button 
                      onClick={() => { setShowHistory(true); setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Clock size={14} /> Xem lịch sử
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea 
              className="w-full p-4 bg-slate-50 border-2 border-uel-blue/20 rounded-xl text-sm font-medium focus:ring-0 outline-none resize-none"
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-black text-slate-400 uppercase hover:text-slate-600 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-uel-blue text-white rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-uel-blue/20"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-700 leading-relaxed font-medium">
            {post.content}

            {/* Image Grid */}
            {post.images && post.images.length > 0 && (
              <div className={cn(
                "grid gap-2 mt-4 rounded-xl overflow-hidden",
                post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              )}>
                {post.images.map((img: string, i: number) => (
                  <img 
                    key={i} 
                    src={img} 
                    className="w-full h-full object-cover max-h-[400px] border border-slate-100 rounded-lg" 
                    alt="Post attachment" 
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-50 mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-[11px] font-black",
              liked ? "bg-rose-50 text-rose-600" : "hover:bg-rose-50 hover:text-rose-600 text-slate-400"
            )}
          >
            <Heart size={14} fill={liked ? "currentColor" : "none"} /> {likeCount}
          </button>
          <button 
            onClick={() => !user ? router.push('/login') : null}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-blue-50 hover:text-uel-blue rounded-lg transition-all text-[11px] font-black text-slate-400"
          >
            <ReplyIcon size={14} /> Trả lời
          </button>
          <button 
            onClick={handleCopy}
            className={cn(
              "p-1.5 rounded-lg transition-all flex items-center gap-1",
              copied ? "bg-emerald-50 text-emerald-600" : "hover:bg-slate-50 text-slate-300 hover:text-slate-600"
            )}
          >
            {copied ? <Check size={14} /> : <LinkIcon size={14} />}
            {copied && <span className="text-[10px] font-black uppercase">Copied</span>}
          </button>
          <button 
            onClick={onShare}
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-slate-300 hover:text-slate-600"
          >
            <Share2 size={14} />
          </button>
        </div>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black text-uel-blue uppercase tracking-widest flex items-center gap-2">
                  <History size={16} /> LỊCH SỬ CHỈNH SỬA
                </h3>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={18} className="text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {post.edit_history?.map((entry: any, i: number) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-200" />
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                      {new Date(entry.edited_at).toLocaleString('vi-VN')}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 font-medium leading-relaxed italic">
                      "{entry.content}"
                    </div>
                  </div>
                ))}
                <div className="relative pl-6 border-l-2 border-uel-blue/20">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-uel-blue" />
                  <p className="text-[10px] font-black text-uel-blue uppercase mb-2">Hiện tại</p>
                  <div className="bg-uel-blue/5 p-4 rounded-xl text-xs text-slate-800 font-bold leading-relaxed">
                    "{post.content}"
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ShareOption({ icon: Icon, label, color }: any) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110", color)}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase">{label}</span>
    </button>
  );
}

function StatItem({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
        <Icon size={10} /> {label}
      </p>
      <p className="text-xs font-black text-slate-700">{value}</p>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
