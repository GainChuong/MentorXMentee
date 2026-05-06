import React, { createContext, useState, useContext } from 'react';

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
    avatar: '/untitled10611143-dj2u-200h.png'
  });

  const loginAsMentor = () => {
    setCurrentUser({
      role: 'alumni_mentor',
      name: 'Anh Bằng Nhân Trí',
      avatar: '/untitled10611143-dj2u-200h.png'
    });
  };

  const logout = () => {
    setCurrentUser({
      role: 'guest',
      name: 'Khách',
      avatar: '/untitled10611143-dj2u-200h.png'
    });
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loginAsMentor, logout }}>
      {children}
    </UserContext.Provider>
  );
};
