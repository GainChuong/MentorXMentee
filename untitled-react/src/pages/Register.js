import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import './Auth.css';

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ username:'', email:'', password:'', confirmPassword:'', role:'' });
  const set = (e) => setForm({...form, [e.target.name]: e.target.value});
  const submit = (e) => { e.preventDefault(); if(form.password!==form.confirmPassword){alert('Mật khẩu không khớp!');return;} console.log('Register:',form); };

  return (
    <div className="login-page">
      <img src="/rectangle1191143-ptu-600h.png" alt="" className="login-bg" aria-hidden="true"/>
      <Header />
      <div className="login-content">
        <div className="login-card">
          <div className="login-card-logo">
            <img src="/uel11143-imot-200h.png" alt="UEL"/>
            <h1>Đăng Ký</h1>
            <p>Tạo tài khoản Mentor x Mentee</p>
          </div>
          <form className="login-form" onSubmit={submit}>
            <div className="form-group"><label>Tên người dùng</label><input type="text" name="username" className="form-input" placeholder="Nhập tên người dùng" value={form.username} onChange={set} required/></div>
            <div className="form-group"><label>Email</label><input type="email" name="email" className="form-input" placeholder="Nhập email" value={form.email} onChange={set} required/></div>
            <div className="form-group"><label>Mật khẩu</label><div className="password-wrapper"><input type={showPw?'text':'password'} name="password" className="form-input" placeholder="Tạo mật khẩu" value={form.password} onChange={set} required minLength={8}/><button type="button" className="password-toggle" onClick={()=>setShowPw(!showPw)}>
              {showPw ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button></div></div>
            <div className="form-group"><label>Xác nhận mật khẩu</label><input type="password" name="confirmPassword" className="form-input" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={set} required/></div>
            <div className="form-group"><label>Đối tượng</label><select name="role" className="form-select" value={form.role} onChange={set} required><option value="" disabled>Chọn vai trò</option><option value="mentor">Mentor</option><option value="mentee">Mentee</option></select></div>
            <button type="submit" className="btn-primary">Đăng Ký</button>
            <p className="login-footer">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
