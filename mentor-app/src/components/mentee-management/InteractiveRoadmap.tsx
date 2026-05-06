'use client';

import React from 'react';
import { Milestone } from '@/lib/types';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, Video, CheckSquare, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InteractiveRoadmapProps {
  milestones: Milestone[];
  sessions?: any[];
  tasks?: any[];
  onNavigate?: (tab: string, id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export default function InteractiveRoadmap({ 
  milestones, 
  sessions = [], 
  tasks = [], 
  onNavigate, 
  onToggleStatus 
}: InteractiveRoadmapProps) {
  const [expandedMilestones, setExpandedMilestones] = React.useState<Set<string>>(new Set());
  const [expandedSessions, setExpandedSessions] = React.useState<Set<string>>(new Set());

  const toggleMilestone = (id: string) => {
    const next = new Set(expandedMilestones);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedMilestones(next);
  };

  const toggleSession = (id: string) => {
    const next = new Set(expandedSessions);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedSessions(next);
  };

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <div className="relative space-y-8 pl-8">
      {/* Vertical Line */}
      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100" />

      {sortedMilestones.map((ms, i) => {
        let currentStatus = ms.status;
        let completedAt = ms.completed_at;

        if (ms.deadline && new Date(ms.deadline) < new Date() && currentStatus !== 'completed') {
          currentStatus = 'completed';
          completedAt = ms.deadline;
        }

        const isExpanded = expandedMilestones.has(ms.id);
        const linkedSessions = sessions.filter((s: any) => s.milestoneId === ms.id);

        return (
          <motion.div
            key={ms.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            {/* Dot */}
            <div className={cn(
              "absolute -left-[29px] top-1.5 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center transition-all z-10 shadow-sm",
              currentStatus === 'completed' ? "bg-emerald-500" : 
              currentStatus === 'in_progress' ? "bg-uel-blue animate-pulse" : "bg-slate-200"
            )}>
              {currentStatus === 'completed' ? (
                <CheckCircle2 size={14} className="text-white" />
              ) : currentStatus === 'in_progress' ? (
                <Clock size={14} className="text-white" />
              ) : (
                <Circle size={14} className="text-slate-400" />
              )}
            </div>

            <div className={cn(
              "p-6 rounded-[24px] border-2 transition-all cursor-pointer",
              currentStatus === 'completed' ? "bg-emerald-50/20 border-emerald-100 opacity-80" :
              currentStatus === 'in_progress' ? "bg-white border-uel-blue shadow-xl shadow-uel-blue/5" :
              "bg-white border-slate-100 hover:border-uel-blue/30"
            )} onClick={() => toggleMilestone(ms.id)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={cn(
                      "text-sm font-black uppercase tracking-tight",
                      currentStatus === 'completed' ? "text-emerald-700 line-through" : "text-slate-900"
                    )}>
                      {ms.title}
                    </h4>
                    {linkedSessions.length > 0 && (
                      <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black text-slate-400 rounded-full uppercase">
                        {linkedSessions.length} BUỔI HỌC
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">
                    {ms.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {ms.deadline && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Clock size={12} /> {ms.deadline}
                    </div>
                  )}
                  {linkedSessions.length > 0 && (
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                  )}
                </div>
              </div>

              {currentStatus === 'in_progress' && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '40%' }}
                      className="h-full bg-uel-blue"
                    />
                  </div>
                  <span className="text-[10px] font-black text-uel-blue uppercase">In Progress</span>
                </div>
              )}

              {completedAt && (
                <p className="mt-3 text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 size={12} /> Hoàn thành vào {completedAt}
                </p>
              )}
            </div>

            {/* Level 2: Sessions */}
            <AnimatePresence>
              {isExpanded && linkedSessions.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-6 mt-4 space-y-4 overflow-hidden border-l-2 border-slate-100 pl-6"
                >
                  {linkedSessions.map((session: any) => {
                    const isSessionExpanded = expandedSessions.has(session.id);
                    const linkedTasks = tasks.filter((t: any) => t.eventId === session.id);

                    return (
                      <div key={session.id} className="space-y-3">
                        <div 
                          className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-uel-blue/20 transition-all cursor-pointer group/session"
                          onClick={(e) => { e.stopPropagation(); toggleSession(session.id); }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-uel-blue/10 text-uel-blue rounded-lg flex items-center justify-center">
                                <Video size={16} />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-slate-900 uppercase">{session.topic}</h5>
                                <p className="text-[10px] font-bold text-slate-400">{session.date} • {session.startTime}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {linkedTasks.length > 0 && (
                                <span className="text-[9px] font-black text-slate-300 uppercase">
                                  {linkedTasks.length} NHIỆM VỤ
                                </span>
                              )}
                              <button 
                                onClick={(e) => { e.stopPropagation(); onNavigate?.('sessions', session.id); }}
                                className="p-2 text-slate-400 hover:text-uel-blue transition-colors"
                                title="Đi tới chi tiết buổi học"
                              >
                                <ExternalLink size={14} />
                              </button>
                              {linkedTasks.length > 0 && (
                                <div className="text-slate-300">
                                  {isSessionExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Level 3: Tasks */}
                        <AnimatePresence>
                          {isSessionExpanded && linkedTasks.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-6 space-y-2 overflow-hidden border-l border-slate-100 pl-4"
                            >
                              {linkedTasks.map((task: any) => (
                                <div 
                                  key={task.id}
                                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-50 hover:border-uel-blue/10 transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <CheckSquare size={14} className={task.status === 'completed' ? "text-emerald-500" : "text-slate-300"} />
                                    <span className={cn(
                                      "text-[11px] font-bold",
                                      task.status === 'completed' ? "text-slate-400 line-through" : "text-slate-700"
                                    )}>
                                      {task.title}
                                    </span>
                                  </div>
                                  <button 
                                    onClick={() => onNavigate?.('tasks', task.id.toString())}
                                    className="text-[9px] font-black text-uel-blue uppercase tracking-widest hover:underline"
                                  >
                                    Chi tiết
                                  </button>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
