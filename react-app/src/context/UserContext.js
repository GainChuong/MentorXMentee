import React, { createContext, useState, useContext } from 'react';

// Import initial mentees for managed list
import menteeBao from '../assets/mentee-bao.png';
import menteeNhi from '../assets/mentee-nhi.jpg';
import menteeGiang from '../assets/mentee-giang.jpg';
import defaultAvatar from '../assets/avatar-male-1.png';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    role: 'guest',
    name: 'Khách',
    avatar: defaultAvatar
  });

  // Manage mentees state
  const [managedMentees, setManagedMentees] = useState([
    { id: 1, name: 'Huỳnh Gia Bảo', track: 'Data Analyst', sessions: 9, maxSessions: 20, code: 'M2026-001', avatar: menteeBao },
    { id: 2, name: 'Đặng Quỳnh Nhi', track: 'E-Commerce', sessions: 5, maxSessions: 15, code: 'M2026-002', avatar: menteeNhi },
    { id: 3, name: 'Nguyễn Ngọc Trường Giang', track: 'Business Analyst', sessions: 2, maxSessions: 10, code: 'M2026-003', avatar: menteeGiang },
  ]);

  const acceptMentee = (application) => {
    const newMentee = {
      id: Date.now(), // Generate a unique ID
      name: application.name,
      track: application.role,
      sessions: 0,
      maxSessions: 10,
      code: `M2026-${Math.floor(100 + Math.random() * 900)}`,
      avatar: application.avatar
    };
    setManagedMentees(prev => [...prev, newMentee]);
  };

  const loginAsMentor = () => {
    setCurrentUser({
      role: 'alumni_mentor',
      name: 'Anh Bằng Nhân Trí',
      avatar: defaultAvatar
    });
  };

  const logout = () => {
    setCurrentUser({
      role: 'guest',
      name: 'Khách',
      avatar: defaultAvatar
    });
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      loginAsMentor, 
      logout,
      managedMentees,
      acceptMentee
    }}>
      {children}
    </UserContext.Provider>
  );
};
