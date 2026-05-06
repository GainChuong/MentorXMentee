export type Role = 'admin' | 'mentor' | 'mentee' | 'alumnus';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  avatar_url?: string;
  bio?: string;
  linkedin_url?: string;
  career_track?: string;
  skills?: string[];
  phone?: string;
  industry?: string;
  years_experience?: number;
  experience_list?: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  activity_list?: {
    type: 'post' | 'mentor' | 'award';
    title: string;
    date: string;
    description: string;
  }[];
  is_mentor_approved: boolean;
  applied_to_be_mentor: boolean;
}

export interface Mentor {
  id: string; // FK to UserProfile
  capacity: number;
  active_mentees: number;
  career_track: string[];
  skills: string[];
  is_intake_open: boolean;
}

export interface Mentee {
  id: string; // FK to UserProfile
  full_name: string;
  avatar_url?: string;
  education_level: string;
  career_track: string;
  cv_url?: string;
  cv_filename?: string;
  goals: string;
  // Extended fields for upgrade
  health_score?: number; // 0-100
  skills_assessment?: SkillAssessment[];
}

export interface SkillAssessment {
  skill: string;
  score: number;
  category: 'technical' | 'soft' | 'business';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  deadline?: string;
  completed_at?: string;
  order: number;
}

export interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface MentorApplication {
  id: string;
  user_id: string;
  applied_at: string;
  target_season_id: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MentorshipMatch {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  applied_at: string;
  season_id: string;
}

export interface Session {
  id: string;
  match_id: string;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'rescheduled' | 'cancelled';
  report?: {
    duration: number;
    topics: string[];
    outcome: string;
  };
  journal?: {
    reflection: string;
    key_takeaways: string[];
    next_steps: string;
    mentee_mood?: 'happy' | 'confused' | 'inspired' | 'stressed';
  };
}

export interface ForumPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  tags: string[];
  category?: string;
  created_at: string;
  likes: number;
  replies_count: number;
  edit_history?: {
    content: string;
    edited_at: string;
  }[];
  images?: string[];
}

export interface ResourceItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  fileType?: string; // 'pdf', 'zip', 'docx', etc.
  size?: string;
  author: 'Mentor' | 'Mentee';
  uploadedAt: string;
  parentId: string | null; // null for root
  url?: string;
}

