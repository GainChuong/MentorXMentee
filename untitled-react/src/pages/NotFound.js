import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{
    minHeight:'60vh', display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', textAlign:'center',
    padding:'40px 20px'
  }}>
    <div style={{color:'var(--color-orange)', marginBottom:'16px'}}>
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <h1 style={{fontSize:'48px', fontWeight:800, color:'var(--color-navy)', marginBottom:'8px'}}>404</h1>
    <p style={{fontSize:'16px', color:'var(--color-text-muted)', marginBottom:'28px'}}>
      Trang bạn tìm kiếm không tồn tại
    </p>
    <Link to="/" style={{
      padding:'12px 28px', background:'var(--color-navy)', color:'#fff',
      borderRadius:'var(--radius-pill)', textDecoration:'none',
      fontWeight:600, fontSize:'14px'
    }}>
      ← Về trang chủ
    </Link>
  </div>
);

export default NotFound;
