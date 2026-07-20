import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Forum.css';

// Import avatars for rich aesthetics
import avatarMale1 from '../assets/avatar-male-1.png';
import avatarMale2 from '../assets/avatar-male-2.png';
import avatarFemale1 from '../assets/avatar-female-1.png';
import avatarFemale2 from '../assets/avatar-female-2.png';

// SVG Icon Helper Component (Lucide-inspired clean line-art)
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    all: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    general: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    mentorMentee: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    materials: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    jobs: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    comment: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
    flag: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    paperclip: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    trending: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    back: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
      </svg>
    )
  };
  return icons[name] || null;
};

// Categories list
const CATEGORIES = [
  { id: 'all', label: 'Tất cả chủ đề', icon: 'all' },
  { id: 'general', label: 'Thảo luận chung', icon: 'general' },
  { id: 'mentor-mentee', label: 'Góc Mentor-Mentee', icon: 'mentorMentee' },
  { id: 'materials', label: 'Tài liệu học tập', icon: 'materials' },
  { id: 'jobs', label: 'Cơ hội việc làm', icon: 'jobs' }
];

// Initial mock threads data
const INITIAL_THREADS = [
  {
    id: 1,
    title: 'Tổng hợp tài liệu môn Hệ quản trị Cơ sở dữ liệu (SQL Server/Oracle) - UEL',
    category: 'materials',
    author: 'Trần Minh Đức',
    authorRole: 'mentor',
    authorAvatar: avatarMale1,
    time: '2 giờ trước',
    snippet: 'Xin chào các bạn mentee, mình tổng hợp lại toàn bộ slide bài giảng, đề thi mẫu và file script thực hành môn Hệ quản trị CSDL của Khoa HTTT. Các bạn tải file đính kèm bên dưới nhé. Chúc các bạn học tốt và đạt điểm cao!',
    views: 142,
    replies: 4,
    attachments: [
      { name: 'De_Thi_Mau_HQT_CSDL_UEL.pdf', size: '2.4 MB' },
      { name: 'Script_Thuc_Hanh_Trigger_StoreProcedure.sql', size: '45 KB' }
    ]
  },
  {
    id: 2,
    title: 'Kinh nghiệm ứng tuyển vị trí Business Analyst (BA) tại VNG & MOMO',
    category: 'jobs',
    author: 'Nguyễn Thị Thanh Hà',
    authorRole: 'mentor',
    authorAvatar: avatarFemale1,
    time: '1 ngày trước',
    snippet: 'Là một cựu sinh viên Khoa HTTT UEL hiện đang làm Senior BA tại VNG, mình muốn chia sẻ quy trình tuyển dụng và các bộ kỹ năng cứng/mềm quan trọng mà nhà tuyển dụng yêu cầu. MentorXMentee năm nay sẽ hỗ trợ review CV chi tiết cho các bạn đăng ký nhé.',
    views: 310,
    replies: 12,
    attachments: [
      { name: 'Roadmap_tro_thanh_BA_2026.pdf', size: '1.8 MB' }
    ]
  },
  {
    id: 3,
    title: 'Những câu hỏi thường gặp trong buổi gặp mặt (First Meeting) giữa Mentor và Mentee',
    category: 'mentor-mentee',
    author: 'Huỳnh Gia Bảo',
    authorRole: 'mentee',
    authorAvatar: avatarMale2,
    time: '3 ngày trước',
    snippet: 'Em mới được kết nối với một anh Mentor siêu xịn, nhưng em hơi lo lắng không biết buổi đầu tiên nên chuẩn bị những câu hỏi gì để buổi chia sẻ hiệu quả nhất. Mọi người có thể gợi ý cho em một số chủ đề thảo luận được không ạ?',
    views: 95,
    replies: 3,
    attachments: []
  },
  {
    id: 4,
    title: 'Thông tin học bổng trao đổi sinh viên tại ĐH Quốc gia Singapore (NUS) kì tới',
    category: 'general',
    author: 'Admin Khoa HTTT',
    authorRole: 'admin',
    authorAvatar: avatarFemale2,
    time: '5 ngày trước',
    snippet: 'Khoa HTTT thông báo chỉ tiêu học bổng trao đổi học thuật cho sinh viên K22, K23 tại NUS. Điều kiện xét tuyển bao gồm GPA trên 8.5, IELTS 6.5 trở lên. Chi tiết đơn đăng ký và file hướng dẫn đính kèm bên dưới.',
    views: 220,
    replies: 7,
    attachments: [
      { name: 'Huong_Dan_Dang_Ky_Exchange_NUS.pdf', size: '3.1 MB' }
    ]
  }
];

// Initial mock comments data
const INITIAL_COMMENTS = {
  1: [
    {
      id: 101,
      author: 'Nguyễn Ngọc Trường Giang',
      authorRole: 'mentee',
      authorAvatar: avatarMale2,
      time: '1 giờ trước',
      content: 'Tài liệu hữu ích quá anh ơi! Em đang bối rối phần Trigger mà xem bài thực hành của anh là hiểu ngay. Cảm ơn anh Đức nhiều ạ!',
      attachments: []
    },
    {
      id: 102,
      author: 'Đặng Quỳnh Nhi',
      authorRole: 'mentee',
      authorAvatar: avatarFemale2,
      time: '45 phút trước',
      content: 'Cho em hỏi đề thi mẫu này có đáp án chi tiết không anh? Nếu có anh cho em xin để đối chiếu kết quả với nhé.',
      attachments: []
    },
    {
      id: 103,
      author: 'Trần Minh Đức',
      authorRole: 'mentor',
      authorAvatar: avatarMale1,
      time: '30 phút trước',
      content: 'Chào Giang và Nhi nhé. File đáp án chi tiết anh đang cập nhật nốt, chiều nay anh sẽ đính kèm thêm vào bài đăng luôn nhé.',
      attachments: []
    }
  ],
  2: [
    {
      id: 201,
      author: 'Huỳnh Gia Bảo',
      authorRole: 'mentee',
      authorAvatar: avatarMale2,
      time: '18 giờ trước',
      content: 'Chia sẻ của chị Hà chi tiết quá ạ! Cho em hỏi là sinh viên năm 3 Khoa HTTT thì nên học thêm SQL hay Python trước để làm BA ạ?',
      attachments: []
    },
    {
      id: 202,
      author: 'Nguyễn Thị Thanh Hà',
      authorRole: 'mentor',
      authorAvatar: avatarFemale1,
      time: '15 giờ trước',
      content: 'Chào Bảo, với BA thì SQL là cực kỳ bắt buộc để truy vấn dữ liệu nhé. Em nên nắm vững SQL trước, Python có thể học sau để bổ trợ khi phân tích nâng cao.',
      attachments: []
    }
  ]
};

const Forum = () => {
  const history = useHistory();
  const { currentUser, loginAsMentor } = useUser();

  // Core state
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('forum_threads');
    return saved ? JSON.parse(saved) : INITIAL_THREADS;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('forum_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation & details state
  const [activeThreadId, setActiveThreadId] = useState(null);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingItem, setReportingItem] = useState(null); // { type: 'thread'|'comment', id: number }
  
  // Form states
  const [newThread, setNewThread] = useState({ title: '', category: 'general', content: '', files: [] });
  const [newComment, setNewComment] = useState({ content: '', files: [] });
  const [reportReason, setReportReason] = useState('spam');
  const [reportDetails, setReportDetails] = useState('');
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('forum_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('forum_comments', JSON.stringify(comments));
  }, [comments]);

  // Helper: Trigger success toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Auth gate check
  if (currentUser.role === 'guest') {
    return (
      <div className="forum-page-container">
        <div className="forum-auth-gate">
          <div className="forum-gate-card">
            <img 
              src="./uel11143-imot-200h.png" 
              alt="UEL Logo" 
              className="forum-gate-logo" 
            />
            <h2>Diễn đàn Thảo luận (Forum)</h2>
            <p>
              Chào mừng bạn đến với diễn đàn trao đổi học thuật MentorXMentee - Khoa Hệ Thống Thông Tin UEL. 
              Để xem các chủ đề thảo luận, tải tài liệu học tập hoặc đăng bài viết, vui lòng đăng nhập tài khoản thành viên.
            </p>
            <div className="forum-gate-actions">
              <button 
                className="forum-gate-btn primary"
                onClick={() => history.push('/login')}
              >
                Đăng nhập tài khoản
              </button>
              <button 
                className="forum-gate-btn secondary"
                onClick={() => {
                  loginAsMentor();
                  triggerToast('Đăng nhập giả lập thành công!');
                }}
              >
                Trải nghiệm nhanh (Đăng nhập Demo)
              </button>
            </div>
          </div>
        </div>
        {toastMessage && (
          <div className="forum-toast">
            <Icon name="sparkles" size={16} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // --- ACTIONS ---

  // Create thread
  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) return;

    const createdThread = {
      id: Date.now(),
      title: newThread.title,
      category: newThread.category,
      author: currentUser.name,
      authorRole: currentUser.role === 'alumni_mentor' ? 'mentor' : (currentUser.role === 'admin' ? 'admin' : 'mentee'),
      authorAvatar: currentUser.avatar || avatarMale1,
      time: 'Vừa xong',
      snippet: newThread.content,
      views: 0,
      replies: 0,
      attachments: newThread.files.map(f => ({ name: f.name, size: f.size }))
    };

    setThreads([createdThread, ...threads]);
    
    // Initialize comment box
    setComments({
      ...comments,
      [createdThread.id]: []
    });

    // Reset form
    setNewThread({ title: '', category: 'general', content: '', files: [] });
    setShowCreateModal(false);
    triggerToast('Đăng bài viết mới thành công!');
  };

  // Handle new thread file attachment change
  const handleThreadFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mappedFiles = files.map(file => {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        name: file.name,
        size: `${sizeInMB} MB`
      };
    });
    setNewThread(prev => ({ ...prev, files: [...prev.files, ...mappedFiles] }));
  };

  // Remove file from attachments list in form
  const removeThreadFile = (index) => {
    setNewThread(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Create comment
  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!newComment.content.trim()) return;

    const createdComment = {
      id: Date.now(),
      author: currentUser.name,
      authorRole: currentUser.role === 'alumni_mentor' ? 'mentor' : (currentUser.role === 'admin' ? 'admin' : 'mentee'),
      authorAvatar: currentUser.avatar || avatarMale1,
      time: 'Vừa xong',
      content: newComment.content,
      attachments: newComment.files.map(f => ({ name: f.name, size: f.size }))
    };

    const threadComments = comments[activeThreadId] || [];
    setComments({
      ...comments,
      [activeThreadId]: [...threadComments, createdComment]
    });

    // Update replies count in thread list
    setThreads(threads.map(t => {
      if (t.id === activeThreadId) {
        return { ...t, replies: t.replies + 1 };
      }
      return t;
    }));

    // Reset comment form
    setNewComment({ content: '', files: [] });
    triggerToast('Gửi bình luận thành công!');
  };

  // Handle comment file attachment change
  const handleCommentFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mappedFiles = files.map(file => {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        name: file.name,
        size: `${sizeInMB} MB`
      };
    });
    setNewComment(prev => ({ ...prev, files: [...prev.files, ...mappedFiles] }));
  };

  // Remove comment attachment file
  const removeCommentFile = (index) => {
    setNewComment(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Open Report Modal
  const openReport = (type, id, e) => {
    e.stopPropagation(); // Stop thread card click event
    setReportingItem({ type, id });
    setReportReason('spam');
    setReportDetails('');
    setShowReportModal(true);
  };

  // Submit Report
  const handleSubmitReport = (e) => {
    e.preventDefault();
    console.log(`Report submitted for ${reportingItem.type} ID ${reportingItem.id}. Reason: ${reportReason}, Details: ${reportDetails}`);
    setShowReportModal(false);
    triggerToast('Cảm ơn bạn, báo cáo vi phạm đã được gửi thành công!');
  };

  // Filter and Search logic
  const filteredThreads = threads
    .filter(t => {
      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(query) || t.snippet.toLowerCase().includes(query) || t.author.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === 'views') {
        return b.views - a.views;
      }
      // Mới nhất (Newest)
      return b.id - a.id;
    });

  const activeThread = threads.find(t => t.id === activeThreadId);
  const activeThreadComments = activeThreadId ? (comments[activeThreadId] || []) : [];

  // View detail helper
  const handleViewThread = (id) => {
    // Increment view count dynamically
    setThreads(threads.map(t => {
      if (t.id === id) {
        return { ...t, views: t.views + 1 };
      }
      return t;
    }));
    setActiveThreadId(id);
  };

  return (
    <div className="forum-page-container">
      {activeThreadId && activeThread ? (
        // --- THREAD DETAIL VIEW ---
        <div className="thread-detail-container">
          <button className="btn-back-forum" onClick={() => setActiveThreadId(null)}>
            <Icon name="back" size={16} />
            <span>Quay lại danh sách diễn đàn</span>
          </button>

          <div className="thread-author-section">
            <div className="author-info">
              <img src={activeThread.authorAvatar} alt={activeThread.author} className="author-avatar" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="author-name">{activeThread.author}</span>
                  <span className={`author-role-badge ${activeThread.authorRole}`}>
                    {activeThread.authorRole === 'mentor' ? 'Mentor' : (activeThread.authorRole === 'admin' ? 'Admin' : 'Mentee')}
                  </span>
                </div>
                <div className="thread-time">{activeThread.time}</div>
              </div>
            </div>
            <span className="thread-category-tag">
              {CATEGORIES.find(c => c.id === activeThread.category)?.label}
            </span>
          </div>

          <h2 className="thread-title" style={{ fontSize: '22px', marginTop: '16px' }}>{activeThread.title}</h2>
          
          <div className="detail-post-body">
            {activeThread.snippet}
          </div>

          {activeThread.attachments && activeThread.attachments.length > 0 && (
            <div className="thread-attachments">
              {activeThread.attachments.map((file, idx) => (
                <div key={idx} className="attachment-badge" onClick={() => triggerToast(`Đang tải xuống tài liệu: ${file.name}`)}>
                  <Icon name="file" size={14} className="attachment-icon" />
                  <span>{file.name} ({file.size})</span>
                </div>
              ))}
            </div>
          )}

          <div className="thread-footer" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div className="thread-stats">
              <span className="stat-item">
                <Icon name="eye" size={14} style={{ marginRight: '4px' }} />
                {activeThread.views} lượt xem
              </span>
              <span className="stat-item">
                <Icon name="comment" size={14} style={{ marginRight: '4px' }} />
                {activeThread.replies} bình luận
              </span>
            </div>
            <button className="btn-report" onClick={(e) => openReport('thread', activeThread.id, e)}>
              <Icon name="flag" size={14} style={{ marginRight: '4px' }} />
              Báo cáo vi phạm
            </button>
          </div>

          {/* COMMENTS LIST */}
          <div className="comments-section">
            <h3 className="comments-title">Thảo luận ({activeThreadComments.length})</h3>
            
            <div className="comment-list">
              {activeThreadComments.length === 0 ? (
                <p style={{ color: '#6b7280', fontStyle: 'italic', fontSize: '14px' }}>Chưa có bình luận nào cho chủ đề này. Hãy là người đầu tiên thảo luận!</p>
              ) : (
                activeThreadComments.map(comment => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <div className="author-info">
                        <img src={comment.authorAvatar} alt={comment.author} className="author-avatar" style={{ width: '32px', height: '32px' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="author-name" style={{ fontSize: '13px' }}>{comment.author}</span>
                            <span className={`author-role-badge ${comment.authorRole}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                              {comment.authorRole === 'mentor' ? 'Mentor' : (comment.authorRole === 'admin' ? 'Admin' : 'Mentee')}
                            </span>
                          </div>
                          <div className="thread-time" style={{ fontSize: '11px' }}>{comment.time}</div>
                        </div>
                      </div>
                      <button className="btn-report" onClick={(e) => openReport('comment', comment.id, e)}>
                        <Icon name="flag" size={14} />
                      </button>
                    </div>
                    
                    <div className="comment-body">
                      {comment.content}
                    </div>

                    {comment.attachments && comment.attachments.length > 0 && (
                      <div className="thread-attachments">
                        {comment.attachments.map((file, idx) => (
                          <div key={idx} className="attachment-badge" onClick={() => triggerToast(`Đang tải xuống tài liệu: ${file.name}`)}>
                            <Icon name="file" size={14} className="attachment-icon" />
                            <span>{file.name} ({file.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* WRITE COMMENT BOX */}
            <div className="add-comment-card">
              <h4 className="add-comment-title">Viết bình luận của bạn</h4>
              <form onSubmit={handleCreateComment}>
                <textarea
                  className="comment-textarea"
                  placeholder="Nhập nội dung bình luận thảo luận..."
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  required
                />
                
                {newComment.files.length > 0 && (
                  <div className="modal-file-list" style={{ marginBottom: '12px' }}>
                    {newComment.files.map((file, idx) => (
                      <div key={idx} className="modal-file-item">
                        <span>📁 {file.name} ({file.size})</span>
                        <button type="button" className="btn-remove-file" onClick={() => removeCommentFile(idx)}>Xóa</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="comment-form-actions">
                  <label className="btn-attach-file">
                    <Icon name="paperclip" size={14} />
                    <span>Đính kèm tệp</span>
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      multiple 
                      onChange={handleCommentFileChange} 
                    />
                  </label>
                  <button type="submit" className="btn-submit-comment">
                    Gửi bình luận
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      ) : (
        // --- THREAD LIST VIEW ---
        <>
          <div className="forum-header">
            <div className="forum-title-section">
              <div className="forum-title-strip" />
              <h1>Diễn đàn Thảo luận (Forum)</h1>
            </div>
            <div className="forum-header-actions">
              <div className="forum-search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm chủ đề..."
                  className="forum-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="forum-search-icon">
                  <Icon name="search" size={16} />
                </span>
              </div>
              <button className="btn-create-post" onClick={() => setShowCreateModal(true)}>
                <Icon name="plus" size={16} />
                <span>Đăng chủ đề mới</span>
              </button>
            </div>
          </div>

          <div className="forum-body">
            {/* SIDEBAR - CHUYÊN MỤC */}
            <aside className="forum-sidebar">
              <h3 className="sidebar-title">Chuyên mục</h3>
              <ul className="category-list">
                {CATEGORIES.map(cat => {
                  const count = cat.id === 'all' 
                    ? threads.length 
                    : threads.filter(t => t.category === cat.id).length;
                  return (
                    <li 
                      key={cat.id} 
                      className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon name={cat.icon} size={18} />
                        {cat.label}
                      </span>
                      <span className="category-badge">{count}</span>
                    </li>
                  );
                })}
              </ul>

              <h3 className="sidebar-title">Sắp xếp theo</h3>
              <ul className="filter-list">
                <li 
                  className={`filter-item ${selectedFilter === 'newest' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('newest')}
                >
                  <Icon name="clock" size={16} style={{ marginRight: '8px' }} />
                  Mới nhất
                </li>
                <li 
                  className={`filter-item ${selectedFilter === 'views' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('views')}
                >
                  <Icon name="trending" size={16} style={{ marginRight: '8px' }} />
                  Nổi bật (Lượt xem)
                </li>
              </ul>
            </aside>

            {/* LIST THREADS */}
            <main className="forum-content">
              {filteredThreads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f4f8' }}>
                  <Icon name="search" size={40} style={{ color: '#0f325f', opacity: 0.5, marginBottom: '12px' }} />
                  <h3 style={{ color: '#0f325f', marginTop: '12px' }}>Không tìm thấy chủ đề nào</h3>
                  <p style={{ color: '#6b7280' }}>Hãy thử thay đổi từ khóa tìm kiếm hoặc đăng một bài viết mới nhé!</p>
                </div>
              ) : (
                filteredThreads.map(thread => (
                  <article 
                    key={thread.id} 
                    className="thread-card"
                    onClick={() => handleViewThread(thread.id)}
                  >
                    <div className="thread-author-section">
                      <div className="author-info">
                        <img src={thread.authorAvatar} alt={thread.author} className="author-avatar" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="author-name">{thread.author}</span>
                            <span className={`author-role-badge ${thread.authorRole}`}>
                              {thread.authorRole === 'mentor' ? 'Mentor' : (thread.authorRole === 'admin' ? 'Admin' : 'Mentee')}
                            </span>
                          </div>
                          <div className="thread-time">{thread.time}</div>
                        </div>
                      </div>
                      <span className="thread-category-tag">
                        {CATEGORIES.find(c => c.id === thread.category)?.label}
                      </span>
                    </div>

                    <h3 className="thread-title">{thread.title}</h3>
                    
                    <p className="thread-snippet">{thread.snippet}</p>

                    {thread.attachments && thread.attachments.length > 0 && (
                      <div className="thread-attachments">
                        {thread.attachments.map((file, idx) => (
                          <div key={idx} className="attachment-badge" onClick={(e) => {
                            e.stopPropagation();
                            triggerToast(`Đang tải tài liệu: ${file.name}`);
                          }}>
                            <Icon name="file" size={14} className="attachment-icon" />
                            <span>{file.name} ({file.size})</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="thread-footer">
                      <div className="thread-stats">
                        <span className="stat-item">
                          <Icon name="eye" size={14} style={{ marginRight: '4px' }} />
                          {thread.views} lượt xem
                        </span>
                        <span className="stat-item">
                          <Icon name="comment" size={14} style={{ marginRight: '4px' }} />
                          {thread.replies} bình luận
                        </span>
                      </div>
                      <button 
                        className="btn-report" 
                        onClick={(e) => openReport('thread', thread.id, e)}
                      >
                        <Icon name="flag" size={14} style={{ marginRight: '4px' }} />
                        Báo cáo
                      </button>
                    </div>
                  </article>
                ))
              )}
            </main>
          </div>
        </>
      )}

      {/* --- CREATE POST MODAL --- */}
      {showCreateModal && (
        <div className="forum-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="forum-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Đăng chủ đề thảo luận mới</h2>
              <button className="btn-close-modal" onClick={() => setShowCreateModal(false)}>
                <Icon name="close" size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateThread}>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label htmlFor="thread-title">Tiêu đề bài đăng</label>
                  <input
                    type="text"
                    id="thread-title"
                    className="modal-input"
                    placeholder="Nhập tiêu đề ngắn gọn, rõ ý..."
                    value={newThread.title}
                    onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="thread-category">Chuyên mục</label>
                  <select
                    id="thread-category"
                    className="modal-input"
                    value={newThread.category}
                    onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="modal-form-group">
                  <label htmlFor="thread-content">Nội dung bài viết</label>
                  <textarea
                    id="thread-content"
                    className="modal-textarea"
                    placeholder="Nhập nội dung chia sẻ chi tiết..."
                    value={newThread.content}
                    onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label className="btn-attach-file" style={{ width: 'fit-content' }}>
                    <Icon name="paperclip" size={14} />
                    <span>Đính kèm tài liệu học tập</span>
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      multiple 
                      onChange={handleThreadFileChange} 
                    />
                  </label>
                  
                  {newThread.files.length > 0 && (
                    <div className="modal-file-list">
                      {newThread.files.map((file, idx) => (
                        <div key={idx} className="modal-file-item">
                          <span>📁 {file.name} ({file.size})</span>
                          <button type="button" className="btn-remove-file" onClick={() => removeThreadFile(idx)}>Xóa</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowCreateModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-modal-submit">
                  Đăng bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- REPORT MODAL --- */}
      {showReportModal && (
        <div className="forum-modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="forum-modal-card" style={{ maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Báo cáo nội dung vi phạm</h2>
              <button className="btn-close-modal" onClick={() => setShowReportModal(false)}>
                <Icon name="close" size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitReport}>
              <div className="modal-body">
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                  Giúp Ban quản trị giữ cho diễn đàn lành mạnh. Vui lòng chọn lý do vi phạm của nội dung này:
                </p>

                <div className="report-reasons-list">
                  <label className="report-reason-option">
                    <input 
                      type="radio" 
                      name="reportReason" 
                      value="spam"
                      checked={reportReason === 'spam'} 
                      onChange={() => setReportReason('spam')}
                    />
                    <span>Spam quảng cáo, link độc hại</span>
                  </label>
                  <label className="report-reason-option">
                    <input 
                      type="radio" 
                      name="reportReason" 
                      value="harassment"
                      checked={reportReason === 'harassment'} 
                      onChange={() => setReportReason('harassment')}
                    />
                    <span>Công kích cá nhân, ngôn từ thù ghét</span>
                  </label>
                  <label className="report-reason-option">
                    <input 
                      type="radio" 
                      name="reportReason" 
                      value="copyright"
                      checked={reportReason === 'copyright'} 
                      onChange={() => setReportReason('copyright')}
                    />
                    <span>Vi phạm bản quyền, tài liệu mật</span>
                  </label>
                  <label className="report-reason-option">
                    <input 
                      type="radio" 
                      name="reportReason" 
                      value="other"
                      checked={reportReason === 'other'} 
                      onChange={() => setReportReason('other')}
                    />
                    <span>Lý do khác</span>
                  </label>
                </div>

                {reportReason === 'other' && (
                  <div className="modal-form-group">
                    <label htmlFor="report-details">Mô tả chi tiết lý do</label>
                    <textarea
                      id="report-details"
                      className="modal-textarea"
                      style={{ minHeight: '80px' }}
                      placeholder="Vui lòng cung cấp thêm thông tin vi phạm..."
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowReportModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-modal-submit" style={{ backgroundColor: '#ef4444' }}>
                  Gửi báo cáo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TOAST --- */}
      {toastMessage && (
        <div className="forum-toast">
          <Icon name="sparkles" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default Forum;
