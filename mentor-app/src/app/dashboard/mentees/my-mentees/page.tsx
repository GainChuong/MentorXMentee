'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MENTEES, MATCHES, CURRENT_USER, MOCK_ACTIVE_MENTEES_DATA, getLoggedInUser } from '@/lib/mock-data';
import { ResourceItem } from '@/lib/types';

import { 
  Users, 
  Calendar, 
  BookOpen, 
  FileUp, 
  UserMinus, 
  ChevronLeft,
  ChevronRight, 
  Clock, 
  Target, 
  CheckCircle2, 
  Circle, 
  MoreVertical,
  MessageSquare,
  Search,
  Filter,
  ArrowUpRight,
  Plus,
  LayoutGrid,
  List,
  ExternalLink,
  History,
  ClipboardList,
  Hash,
  Activity,
  FileText,
  Upload,
  X,
  Save,
  Timer,
  ChevronDown,
  Video,
  MapPin,
  Check,
  Trash2,
  Edit2,
  AlertCircle,
  Minimize2,
  Download,
  Eye,
  Layers,
  CheckSquare,
  Paperclip,
  User,
  Settings,
  Map,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import RadarChart from '@/components/mentee-management/RadarChart';
import InteractiveRoadmap from '@/components/mentee-management/InteractiveRoadmap';
import { ROADMAPS } from '@/lib/mock-data';


interface Event { id: string; menteeId: string; menteeName: string; topic: string; date: string; startTime: string; endTime: string; type: 'online' | 'offline'; location?: string; milestoneId?: string; }

export default function MyMenteesPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'health'>('name');
  const [selectedMenteeId, setSelectedMenteeId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'tasks' | 'sessions' | 'docs'>('overview');
  const [activeMenteesData, setActiveMenteesData] = useState<any[]>(MOCK_ACTIVE_MENTEES_DATA);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);
  
  // Modal states
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  // New Task Form
  const [newTask, setNewTask] = useState({ title: '', deadline: '', priority: 'medium', attachment: null as File | null, eventId: '' });

  // New Report Form
  const [newReport, setNewReport] = useState({ meetingId: '', date: new Date().toISOString().split('T')[0], duration: '', topic: '', outcome: '', attachment: null as File | null });

  // Customization States
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [customSkills, setCustomSkills] = useState<Record<string, any[]>>({});
  const [customRoadmaps, setCustomRoadmaps] = useState<Record<string, any[]>>({});

  // Resource Hub States
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [movingItemId, setMovingItemId] = useState<string | null>(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renamingItemId, setRenamingItemId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState('');

  // Persistence logic
  useEffect(() => {
    const saved = localStorage.getItem('activeMenteesData');
    if (saved) {
      try {
        setActiveMenteesData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data', e);
        setActiveMenteesData(MOCK_ACTIVE_MENTEES_DATA);
      }
    } else {
      setActiveMenteesData(MOCK_ACTIVE_MENTEES_DATA);
    }
    setHasLoaded(true);
  }, []);
  
  useEffect(() => {
    const id = searchParams.get('selectedId');
    if (id && activeMenteesData.some(m => m.id === id)) {
      setSelectedMenteeId(id);
    }
    
    if (searchParams.get('openCalendar') === 'true') {
      setShowCalendarModal(true);
    }
  }, [searchParams, activeMenteesData]);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('activeMenteesData', JSON.stringify(activeMenteesData));
    }
  }, [activeMenteesData, hasLoaded]);

  // Calendar States

  const [calendarView, setCalendarView] = useState<'Tuần' | 'Tháng'>('Tuần');
  const [currentDate, setCurrentDate] = useState(new Date('2026-04-22')); 
  const [events, setEvents] = useState<Event[]>([
    { id: '1', menteeId: 'mentee-1', menteeName: 'Nguyễn Văn B', topic: 'Review Portfolio', date: '2026-04-28', startTime: '10:00', endTime: '11:30', type: 'online', location: 'meet.google.com/abc-defg-hij', milestoneId: 'ms-1' },
    { id: '2', menteeId: 'mentee-2', menteeName: 'Lê Thị C', topic: 'Career Coaching', date: '2026-04-29', startTime: '14:00', endTime: '15:00', type: 'offline', location: 'Library A1', milestoneId: 'ms-3' },
  ]);

  const [newMeeting, setNewMeeting] = useState<Partial<Event>>({ menteeId: '', topic: '', date: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '10:00', type: 'online', location: '', milestoneId: '' });

  const activeMentees = MENTEES.filter(m => activeMenteesData.some(d => d.id === m.id));
  const selectedMentee = activeMentees.find(m => m.id === selectedMenteeId);
  const selectedMenteeExtra = activeMenteesData.find(d => d.id === selectedMenteeId);

  const toggleMenteeDetail = (id: string) => {
    if (selectedMenteeId === id) setSelectedMenteeId(null);
    else { 
      setSelectedMenteeId(id); 
      setActiveTab('overview'); 
    }
  };

  const getHealthColor = (score: number = 100) => {
    if (score >= 80) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    if (score >= 50) return 'bg-uel-orange shadow-[0_0_10px_rgba(241,100,41,0.5)]';
    return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse';
  };

  const addTask = () => {
    if (!newTask.title || !selectedMenteeId) return;
    
    let fileUrl = '';
    if (newTask.attachment instanceof File) {
      fileUrl = URL.createObjectURL(newTask.attachment);
    }

    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        let newTasks = [...m.tasks];
        const newResources = [...m.resources];

        if (editingTaskId) {
          // Edit existing task
          newTasks = newTasks.map(t => t.id === editingTaskId ? {
            ...t,
            title: newTask.title,
            deadline: newTask.deadline,
            priority: newTask.priority,
            eventId: newTask.eventId,
            attachment: newTask.attachment ? (newTask.attachment as File).name : (t as any).attachment
          } : t);
        } else {
          // Create new task
          newTasks.push({ 
            id: Date.now(), 
            title: newTask.title, 
            status: 'pending', 
            deadline: newTask.deadline, 
            priority: newTask.priority, 
            attachment: newTask.attachment ? (newTask.attachment as File).name : '', 
            eventId: newTask.eventId 
          } as any);
        }

        if (newTask.attachment instanceof File) {
          newResources.push({
            id: `doc-task-${Date.now()}`,
            name: (newTask.attachment as File).name,
            type: 'file',
            fileType: (newTask.attachment as File).name.split('.').pop() || 'file',
            size: `${((newTask.attachment as File).size / (1024 * 1024)).toFixed(1)}MB`,
            author: 'Mentor',
            uploadedAt: new Date().toISOString().split('T')[0],
            parentId: null,
            url: fileUrl
          });
        }

        return { 
          ...m, 
          tasks: newTasks,
          resources: newResources
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
    setShowAddTaskModal(false);
    setEditingTaskId(null);
    setNewTask({ title: '', deadline: '', priority: 'medium', attachment: null, eventId: '' });
  };

  const handleDeleteTask = (taskId: number) => {
    if (!selectedMenteeId || !confirm('Bạn có chắc muốn xóa nhiệm vụ này?')) return;
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return {
          ...m,
          tasks: m.tasks.filter((t: any) => t.id !== taskId)
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
  };

  const handleEditTaskStart = (task: any) => {
    setEditingTaskId(task.id);
    setNewTask({
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      eventId: task.eventId || '',
      attachment: null
    });
    setShowAddTaskModal(true);
  };

  const toggleTaskStatus = (taskId: number) => {
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return { ...m, tasks: m.tasks.map((t: any) => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t) };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
  };

  const handleCreateMeeting = () => {
    if (!newMeeting.menteeId || !newMeeting.topic) return;
    const mentee = activeMentees.find(m => m.id === newMeeting.menteeId);
    const event: Event = { id: Math.random().toString(36).substr(2, 9), menteeId: newMeeting.menteeId!, menteeName: mentee?.full_name || 'Unknown', topic: newMeeting.topic!, date: newMeeting.date!, startTime: newMeeting.startTime!, endTime: newMeeting.endTime!, type: newMeeting.type as 'online' | 'offline', location: newMeeting.location, milestoneId: newMeeting.milestoneId };
    setEvents([...events, event]);
    setShowCreateModal(false);
    setNewMeeting({ menteeId: '', topic: '', date: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '10:00', type: 'online', location: '', milestoneId: '' });
  };

  const handleSelectMeetingForReport = (eventId: string) => {
    const ev = events.find(e => e.id === eventId);
    if (ev) {
      setNewReport({ ...newReport, meetingId: eventId, date: ev.date, topic: ev.topic });
    } else {
      setNewReport({ ...newReport, meetingId: '' });
    }
  };

  const handleSubmitReport = () => {
    if (!newReport.topic || !newReport.outcome || !selectedMenteeId) return;
    
    let fileUrl = '';
    if (newReport.attachment instanceof File) {
      fileUrl = URL.createObjectURL(newReport.attachment);
    }

    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        let newHistory = [...m.history];
        const newResources = [...m.resources];

        if (editingReportId) {
          // Edit existing
          newHistory = newHistory.map((h: any) => h.id === editingReportId ? {
            ...h,
            date: newReport.date,
            topic: newReport.topic,
            duration: newReport.duration ? (newReport.duration.includes('min') ? newReport.duration : `${newReport.duration} min`) : h.duration,
            outcome: newReport.outcome,
          } : h);
        } else {
          // Create new
          newHistory.push({ 
            id: Date.now(), 
            date: newReport.date, 
            topic: newReport.topic, 
            duration: newReport.duration ? `${newReport.duration} min` : '60 min', 
            outcome: newReport.outcome, 
            type: 'Meeting',
          } as any);
        }

        if (newReport.attachment instanceof File) {
          newResources.push({
            id: `doc-report-${Date.now()}`,
            name: newReport.attachment.name,
            type: 'file',
            fileType: newReport.attachment.name.split('.').pop() || 'file',
            size: `${(newReport.attachment.size / (1024 * 1024)).toFixed(1)}MB`,
            author: 'Mentor',
            uploadedAt: new Date().toISOString().split('T')[0],
            parentId: null,
            url: fileUrl
          });
        }

        return { 
          ...m, 
          history: newHistory,
          resources: newResources
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
    if (!editingReportId) {
      setEvents(events.filter(e => e.id !== newReport.meetingId));
    }
    setShowReportModal(false);
    setEditingReportId(null);
    setNewReport({ meetingId: '', date: new Date().toISOString().split('T')[0], duration: '', topic: '', outcome: '', attachment: null });
  };

  const handleDeleteReport = (reportId: number) => {
    if (!selectedMenteeId || !confirm('Bạn có chắc muốn xóa báo cáo này?')) return;
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return {
          ...m,
          history: m.history.filter((h: any) => h.id !== reportId)
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
  };

  const handleEditReportStart = (report: any) => {
    setEditingReportId(report.id);
    setNewReport({
      meetingId: 'editing', // placeholder
      date: report.date,
      topic: report.topic,
      duration: report.duration.replace(' min', ''),
      outcome: report.outcome,
      attachment: null
    });
    setShowReportModal(true);
  };

  // Resource Hub Handlers
  const handleDownload = (doc: any) => {
    if (!doc.url || doc.url === '#') {
      alert('Tài liệu này không có liên kết tải về trong bản demo.');
      return;
    }
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim() || !selectedMenteeId) return;
    const newFolder: ResourceItem = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      type: 'folder',
      author: 'Mentor',
      uploadedAt: new Date().toISOString().split('T')[0],
      parentId: currentFolderId
    };
    
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return { ...m, resources: [...m.resources, newFolder] };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
    setNewFolderName('');
    setShowNewFolderModal(false);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedMenteeId) return;
    
    const newFile: ResourceItem = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: 'file',
      fileType: file.name.split('.').pop() || 'file',
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      author: 'Mentor',
      uploadedAt: new Date().toISOString().split('T')[0],
      parentId: currentFolderId,
      url: URL.createObjectURL(file)
    };
    
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return { ...m, resources: [...m.resources, newFile] };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
  };

  const handleMoveItem = (itemId: string, targetFolderId: string | null) => {
    if (!selectedMenteeId) return;
    
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return {
          ...m,
          resources: m.resources.map((r: any) => r.id === itemId ? { ...r, parentId: targetFolderId } : r)
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
    setMovingItemId(null);
    setShowMoveModal(false);
  };

  const handleRenameItem = () => {
    if (!renamingItemId || !renamingName.trim() || !selectedMenteeId) return;
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return {
          ...m,
          resources: m.resources.map((r: any) => r.id === renamingItemId ? { ...r, name: renamingName.trim() } : r)
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
    setRenamingItemId(null);
    setShowRenameModal(false);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!selectedMenteeId || !confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) return;
    const updated = activeMenteesData.map(m => {
      if (m.id === selectedMenteeId) {
        return {
          ...m,
          resources: m.resources.filter((r: any) => r.id !== itemId)
        };
      }
      return m;
    });
    setActiveMenteesData(updated as any);
  };

  const deleteEvent = (id: string) => { setEvents(events.filter(e => e.id !== id)); };

  const getEventStyle = (event: Event) => { const startHour = parseInt(event.startTime.split(':')[0]); const startMin = parseInt(event.startTime.split(':')[1]); const endHour = parseInt(event.endTime.split(':')[0]); const endMin = parseInt(event.endTime.split(':')[1]); const top = (startHour * 60 + startMin); const height = (endHour * 60 + endMin) - top; return { top: `${top}px`, height: `${height}px` }; };
  const isEventOnDay = (event: Event, dayIndex: number) => { const targetDate = new Date(currentDate); targetDate.setDate(currentDate.getDate() + dayIndex); const dateStr = targetDate.toISOString().split('T')[0]; return event.date === dateStr; };
  const handlePrevDate = () => { const newDate = new Date(currentDate); if (calendarView === 'Tuần') newDate.setDate(currentDate.getDate() - 7); else newDate.setMonth(currentDate.getMonth() - 1); setCurrentDate(newDate); };
  const handleNextDate = () => { const newDate = new Date(currentDate); if (calendarView === 'Tuần') newDate.setDate(currentDate.getDate() + 7); else newDate.setMonth(currentDate.getMonth() + 1); setCurrentDate(newDate); };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div><h1 className="text-4xl font-black text-slate-900 tracking-tight">Quản lý Mentee</h1><p className="text-slate-500 font-bold mt-2 flex items-center gap-2"><Users size={18} className="text-uel-blue" /> Bạn đang hướng dẫn {activeMentees.length} sinh viên trong Season này</p></div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowCalendarModal(true)} className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all"><Calendar size={16} /> XEM LỊCH</button>
          <button onClick={() => { setNewMeeting({...newMeeting, menteeId: ''}); setShowCreateModal(true); }} className="px-6 py-3 bg-uel-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-uel-blue/20 flex items-center gap-2 hover:scale-105 transition-all"><Plus size={16} /> TẠO LỊCH HẸN</button>
          
          <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block" />
          
          <div className="flex items-center gap-3">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-uel-blue transition-all cursor-pointer shadow-sm"
            >
              <option value="name">Sắp xếp: Tên A-Z</option>
              <option value="progress">Sắp xếp: Tiến độ</option>
              <option value="health">Sắp xếp: Sức khỏe</option>
            </select>
            
            <div className="flex items-center gap-1 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <button onClick={() => setViewMode('grid')} className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-uel-blue text-white shadow-lg shadow-uel-blue/20" : "text-slate-400 hover:bg-slate-50")}>
                <LayoutGrid size={20} />
              </button>
              <button onClick={() => setViewMode('list')} className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-uel-blue text-white shadow-lg shadow-uel-blue/20" : "text-slate-400 hover:bg-slate-50")}>
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={cn("space-y-6 transition-all", selectedMenteeId ? "lg:col-span-4" : "lg:col-span-12")}>
          <div className={cn("grid gap-6", !selectedMenteeId && viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
            {[...activeMentees].sort((a, b) => {
              if (sortBy === 'name') {
                const nameA = a.full_name.split(' ').pop() || '';
                const nameB = b.full_name.split(' ').pop() || '';
                return nameA.localeCompare(nameB, 'vi');
              }
              if (sortBy === 'health') return (b.health_score || 0) - (a.health_score || 0);
              const extraA = activeMenteesData.find(d => d.id === a.id);
              const extraB = activeMenteesData.find(d => d.id === b.id);
              if (sortBy === 'progress') return (extraB?.progress || 0) - (extraA?.progress || 0);
              return 0;
            }).map((mentee) => {
              const extra = activeMenteesData.find(d => d.id === mentee.id);
              const isActive = selectedMenteeId === mentee.id;
              return (
                <div 
                  key={mentee.id} 
                  onClick={() => toggleMenteeDetail(mentee.id)} 
                  className={cn(
                    "group relative bg-white rounded-[32px] p-6 border-2 transition-all duration-200 cursor-pointer overflow-hidden", 
                    isActive ? "border-uel-blue shadow-lg" : "border-transparent shadow-sm hover:border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <img src={mentee.avatar_url} className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white" alt={mentee.full_name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-900 truncate leading-tight">{mentee.full_name}</h3>
                        <div className={cn("w-2.5 h-2.5 rounded-full", getHealthColor(mentee.health_score))} title={`Health Score: ${mentee.health_score}%`} />
                      </div>
                      <div className="flex items-center gap-2 mt-1"><span className="text-[9px] font-black text-uel-blue uppercase tracking-wider">{mentee.career_track}</span><span className="text-[9px] font-bold text-slate-300 flex items-center gap-1"><Hash size={10} />{extra?.matchId}</span></div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2"><div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400"><span>Buổi học: {extra?.sessionConfig.completed}/{extra?.sessionConfig.total}</span><span className="text-uel-blue">{extra?.progress}%</span></div><div className="h-2 bg-slate-50 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${extra?.progress}%` }} className="h-full bg-uel-blue rounded-full" /></div></div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase"><Clock size={12} /> Next: {extra?.nextSession.split(' ')[0]}</div>
                    <button className={cn("flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-all", isActive ? "text-uel-blue" : "text-uel-orange group-hover:gap-2")}>{isActive ? "Closing" : "Details"} <ChevronRight size={14} className={cn("transition-transform", isActive && "rotate-180")} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedMenteeId && selectedMentee && (
            <motion.div 
              key={selectedMenteeId} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-8 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[800px] sticky top-8"
            >
              <div className="p-10 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-uel-blue/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <img src={selectedMentee.avatar_url} className="w-24 h-24 rounded-[32px] object-cover shadow-2xl border-4 border-white" alt={selectedMentee.full_name} />
                    <div>
                      <div className="flex items-center gap-3"><h2 className="text-3xl font-black text-slate-900">{selectedMentee.full_name}</h2><div className="flex items-center gap-1.5 px-3 py-1 bg-uel-blue text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-uel-blue/20"><Hash size={12} /> {selectedMenteeExtra?.matchId}</div></div>
                      <p className="text-sm font-bold text-uel-blue uppercase tracking-widest mt-1">{selectedMentee.career_track}</p>
                      <div className="flex items-center gap-4 mt-4"><button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-uel-blue transition-colors uppercase tracking-widest"><MessageSquare size={16} /> Nhắn tin</button><Link href={`/dashboard/mentees/profile/${selectedMenteeId}`} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-uel-orange transition-colors uppercase tracking-widest"><ExternalLink size={16} /> Xem hồ sơ chi tiết</Link></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[200px]"><button onClick={() => { setNewMeeting({...newMeeting, menteeId: selectedMenteeId || ''}); setShowCreateModal(true); }} className="w-full py-4 px-8 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><Calendar size={18} /> TẠO LỊCH HẸN</button><button onClick={() => setShowReportModal(true)} className="w-full py-4 px-8 bg-uel-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-orange/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><FileText size={18} /> BÁO CÁO BUỔI HỌC</button></div>
                </div>
                <div className="flex gap-10 mt-12 relative z-10">
                  <Tab active={activeTab === 'overview'} label="Tổng quan" onClick={() => setActiveTab('overview')} />
                  <Tab active={activeTab === 'roadmap'} label="Lộ trình" onClick={() => setActiveTab('roadmap')} />
                  <Tab active={activeTab === 'tasks'} label="Nhiệm vụ" count={selectedMenteeExtra?.tasks.length} onClick={() => setActiveTab('tasks')} />
                  <Tab active={activeTab === 'sessions'} label="Lịch sử buổi học" count={selectedMenteeExtra?.history.length} onClick={() => setActiveTab('sessions')} />
                  <Tab active={activeTab === 'docs'} label="Tài liệu" count={selectedMenteeExtra?.resources.length} onClick={() => setActiveTab('docs')} />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {activeTab === 'overview' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="space-y-8">
                          <div className="flex justify-between items-center">
                            <SectionTitle icon={Target} title="Mục tiêu hiện tại" />
                            <button onClick={() => setActiveTab('roadmap')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 hover:text-uel-blue transition-all border border-slate-100 shadow-sm">Xem chi tiết <ChevronRight size={12}/></button>
                          </div>
                          <div className="p-8 bg-uel-blue/5 rounded-[32px] border border-uel-blue/10">
                            {(() => {
                               const roadmaps = customRoadmaps[selectedMenteeId || ''] || ROADMAPS[selectedMenteeExtra?.matchId || ''] || ROADMAPS['match-1'];
                               const currentMilestone = roadmaps.find((r: any) => r.status === 'in_progress') || roadmaps.find((r: any) => r.status === 'pending') || roadmaps[roadmaps.length - 1];
                               return (
                                 <>
                                   <h4 className="text-xl font-black text-slate-900">{currentMilestone?.title}</h4>
                                   <p className="text-xs font-bold text-uel-blue uppercase tracking-widest mt-2">{currentMilestone?.status === 'in_progress' ? 'Đang thực hiện' : 'Sắp tới'}</p>
                                   <p className="text-sm font-medium text-slate-600 mt-4 leading-relaxed">{currentMilestone?.description}</p>
                                   {currentMilestone?.deadline && <p className="text-[10px] font-black text-slate-400 flex items-center gap-1 mt-6"><Clock size={12}/> Deadline: {currentMilestone.deadline}</p>}
                                 </>
                               )
                            })()}
                          </div>
                        </section>
                        
                        <section className="space-y-8">
                          <div className="flex justify-between items-center">
                            <SectionTitle icon={Activity} title="Phân tích kỹ năng" />
                            <button onClick={() => setShowSkillsModal(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 hover:text-uel-blue transition-all border border-slate-100 shadow-sm"><Settings size={12} /> Tùy chỉnh</button>
                          </div>
                          <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center">
                            <RadarChart 
                              data={customSkills[selectedMenteeId || ''] || selectedMentee?.skills_assessment || []} 
                              size={250} 
                            />
                            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                              {(() => {
                                const currentSkills = customSkills[selectedMenteeId || ''] || selectedMentee?.skills_assessment || [];
                                const avgScore = (currentSkills.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0) / (currentSkills.length || 1)).toFixed(1);
                                
                                const sessionProgress = selectedMenteeExtra?.sessionConfig ? (selectedMenteeExtra.sessionConfig.completed / selectedMenteeExtra.sessionConfig.total) : 0;
                                const taskProgress = (selectedMenteeExtra?.tasks?.length || 0) > 0 
                                  ? (selectedMenteeExtra.tasks.filter((t: any) => t.status === 'completed').length / selectedMenteeExtra.tasks.length) 
                                  : 1; // Default to 1 if no tasks to not penalize
                                
                                // Base health is 40% (starting point), plus up to 40% from sessions, plus up to 20% from tasks
                                const calculatedHealth = Math.min(100, Math.round(40 + (sessionProgress * 40) + (taskProgress * 20)));
                                
                                return (
                                  <>
                                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sức khỏe kết nối</p>
                                      <p className={cn("text-2xl font-black mt-1", calculatedHealth >= 80 ? "text-emerald-500" : "text-uel-orange")}>
                                        {calculatedHealth}%
                                      </p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Điểm trung bình</p>
                                      <p className="text-2xl font-black mt-1 text-uel-blue">
                                        {avgScore}
                                      </p>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>

                          <section className="space-y-6 mt-10">
                            <SectionTitle icon={Clock} title="Lịch hẹn gần nhất" />
                            <div className="p-8 bg-uel-orange/5 rounded-[32px] border border-uel-orange/10">
                              <h4 className="text-2xl font-black text-slate-900">{selectedMenteeExtra?.nextSession}</h4>
                              <p className="text-xs font-bold text-uel-orange uppercase tracking-widest mt-1">Trực tuyến qua Google Meet</p>
                            </div>
                          </section>
                        </section>
                      </div>
                    )}
                    
                    {activeTab === 'roadmap' && (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <SectionTitle icon={Target} title="Lộ trình (Roadmap)" />
                          <button onClick={() => setShowRoadmapModal(true)} className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-uel-blue transition-all shadow-sm border border-slate-200"><Settings size={16} /> TÙY CHỈNH LỘ TRÌNH</button>
                        </div>
                        <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm max-w-3xl mx-auto">
                          <InteractiveRoadmap 
                            milestones={customRoadmaps[selectedMenteeId || ''] || ROADMAPS[selectedMenteeExtra?.matchId || ''] || ROADMAPS['match-1']} 
                            sessions={events.filter(e => e.menteeId === selectedMenteeId)}
                            tasks={selectedMenteeExtra?.tasks || []}
                            onNavigate={(tab: any) => setActiveTab(tab)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'tasks' && (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center"><SectionTitle icon={CheckSquare} title="Nhiệm vụ đã giao" /><button onClick={() => { setEditingTaskId(null); setShowAddTaskModal(true); }} className="flex items-center gap-2 px-6 py-3 bg-uel-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-uel-blue/20 hover:scale-105 transition-all"><Plus size={16} /> GIAO NHIỆM VỤ</button></div>
                        <div className="grid gap-4">
                          {selectedMenteeExtra?.tasks.map((task: any) => (
                            <div key={task.id} className={cn("p-6 rounded-3xl border transition-all flex items-center gap-4", task.status === 'completed' ? "bg-emerald-50/30 border-emerald-100 opacity-60" : "bg-white border-slate-100 shadow-sm hover:border-uel-blue/30")}>
                              <button onClick={() => toggleTaskStatus(task.id as number)} className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", task.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 text-transparent hover:border-uel-blue")}>
                                <Check size={14} />
                              </button>
                              <div className="flex-1 flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between pr-4">
                                    <h4 className={cn("font-bold text-slate-900 text-sm", task.status === 'completed' && "line-through text-slate-400")}>{task.title}</h4>
                                    {(task as any).attachment && (
                                      <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-uel-blue rounded-lg text-[9px] font-black uppercase hover:bg-uel-blue hover:text-white transition-all">
                                        <Paperclip size={12} /> {(task as any).attachment}
                                      </button>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Calendar size={10} /> Deadline: {task.deadline}</span>
                                    <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded", task.priority === 'high' ? "bg-red-100 text-red-500" : "bg-uel-blue/10 text-uel-blue")}>{task.priority}</span>
                                    {task.eventId && (
                                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 flex items-center gap-1">
                                        <Video size={10} /> {events.find(e => e.id === task.eventId)?.topic || 'Buổi học'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="relative group/taskmenu ml-4">
                                  <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-uel-blue transition-all">
                                    <MoreVertical size={16} />
                                  </button>
                                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover/taskmenu:opacity-100 group-hover/taskmenu:visible transition-all z-20">
                                    <button onClick={() => handleEditTaskStart(task)} className="w-full px-4 py-2 text-left text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:text-uel-blue transition-all flex items-center gap-2">
                                      <Edit2 size={12} /> Sửa nhiệm vụ
                                    </button>
                                    <button onClick={() => handleDeleteTask(task.id as number)} className="w-full px-4 py-2 text-left text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-all flex items-center gap-2">
                                      <Trash2 size={12} /> Xóa nhiệm vụ
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'docs' && (
                      <div className="space-y-8">
                        {/* Header & Controls */}
                        <div className="flex justify-between items-center">
                          <SectionTitle icon={Layers} title="Resource Hub (Kho tài liệu)" />
                          <div className="flex gap-3">
                            <button onClick={() => setShowNewFolderModal(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                              <Plus size={16} /> THƯ MỤC MỚI
                            </button>
                            <div className="relative">
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUploadFile} />
                              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                                <Upload size={16} /> TẢI LÊN
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 overflow-x-auto pb-2 custom-scrollbar">
                          <button onClick={() => setCurrentFolderId(null)} className={cn("hover:text-uel-blue transition-colors whitespace-nowrap", !currentFolderId && "text-uel-blue font-black underline underline-offset-4")}>Tất cả tài liệu</button>
                          {(() => {
                            const path: ResourceItem[] = [];
                            let current = selectedMenteeExtra?.resources.find((r: any) => r.id === currentFolderId);
                            while (current) {
                              path.unshift(current);
                              current = selectedMenteeExtra?.resources.find((r: any) => r.id === current?.parentId);
                            }
                            return path.map((folder, idx) => (
                              <React.Fragment key={folder.id}>
                                <ChevronRight size={14} className="shrink-0" />
                                <button onClick={() => setCurrentFolderId(folder.id)} className={cn("hover:text-uel-blue transition-colors whitespace-nowrap", idx === path.length - 1 && "text-uel-blue font-black")}>{folder.name}</button>
                              </React.Fragment>
                            ));
                          })()}
                        </div>

                        {/* Folder View */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {selectedMenteeExtra?.resources
                            .filter((r: any) => r.parentId === currentFolderId && r.type === 'folder')
                            .map((folder: any) => (
                                <motion.div 
                                  key={folder.id} 
                                  layoutId={folder.id}
                                  onClick={(e) => {
                                    if ((e.target as HTMLElement).closest('.resource-actions')) {
                                      e.stopPropagation();
                                      return;
                                    }
                                    setCurrentFolderId(folder.id);
                                  }}
                                  className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-uel-blue/20 hover:shadow-xl transition-all cursor-pointer group relative"
                                >
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-uel-blue shadow-sm group-hover:bg-uel-blue group-hover:text-white transition-all">
                                      <BookOpen size={24} />
                                    </div>
                                    <div className="resource-actions">
                                      <ResourceMenu 
                                        item={folder} 
                                        onDelete={() => handleDeleteItem(folder.id)} 
                                        onMove={() => { setMovingItemId(folder.id); setShowMoveModal(true); }} 
                                        onRename={() => { setRenamingItemId(folder.id); setRenamingName(folder.name); setShowRenameModal(true); }} 
                                      />
                                    </div>
                                  </div>
                                <h4 className="font-black text-slate-900 text-sm truncate">{folder.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                  {selectedMenteeExtra?.resources.filter((r: any) => r.parentId === folder.id).length} Tài liệu
                                </p>
                              </motion.div>
                            ))
                          }
                        </div>

                        {/* File View */}
                        <div className="pt-8 border-t border-slate-100">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Tệp tin</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {selectedMenteeExtra?.resources
                              .filter((r: any) => r.parentId === currentFolderId && r.type === 'file')
                              .map((doc: any) => (
                                <motion.div 
                                  key={doc.id} 
                                  className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-uel-blue/30 transition-all group relative cursor-default"
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-uel-blue group-hover:bg-uel-blue group-hover:text-white transition-all"><FileText size={24} /></div>
                                    <div className="flex gap-2 resource-actions">
                                      <button onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-uel-blue hover:text-white transition-all"><Eye size={16} /></button>
                                      <ResourceMenu 
                                        item={doc} 
                                        onDelete={() => handleDeleteItem(doc.id)} 
                                        onMove={() => { setMovingItemId(doc.id); setShowMoveModal(true); }} 
                                        onRename={() => { setRenamingItemId(doc.id); setRenamingName(doc.name); setShowRenameModal(true); }} 
                                      />
                                    </div>
                                  </div>
                                  <h4 className="font-black text-slate-900 text-sm truncate">{doc.name}</h4>
                                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>{doc.size} · {doc.fileType}</span>
                                    <span className={cn("px-2 py-0.5 rounded", doc.author === 'Mentor' ? "bg-uel-blue/10 text-uel-blue" : "bg-uel-orange/10 text-uel-orange")}>{doc.author}</span>
                                  </div>
                                </motion.div>
                              ))
                            }
                             {selectedMenteeExtra?.resources.filter((r: any) => r.parentId === currentFolderId).length === 0 && (
                              <div className="col-span-full py-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                  <Layers size={40} />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Thư mục này trống</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}


                    {activeTab === 'sessions' && (
                      <div className="space-y-8">
                        <SectionTitle icon={History} title="Nhật ký Mentoring & Phản hồi" />
                        <div className="space-y-10">
                          {selectedMenteeExtra?.history.map((item: any) => (
                            <div key={item.id} className="relative pl-8 border-l-2 border-slate-100 py-2">
                              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-white border-2 border-uel-blue shadow-sm" />
                              
                              <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                                <div className="p-6 bg-slate-50 flex justify-between items-center border-b border-slate-100">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-uel-blue shadow-sm">
                                      <FileText size={20} />
                                    </div>
                                    <div>
                                      <h4 className="font-black text-slate-900">{item.topic}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date} - {item.duration}</p>
                                        {item.milestoneId && (
                                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-uel-blue/5 text-uel-blue flex items-center gap-1">
                                            <Map size={10} /> {(() => {
                                              const roadmap = customRoadmaps[selectedMenteeId || ''] || ROADMAPS[selectedMenteeExtra?.matchId || ''] || [];
                                              return roadmap.find((m: any) => m.id === item.milestoneId)?.title || 'Cột mốc';
                                            })()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-white text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100 shadow-sm mr-2">Hoàn thành</span>
                                    <div className="relative group/menu">
                                      <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-uel-blue transition-all">
                                        <MoreVertical size={16} />
                                      </button>
                                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                                        <button onClick={() => handleEditReportStart(item)} className="w-full px-4 py-2 text-left text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:text-uel-blue transition-all flex items-center gap-2">
                                          <Edit2 size={12} /> Sửa báo cáo
                                        </button>
                                        <button onClick={() => handleDeleteReport(item.id)} className="w-full px-4 py-2 text-left text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-all flex items-center gap-2">
                                          <Trash2 size={12} /> Xóa báo cáo
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100">
                                  {/* Mentor's side */}
                                  <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-uel-blue uppercase tracking-widest">
                                      <User size={14} /> Mentor's Report
                                    </div>
                                    <div className="p-4 bg-uel-blue/5 rounded-2xl text-xs font-medium text-slate-600 leading-relaxed border border-uel-blue/10">
                                      {item.outcome}
                                    </div>
                                  </div>

                                  {/* Mentee's side */}
                                  <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-uel-orange uppercase tracking-widest">
                                      <MessageSquare size={14} /> Mentee's Reflection
                                    </div>
                                    {item.journal ? (
                                      <div className="space-y-4">
                                        <p className="text-xs italic text-slate-600 leading-relaxed bg-uel-orange/5 p-4 rounded-2xl border border-uel-orange/10">
                                          "{item.journal.reflection}"
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {item.journal.key_takeaways.map((tk: string, idx: number) => (
                                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold rounded-lg uppercase">
                                              #{tk}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center py-10 text-slate-300 italic text-xs">
                                        Chưa có phản hồi từ Mentee
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task Modal with File Upload */}
      <AnimatePresence>
        {showAddTaskModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddTaskModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-uel-blue text-white rounded-xl flex items-center justify-center">
                    <CheckSquare size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase">{editingTaskId ? 'Cập nhật nhiệm vụ' : 'Giao nhiệm vụ mới'}</h3>
                </div>
                <button onClick={() => { setShowAddTaskModal(false); setEditingTaskId(null); }} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề nhiệm vụ</label><input type="text" placeholder="Nhập tiêu đề..." value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hạn chót (Deadline)</label><input type="date" value={newTask.deadline} onChange={(e) => setNewTask({...newTask, deadline: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mức độ ưu tiên</label><div className="flex p-1 bg-slate-100 rounded-2xl">{['low', 'medium', 'high'].map(p => (<button key={p} onClick={() => setNewTask({...newTask, priority: p as any})} className={cn("flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all", newTask.priority === p ? "bg-white text-uel-blue shadow-sm" : "text-slate-400")}>{p}</button>))}</div></div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Giao cho buổi học nào?</label>
                  <select value={newTask.eventId} onChange={(e) => setNewTask({...newTask, eventId: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all">
                    <option value="">-- Không liên kết --</option>
                    {events.filter(e => e.menteeId === selectedMenteeId).map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.date} - {ev.topic}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tài liệu hướng dẫn</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-6 text-center hover:border-uel-blue transition-all cursor-pointer group relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setNewTask({...newTask, attachment: e.target.files?.[0] || null})} />
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-slate-400 group-hover:bg-uel-blue/10 group-hover:text-uel-blue transition-all"><Upload size={20} /></div>
                    <p className="text-sm font-bold text-slate-500">{newTask.attachment ? (newTask.attachment as File).name : 'Kéo thả hoặc chọn tệp'}</p>
                    {newTask.attachment && <button onClick={(e) => { e.preventDefault(); setNewTask({...newTask, attachment: null}); }} className="mt-2 text-[9px] font-black text-red-500 uppercase">Gỡ bỏ tệp</button>}
                  </div>
                </div>

                <button onClick={addTask} className="w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><Save size={20} /> {editingTaskId ? 'CẬP NHẬT NHIỆM VỤ' : 'GIAO NHIỆM VỤ'}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={() => setPreviewDoc(null)} />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="relative w-full max-w-6xl h-[95vh] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-uel-blue/10 text-uel-blue rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{previewDoc.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Xem trước tài liệu · {previewDoc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDownload(previewDoc)} className="px-6 py-3 bg-uel-orange text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2 hover:brightness-110 transition-all">
                    <Download size={16} /> TẢI VỀ
                  </button>
                  <button onClick={() => setPreviewDoc(null)} className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-0 overflow-hidden relative">
                {previewDoc.fileType === 'pdf' && previewDoc.url !== '#' ? (
                  <iframe 
                    src={`${previewDoc.url}#toolbar=0`} 
                    className="w-full h-full border-none"
                    title={previewDoc.name}
                  />
                ) : (
                  <div className="w-full max-w-4xl h-[70vh] bg-white shadow-2xl border border-slate-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-20 text-center space-y-6">
                    <div className="w-32 h-32 bg-uel-blue/5 rounded-[48px] flex items-center justify-center text-uel-blue/20">
                      <FileText size={80} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-slate-800">{previewDoc.name}</h4>
                      <p className="text-slate-400 font-medium max-w-md mx-auto mt-4">
                        Tệp tin này không hỗ trợ xem trước trực tiếp (định dạng {previewDoc.fileType?.toUpperCase()}). 
                        Vui lòng tải về để xem nội dung chi tiết.
                      </p>
                    </div>
                    <button onClick={() => handleDownload(previewDoc)} className="px-10 py-5 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center gap-3">
                      <Download size={20} /> TẢI VỀ NGAY
                    </button>
                  </div>
                )}
                
                {/* Visual overlay for premium feel */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CalendarModals 
        showCalendarModal={showCalendarModal} 
        setShowCalendarModal={setShowCalendarModal} 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        showMapModal={showMapModal}
        setShowMapModal={setShowMapModal}
        calendarView={calendarView} 
        setCalendarView={setCalendarView} 
        currentDate={currentDate} 
        setCurrentDate={setCurrentDate} 
        events={events} 
        setEvents={setEvents} 
        newMeeting={newMeeting} 
        setNewMeeting={setNewMeeting} 
        activeMentees={activeMentees} 
        handlePrevDate={handlePrevDate} 
        handleNextDate={handleNextDate} 
        handleCreateMeeting={handleCreateMeeting} 
        deleteEvent={deleteEvent} 
        isEventOnDay={isEventOnDay} 
        getEventStyle={getEventStyle} 
        customRoadmaps={customRoadmaps}
        activeMenteesData={activeMenteesData}
      />

      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowReportModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-uel-blue text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-uel-blue/30">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase">{editingReportId ? 'Chỉnh sửa báo cáo' : 'Báo cáo buổi học'}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mt-1">Ghi nhận tiến độ mentoring</p>
                  </div>
                </div>
                <button onClick={() => { setShowReportModal(false); setEditingReportId(null); }} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chọn buổi học (Nếu có)</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" value={newReport.meetingId} onChange={(e) => setNewReport({...newReport, meetingId: e.target.value})}>
                    <option value="">-- Không liên kết buổi học --</option>
                    {events.filter(e => e.menteeId === selectedMenteeId).map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.date} - {ev.topic}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ngày diễn ra</label><input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" value={newReport.date} onChange={(e) => setNewReport({...newReport, date: e.target.value})} /></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời lượng (Phút)</label><div className="relative"><Timer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="number" placeholder="60" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" value={newReport.duration} onChange={(e) => setNewReport({...newReport, duration: e.target.value})} /></div></div>
                </div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chủ đề thảo luận</label><input type="text" placeholder="Ví dụ: Review CV, Định hướng Career Track..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" value={newReport.topic} onChange={(e) => setNewReport({...newReport, topic: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kết quả buổi học</label><textarea placeholder="Ghi chú lại những gì Mentee đã đạt được hoặc cần cải thiện..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all h-32 resize-none" value={newReport.outcome} onChange={(e) => setNewReport({...newReport, outcome: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tài liệu đính kèm</label><div className="border-2 border-dashed border-slate-200 rounded-[32px] p-8 text-center hover:border-uel-blue transition-all cursor-pointer group relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setNewReport({...newReport, attachment: e.target.files?.[0] || null})} />
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:bg-uel-blue/10 group-hover:text-uel-blue transition-all"><Upload size={24} /></div>
                  <p className="text-sm font-bold text-slate-500">{newReport.attachment ? (newReport.attachment as File).name : 'Kéo thả tệp vào đây hoặc duyệt tệp'}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">PDF, DOCX, ZIP (Max 10MB)</p>
                  {newReport.attachment && <button onClick={(e) => { e.preventDefault(); setNewReport({...newReport, attachment: null}); }} className="mt-2 text-[9px] font-black text-red-500 uppercase">Gỡ bỏ tệp</button>}
                </div></div>
              </div>
              <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
                <button onClick={() => { setShowReportModal(false); setEditingReportId(null); }} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Hủy bỏ</button>
                <button onClick={handleSubmitReport} disabled={!newReport.topic || !newReport.outcome} className="flex-[2] py-4 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:brightness-100">
                  <Save size={18} /> {editingReportId ? 'CẬP NHẬT BÁO CÁO' : 'GỬI BÁO CÁO'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CustomizationModals showRoadmapModal={showRoadmapModal} setShowRoadmapModal={setShowRoadmapModal} showSkillsModal={showSkillsModal} setShowSkillsModal={setShowSkillsModal} customSkills={customSkills} setCustomSkills={setCustomSkills} customRoadmaps={customRoadmaps} setCustomRoadmaps={setCustomRoadmaps} selectedMenteeId={selectedMenteeId} defaultSkills={selectedMentee?.skills_assessment || []} defaultRoadmap={ROADMAPS[selectedMenteeExtra?.matchId || ''] || ROADMAPS['match-1']} />

      <AnimatePresence>
        {showNewFolderModal && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNewFolderModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-10">
              <h3 className="text-xl font-black text-slate-900 uppercase mb-6">Tạo thư mục mới</h3>
              <input type="text" placeholder="Tên thư mục..." value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue mb-6" autoFocus />
              <div className="flex gap-4">
                <button onClick={() => setShowNewFolderModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Hủy</button>
                <button onClick={handleCreateFolder} className="flex-1 py-4 bg-uel-blue text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-uel-blue/20 hover:brightness-110 transition-all">Tạo mới</button>
              </div>
            </motion.div>
          </div>
        )}

        {showMoveModal && movingItemId && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMoveModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 flex flex-col max-h-[80vh]">
              <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Di chuyển tài liệu</h3>
              <p className="text-xs font-bold text-slate-400 mb-8">Chọn thư mục đích cho <span className="text-uel-blue font-black underline">"{selectedMenteeExtra?.resources.find((r: any) => r.id === movingItemId)?.name}"</span></p>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2 mb-8">
                <button onClick={() => handleMoveItem(movingItemId, null)} className={cn("w-full p-4 text-left rounded-2xl font-bold text-sm flex items-center gap-3 transition-all", selectedMenteeExtra?.resources.find((r: any) => r.id === movingItemId)?.parentId === null ? "bg-uel-blue/5 text-uel-blue border-2 border-uel-blue/20" : "hover:bg-slate-50 border-2 border-transparent")}>
                  <Layers size={18} /> Root (Tất cả tài liệu)
                </button>
                {selectedMenteeExtra?.resources
                  .filter((r: any) => r.type === 'folder' && r.id !== movingItemId)
                  .map((folder: any) => (
                    <button key={folder.id} onClick={() => handleMoveItem(movingItemId, folder.id)} className={cn("w-full p-4 text-left rounded-2xl font-bold text-sm flex items-center gap-3 transition-all", selectedMenteeExtra?.resources.find((r: any) => r.id === movingItemId)?.parentId === folder.id ? "bg-uel-blue/5 text-uel-blue border-2 border-uel-blue/20" : "hover:bg-slate-50 border-2 border-transparent")}>
                      <BookOpen size={18} /> {folder.name}
                    </button>
                  ))
                }
              </div>
              
              <button onClick={() => setShowMoveModal(false)} className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Đóng</button>
            </motion.div>
          </div>
        )}

        {showRenameModal && renamingItemId && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRenameModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-10">
              <h3 className="text-xl font-black text-slate-900 uppercase mb-6">Đổi tên</h3>
              <input type="text" placeholder="Tên mới..." value={renamingName} onChange={(e) => setRenamingName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRenameItem()} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue mb-6" autoFocus />
              <div className="flex gap-4">
                <button onClick={() => setShowRenameModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Hủy</button>
                <button onClick={handleRenameItem} className="flex-1 py-4 bg-uel-blue text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-uel-blue/20 hover:brightness-110 transition-all">Cập nhật</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function CustomizationModals({ showRoadmapModal, setShowRoadmapModal, showSkillsModal, setShowSkillsModal, customSkills, setCustomSkills, customRoadmaps, setCustomRoadmaps, selectedMenteeId, defaultSkills, defaultRoadmap }: any) {
  const menteeSkills = customSkills[selectedMenteeId] || defaultSkills;
  const menteeRoadmap = customRoadmaps[selectedMenteeId] || defaultRoadmap;

  const [newSkillName, setNewSkillName] = useState('');

  const PREDEFINED_SKILLS = [
    'Giao tiếp (Communication)',
    'Kỹ thuật (Technical)',
    'Lãnh đạo (Leadership)',
    'Giải quyết vấn đề',
    'Quản lý thời gian',
    'Làm việc nhóm',
    'Phân tích dữ liệu',
    'SQL',
    'Python',
    'Thuyết trình'
  ];

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkills = [...menteeSkills, { skill: newSkillName.trim(), score: 5, fullMark: 10 }];
    setCustomSkills({ ...customSkills, [selectedMenteeId]: newSkills });
    setNewSkillName('');
  };

  return (
    <>
      <AnimatePresence>
        {showSkillsModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSkillsModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-uel-blue/10 text-uel-blue rounded-xl flex items-center justify-center"><Activity size={20} /></div><h3 className="text-xl font-black text-slate-900 uppercase">Tùy chỉnh kỹ năng</h3></div>
                <button onClick={() => setShowSkillsModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                {menteeSkills.map((skill: any, idx: number) => (
                  <div key={idx} className="space-y-2 relative group">
                    <button onClick={() => {
                       const newSkills = menteeSkills.filter((_: any, i: number) => i !== idx);
                       setCustomSkills({ ...customSkills, [selectedMenteeId]: newSkills });
                    }} className="absolute -top-2 right-0 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                    <div className="flex justify-between text-sm font-bold text-slate-700"><span>{skill.skill || skill.subject}</span><span className="text-uel-blue">{skill.score}</span></div>
                    <input type="range" min="0" max="10" value={skill.score} onChange={(e) => {
                      const newSkills = [...menteeSkills];
                      newSkills[idx] = { ...newSkills[idx], score: parseInt(e.target.value) };
                      setCustomSkills({ ...customSkills, [selectedMenteeId]: newSkills });
                    }} className="w-full accent-uel-blue" />
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Thêm kỹ năng mới</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input type="text" list="predefined-skills" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} placeholder="Nhập tên hoặc chọn..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-uel-blue" onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }} />
                      <datalist id="predefined-skills">
                        {PREDEFINED_SKILLS.map(skill => <option key={skill} value={skill} />)}
                      </datalist>
                    </div>
                    <button onClick={handleAddSkill} disabled={!newSkillName.trim()} className="px-4 bg-uel-blue text-white rounded-xl font-black text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:hover:brightness-100"><Plus size={20} /></button>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowSkillsModal(false)} className="mt-8 w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><Save size={20} /> LƯU THAY ĐỔI</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoadmapModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRoadmapModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-10 flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-uel-blue/10 text-uel-blue rounded-xl flex items-center justify-center"><Target size={20} /></div><h3 className="text-xl font-black text-slate-900 uppercase">Tùy chỉnh lộ trình</h3></div>
                <button onClick={() => setShowRoadmapModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                {menteeRoadmap.map((ms: any, idx: number) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-2xl space-y-4 relative group">
                    <button onClick={() => {
                      const newRm = menteeRoadmap.filter((_: any, i: number) => i !== idx);
                      setCustomRoadmaps({ ...customRoadmaps, [selectedMenteeId]: newRm });
                    }} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    
                    <div className="grid grid-cols-2 gap-4 pr-8">
                      <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tiêu đề</label><input type="text" value={ms.title} onChange={(e) => {
                        const newRm = [...menteeRoadmap]; newRm[idx].title = e.target.value; setCustomRoadmaps({ ...customRoadmaps, [selectedMenteeId]: newRm });
                      }} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-uel-blue" /></div>
                      
                      <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thời gian</label><input type="text" value={ms.deadline || ''} onChange={(e) => {
                        const newRm = [...menteeRoadmap]; newRm[idx].deadline = e.target.value; setCustomRoadmaps({ ...customRoadmaps, [selectedMenteeId]: newRm });
                      }} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-uel-blue" /></div>
                    </div>
                    
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mô tả</label><textarea value={ms.description || ''} onChange={(e) => {
                      const newRm = [...menteeRoadmap]; newRm[idx].description = e.target.value; setCustomRoadmaps({ ...customRoadmaps, [selectedMenteeId]: newRm });
                    }} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-uel-blue resize-none h-20" /></div>
                  </div>
                ))}
                
                <button onClick={() => {
                  const newRm = [...menteeRoadmap, { id: Date.now(), title: 'Cột mốc mới', description: '', deadline: '', status: 'upcoming' }];
                  setCustomRoadmaps({ ...customRoadmaps, [selectedMenteeId]: newRm });
                }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-widest hover:border-uel-blue hover:text-uel-blue transition-all flex items-center justify-center gap-2"><Plus size={16} /> THÊM CỘT MỐC</button>
              </div>
              <div className="pt-8 mt-auto"><button onClick={() => setShowRoadmapModal(false)} className="w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><Save size={20} /> LƯU LỘ TRÌNH</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CalendarModals({ showCalendarModal, setShowCalendarModal, showCreateModal, setShowCreateModal, showMapModal, setShowMapModal, calendarView, setCalendarView, currentDate, setCurrentDate, events, setEvents, newMeeting, setNewMeeting, activeMentees, handlePrevDate, handleNextDate, handleCreateMeeting, deleteEvent, isEventOnDay, getEventStyle, customRoadmaps, activeMenteesData }: any) {
  return (
    <>
      <AnimatePresence>
        {showCalendarModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCalendarModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-[40px] shadow-2xl flex overflow-hidden">
              <div className="w-[320px] border-r border-slate-100 flex flex-col bg-slate-50/50">
                <div className="p-8">
                  <button onClick={() => setShowCreateModal(true)} className="w-full py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"><Plus size={20} className="text-uel-blue" /> Tạo sự kiện mới</button>
                  <div className="mt-10 space-y-8">
                    <div><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Lịch của bạn</h4><div className="space-y-3"><div className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100"><div className="w-4 h-4 rounded bg-uel-blue" /><span className="text-xs font-bold text-slate-700">Mentoring Sessions</span><Check size={14} className="ml-auto text-uel-blue" /></div></div></div>
                    <div><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Mentees Active</h4><div className="space-y-4">{activeMentees.map((m: any) => (<div key={m.id} className="flex items-center gap-3 group cursor-pointer"><img src={m.avatar_url} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="" /><span className="text-xs font-black text-slate-600 group-hover:text-uel-blue transition-colors">{m.full_name}</span></div>))}</div></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col h-full bg-white">
                <div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between">
                  <div className="flex items-center gap-6"><h2 className="text-2xl font-black text-slate-900">{`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}</h2><div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl"><button onClick={handlePrevDate} className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-600"><ChevronLeft size={20} /></button><button onClick={handleNextDate} className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-600"><ChevronRight size={20} /></button></div><button onClick={() => setCurrentDate(new Date('2026-04-22'))} className="px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:border-uel-blue hover:text-uel-blue transition-all">Hôm nay</button></div>
                  <div className="flex items-center gap-4"><div className="flex bg-slate-100 p-1 rounded-xl">{(['Tuần', 'Tháng'] as const).map(v => (<button key={v} onClick={() => setCalendarView(v as any)} className={cn("px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all", calendarView === v ? "bg-white text-uel-blue shadow-sm" : "text-slate-400 hover:text-slate-600")}>{v}</button>))}</div><button onClick={() => setShowCalendarModal(false)} className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><X size={24} /></button></div>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar flex flex-col relative">
                  {calendarView === 'Tuần' ? (
                    <>
                      <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100 sticky top-0 bg-white z-20">
                        <div className="h-16 flex items-center justify-center text-[10px] font-black text-slate-300 border-r border-slate-50 uppercase tracking-widest">GMT+7</div>
                        {['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'].map((day, i) => {
                          const date = new Date(currentDate); date.setDate(currentDate.getDate() + i); const isToday = new Date().toDateString() === date.toDateString();
                          return (<div key={day} className="h-16 flex flex-col items-center justify-center border-r border-slate-50"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span><span className={cn("text-xl font-black mt-1 w-9 h-9 flex items-center justify-center rounded-full", isToday ? "bg-uel-blue text-white shadow-lg shadow-uel-blue/30" : "text-slate-800")}>{date.getDate()}</span></div>);
                        })}
                      </div>
                      <div className="relative flex-1 grid grid-cols-[100px_repeat(7,1fr)] min-h-[1440px]">
                        <div className="bg-slate-50/30">{Array.from({ length: 24 }).map((_, i) => (<div key={i} className="h-[60px] relative border-b border-slate-50 pr-4"><span className="absolute -top-3 right-4 text-[10px] font-black text-slate-300">{i}:00</span></div>))}</div>
                        {Array.from({ length: 7 }).map((_, col) => (
                          <div key={col} className="relative border-r border-slate-100 group">
                            {Array.from({ length: 24 }).map((_, row) => (<div key={row} onClick={() => { const baseDate = new Date(currentDate); baseDate.setDate(baseDate.getDate() + col); setNewMeeting({...newMeeting, date: baseDate.toISOString().split('T')[0], startTime: `${row.toString().padStart(2, '0')}:00`, endTime: `${(row + 1).toString().padStart(2, '0')}:00`}); setShowCreateModal(true); }} className="h-[60px] border-b border-slate-50 hover:bg-uel-blue/5 cursor-pointer transition-colors" />))}
                            {events.filter((e: any) => isEventOnDay(e, col)).map((event: any) => (
                              <motion.div key={event.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={getEventStyle(event)} className={cn("absolute left-1 right-1 rounded-xl p-3 border-l-4 border-white shadow-xl cursor-pointer hover:brightness-110 transition-all z-10 overflow-hidden", event.type === 'online' ? "bg-uel-blue shadow-uel-blue/20" : "bg-uel-orange shadow-uel-orange/20")}>
                                <div className="flex items-center justify-between text-white/70"><span className="text-[8px] font-black uppercase">{event.startTime} - {event.endTime}</span><button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className="p-1 hover:bg-white/20 rounded-md"><Trash2 size={10} /></button></div>
                                <h5 className="text-white font-black text-[11px] mt-1 leading-tight truncate">{event.topic} · {event.menteeName}</h5>
                                <p className="text-[9px] font-bold text-white/80 mt-1 uppercase tracking-widest truncate">{event.type === 'online' ? 'Google Meet' : event.location}</p>
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
                      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50 sticky top-0 z-20">
                        {['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'].map(day => (
                          <div key={day} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 last:border-0">{day}</div>
                        ))}
                      </div>
                      <div className="flex-1 grid grid-cols-7 auto-rows-[minmax(100px,1fr)] overflow-y-auto custom-scrollbar">
                        {(() => {
                          const year = currentDate.getFullYear();
                          const month = currentDate.getMonth();
                          const firstDayOfMonth = new Date(year, month, 1).getDay();
                          const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
                          const daysInMonth = new Date(year, month + 1, 0).getDate();
                          const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
                          
                          return Array.from({ length: totalCells }).map((_, i) => {
                            const dayNum = i - startOffset + 1;
                            const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
                            const d = new Date(year, month, dayNum);
                            const dateStr = isCurrentMonth ? `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}` : '';
                            const isToday = isCurrentMonth && new Date().toDateString() === d.toDateString();
                            const dayEvents = isCurrentMonth ? events.filter((e: any) => e.date === dateStr) : [];
                            
                            return (
                              <div key={i} onClick={() => { if(isCurrentMonth) { setNewMeeting({...newMeeting, date: dateStr, startTime: '09:00', endTime: '10:00'}); setShowCreateModal(true); } }} className={cn("border-b border-r border-slate-100 p-2 flex flex-col gap-1 transition-colors relative min-h-[100px]", isCurrentMonth ? "hover:bg-slate-50 cursor-pointer" : "bg-slate-50/50 cursor-default", isToday ? "bg-uel-blue/5" : "")}>
                                {isCurrentMonth && (
                                  <>
                                    <span className={cn("text-xs font-black w-6 h-6 flex items-center justify-center rounded-full mb-1", isToday ? "bg-uel-blue text-white" : "text-slate-600")}>{dayNum}</span>
                                    <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1">
                                      {dayEvents.map((event: any) => (
                                        <div key={event.id} onClick={(e) => { e.stopPropagation(); }} className={cn("px-2 py-1 rounded border-l-2 text-[9px] font-black truncate shadow-sm relative group cursor-default", event.type === 'online' ? "bg-uel-blue/10 border-uel-blue text-uel-blue" : "bg-uel-orange/10 border-uel-orange text-uel-orange")}>
                                          {event.startTime} - {event.topic}
                                          <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"><Trash2 size={10} /></button>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-uel-blue text-white rounded-xl flex items-center justify-center"><Plus size={20} /></div><h3 className="text-xl font-black text-slate-900 uppercase">Tạo lịch hẹn mới</h3></div>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chọn Mentee</label><select value={newMeeting.menteeId} onChange={(e) => setNewMeeting({...newMeeting, menteeId: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all"><option value="">-- Chọn sinh viên --</option>{activeMentees.map((m: any) => <option key={m.id} value={m.id}>{m.full_name}</option>)}</select></div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chủ đề thảo luận</label>
                  <input type="text" placeholder="Review Portfolio, Career Coaching..." value={newMeeting.topic} onChange={(e) => setNewMeeting({...newMeeting, topic: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thuộc cột mốc lộ trình nào?</label>
                  <select 
                    value={newMeeting.milestoneId} 
                    onChange={(e) => setNewMeeting({...newMeeting, milestoneId: e.target.value})} 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all"
                  >
                    <option value="">-- Không liên kết --</option>
                    {(customRoadmaps[newMeeting.menteeId || ''] || ROADMAPS[activeMenteesData.find((m: any) => m.id === newMeeting.menteeId)?.matchId || ''] || []).map((m: any) => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bắt đầu</label><input type="time" value={newMeeting.startTime} onChange={(e) => setNewMeeting({...newMeeting, startTime: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" /></div><div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kết thúc</label><input type="time" value={newMeeting.endTime} onChange={(e) => setNewMeeting({...newMeeting, endTime: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" /></div></div>
                <div className="flex p-1 bg-slate-100 rounded-2xl"><button onClick={() => setNewMeeting({...newMeeting, type: 'online'})} className={cn("flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2", newMeeting.type === 'online' ? "bg-white text-uel-blue shadow-sm" : "text-slate-400")}><Video size={14} /> Online</button><button onClick={() => setNewMeeting({...newMeeting, type: 'offline'})} className={cn("flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2", newMeeting.type === 'offline' ? "bg-white text-uel-orange shadow-sm" : "text-slate-400")}><MapPin size={14} /> Offline</button></div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{newMeeting.type === 'online' ? 'Link Google Meet' : 'Địa điểm'}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={newMeeting.type === 'online' ? 'meet.google.com/...' : 'Phòng A1.01, Thư viện...'} 
                      value={newMeeting.location} 
                      onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})} 
                      className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" 
                    />
                    {newMeeting.type === 'offline' && (
                      <button 
                        onClick={() => setShowMapModal(true)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-uel-blue hover:text-uel-orange transition-colors"
                        title="Chọn trên bản đồ"
                      >
                        <MapPin size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <button onClick={handleCreateMeeting} className="w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"><Save size={20} /> LƯU LỊCH HẸN</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMapModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowMapModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[80vh]">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-uel-blue/10 text-uel-blue rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                  <h3 className="text-xl font-black text-slate-900 uppercase">Chọn địa điểm trên bản đồ</h3>
                </div>
                <button onClick={() => setShowMapModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
              </div>
              <div className="flex-1 relative bg-slate-100 flex flex-col md:flex-row">
                <div className="flex-1 relative cursor-crosshair overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
                  <div className="absolute inset-0 bg-uel-blue/5" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-uel-orange animate-bounce">
                    <MapPin size={48} fill="currentColor" className="text-white" />
                  </div>
                </div>
                <div className="w-full md:w-96 bg-white border-l border-slate-100 p-8 space-y-8 overflow-y-auto custom-scrollbar">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Gợi ý địa điểm phổ biến</h4>
                  <div className="space-y-4">
                    {['Phòng A1.01, Thư viện UEL', 'Khu tự học Nhà B', 'The Coffee House - Làng ĐH', 'Highlands Coffee UEL'].map((loc, i) => (
                      <button key={i} onClick={() => { setNewMeeting({...newMeeting, location: loc}); setShowMapModal(false); }} className="w-full text-left p-5 rounded-[24px] hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all font-black text-slate-900 text-sm">{loc}</button>
                    ))}
                  </div>
                  <button onClick={() => setShowMapModal(false)} className="w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-2xl shadow-uel-blue/20 hover:scale-[1.02] transition-all">XÁC NHẬN VỊ TRÍ</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function Tab({ label, active, onClick, count }: any) {
  return (
    <button onClick={onClick} className={cn("pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative flex items-center gap-2", active ? "text-uel-blue" : "text-slate-400 hover:text-slate-600")}>
      {label}
      {count !== undefined && <span className={cn("px-1.5 py-0.5 rounded-md text-[8px]", active ? "bg-uel-blue text-white" : "bg-slate-100 text-slate-500")}>{count}</span>}
      {active && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-uel-orange rounded-full" />}
    </button>
  );
}

function SectionTitle({ icon: Icon, title }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-uel-blue/5 rounded-xl flex items-center justify-center text-uel-blue"><Icon size={20} /></div>
      <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function ResourceMenu({ item, onDelete, onMove, onRename }: { item: ResourceItem, onDelete: () => void, onMove: () => void, onRename: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
        <MoreVertical size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 overflow-hidden">
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); onMove(); }} className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <ExternalLink size={14} /> Di chuyển đến...
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); onRename(); }} className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <Settings size={14} /> Đổi tên
              </button>
              <div className="h-px bg-slate-50 my-1" />
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); onDelete(); }} className="w-full px-4 py-3 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors">
                <Trash2 size={14} /> Xóa tài liệu
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }

