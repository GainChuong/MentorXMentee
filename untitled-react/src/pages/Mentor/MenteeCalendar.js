import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './MenteeCalendar.css';
import iconCreateEvent from '../../assets/icon-create-event.png';
import iconWarning from '../../assets/icon-warning.png';

const MenteeCalendar = () => {
  const { currentUser, managedMentees } = useUser();
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    menteeId: '',
    startDate: '2026-05-07',
    endDate: '2026-05-07',
    startTime: '10:00',
    endTime: '12:00',
    link: 'meet.google.com/abc-defg-hij',
    notes: ''
  });

  // Mock Events State (to make it dynamic)
  const [events, setEvents] = useState([
    {
      id: 1,
      student: 'Nguyễn Ngọc Trường Giang',
      title: 'SQL Nâng cao',
      date: '2026-05-04',
      time: '08:00 - 10:00',
      color: 'purple',
      top: '10%',
      left: 'calc(14.28% * 1 + 60px)',
      height: '20%'
    },
    {
      id: 2,
      student: 'Đặng Quỳnh Nhi',
      title: 'Machine Learning',
      date: '2026-05-05',
      time: '14:00 - 16:00',
      color: 'green-light',
      top: '50%',
      left: 'calc(14.28% * 2 + 60px)',
      height: '20%'
    },
    {
      id: 3,
      student: 'Huỳnh Gia Bảo',
      title: 'Review dự án cuối kỳ',
      date: '2026-05-07',
      time: '10:00 - 12:00',
      color: 'green',
      top: '20%',
      left: 'calc(14.28% * 4 + 60px)',
      height: '20%'
    }
  ]);

  const [scheduleRequests, setScheduleRequests] = useState([
    {
      id: 1,
      name: 'Đặng Quỳnh Nhi',
      title: 'Hỏi về kĩ thuật Fine-tune LLM',
      date: '2026-05-10',
      time: '14:30',
      endTime: '16:30',
      avatar: 'https://ui-avatars.com/api/?name=Dang+Quynh+Nhi&background=fef3c7&color=d97706'
    },
    {
      id: 2,
      name: 'Nguyễn Ngọc Trường Giang',
      title: 'Review đồ án SQL nâng cao',
      date: '2026-05-12',
      time: '09:00',
      endTime: '11:00',
      avatar: 'https://ui-avatars.com/api/?name=Truong+Giang&background=ede9fe&color=7c3aed'
    },
    {
      id: 3,
      name: 'Huỳnh Gia Bảo',
      title: 'Tư vấn lộ trình Data Analyst',
      date: '2026-05-15',
      time: '16:00',
      endTime: '18:00',
      avatar: 'https://ui-avatars.com/api/?name=Gia+Bao&background=dcfce7&color=16a34a'
    }
  ]);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [requestToReject, setRequestToReject] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      menteeId: managedMentees[0]?.id || '',
      startDate: '2026-05-07',
      endDate: '2026-05-07',
      startTime: '10:00',
      endTime: '12:00',
      link: 'meet.google.com/abc-defg-hij',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    const mentee = managedMentees.find(m => m.name === event.student);
    setForm({
      title: event.title,
      menteeId: mentee?.id || '',
      startDate: event.date || '2026-05-07',
      endDate: event.date || '2026-05-07',
      startTime: event.time.split(' - ')[0],
      endTime: event.time.split(' - ')[1],
      link: event.link || 'meet.google.com/abc-defg-hij',
      notes: event.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    const mentee = managedMentees.find(m => m.id.toString() === form.menteeId.toString());
    
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      student: mentee ? mentee.name : 'Unknown',
      title: form.title,
      date: form.startDate, // Use start date as primary reference for grid
      endDate: form.endDate,
      time: `${form.startTime} - ${form.endTime}`,
      color: editingEvent ? editingEvent.color : 'purple',
      // Simplified positioning logic for demo
      top: `${(parseInt(form.startTime.split(':')[0]) - 6) * 10}%`,
      left: editingEvent ? editingEvent.left : 'calc(14.28% * 5 + 60px)', 
      height: '20%'
    };

    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? newEvent : ev));
    } else {
      setEvents([...events, newEvent]);
    }
    
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleAcceptRequest = (req) => {
    const newEvent = {
      id: Date.now(),
      student: req.name,
      title: req.title,
      date: req.date,
      time: `${req.time} - ${req.endTime}`,
      color: 'green',
      top: `${(parseInt(req.time.split(':')[0]) - 6) * 10}%`,
      left: 'calc(14.28% * 6 + 60px)', // Placeholder positioning
      height: '20%'
    };
    
    setEvents([...events, newEvent]);
    setScheduleRequests(scheduleRequests.filter(r => r.id !== req.id));
  };

  const handleRejectRequest = (req) => {
    setRequestToReject(req);
    setIsRejectModalOpen(true);
  };

  const confirmReject = () => {
    setScheduleRequests(scheduleRequests.filter(r => r.id !== requestToReject.id));
    setIsRejectModalOpen(false);
    setRequestToReject(null);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-layout">
        
        {/* LEFT SIDEBAR */}
        <div className="cal-sidebar">
          <button className="btn-create-event" onClick={openCreateModal}>
            <img src={iconCreateEvent} alt="create" className="btn-create-icon" />
            Tạo lịch mới
          </button>
          
          <div className="mini-cal-section">
            <h3 className="sidebar-title">Lịch của tôi</h3>
            <div className="mini-cal-header">
              <span>Tháng 5, 2026</span>
              <div className="mini-cal-nav">
                <span>&lt;</span> <span>&gt;</span>
              </div>
            </div>
            <div className="mini-cal-grid">
              <div className="mini-cal-day-label">CN</div><div className="mini-cal-day-label">T2</div>
              <div className="mini-cal-day-label">T3</div><div className="mini-cal-day-label">T4</div>
              <div className="mini-cal-day-label">T5</div><div className="mini-cal-day-label">T6</div>
              <div className="mini-cal-day-label">T7</div>
              
              <div className="mini-cal-day muted">26</div><div className="mini-cal-day muted">27</div>
              <div className="mini-cal-day muted">28</div><div className="mini-cal-day muted">29</div>
              <div className="mini-cal-day muted">30</div><div className="mini-cal-day">1</div>
              <div className="mini-cal-day">2</div>
              
              <div className="mini-cal-day active">3</div><div className="mini-cal-day">4</div>
              <div className="mini-cal-day">5</div><div className="mini-cal-day">6</div>
              <div className="mini-cal-day">7</div><div className="mini-cal-day">8</div>
              <div className="mini-cal-day">9</div>
              
              {/* Add a few more lines to make it look complete */}
              <div className="mini-cal-day">10</div><div className="mini-cal-day">11</div>
              <div className="mini-cal-day">12</div><div className="mini-cal-day">13</div>
              <div className="mini-cal-day">14</div><div className="mini-cal-day">15</div>
              <div className="mini-cal-day">16</div>
              
              <div className="mini-cal-day">17</div><div className="mini-cal-day">18</div>
              <div className="mini-cal-day">19</div><div className="mini-cal-day">20</div>
              <div className="mini-cal-day">21</div><div className="mini-cal-day">22</div>
              <div className="mini-cal-day">23</div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="sidebar-title">Mentees của tôi</h3>
              <span className="link-view-all">Xem tất cả</span>
            </div>
            <div className="mentee-list">
              {managedMentees.map(mentee => (
                <div key={mentee.id} className="mentee-item">
                  <div className="mentee-avatar">
                    <img src={mentee.avatar} alt="Avatar"/>
                  </div>
                  <div className="mentee-info">
                    <p className="mentee-name">{mentee.name}</p>
                    <p className="mentee-track">{mentee.track}</p>
                  </div>
                  <div className="status-dot green"></div>
                </div>
              ))}
              {managedMentees.length === 0 && (
                <p className="no-data-msg">Chưa có mentee được kết nối</p>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Yêu cầu lịch mới</h3>
            <div className="request-list">
              {scheduleRequests.map(req => (
                <div key={req.id} className="request-item">
                  <img src={req.avatar} alt="Avatar" className="request-avatar-img" />
                  <div className="request-info">
                    <p className="request-name">{req.name}</p>
                    <p className="request-type">{req.title}</p>
                    <p className="request-date">{req.date} | {req.time}</p>
                  </div>
                  <div className="request-actions">
                    <button className="btn-approve" onClick={() => handleAcceptRequest(req)}>✓</button>
                    <button className="btn-decline" onClick={() => handleRejectRequest(req)}>×</button>
                  </div>
                </div>
              ))}
              <button className="btn-view-all-reqs">Xem tất cả yêu cầu</button>
            </div>
          </div>
        </div>

        {/* MAIN CALENDAR AREA */}
        <div className="cal-main">
          <div className="cal-header">
            <div className="cal-header-left">
              <button className="btn-today">Hôm nay</button>
              <div className="cal-nav-buttons">
                <button>&lt;</button>
                <button>&gt;</button>
              </div>
              <h2 className="current-month">Tháng 5, 2026</h2>
            </div>
            <div className="cal-view-toggle">
              <button className="active">Tuần</button>
              <button>Tháng</button>
            </div>
          </div>

          <div className="cal-grid-container">
            <div className="cal-days-header">
              <div className="time-col-header">GMT +7</div>
              <div className="day-col-header">CN<br/><span className="day-num">3</span></div>
              <div className="day-col-header">T2<br/><span className="day-num">4</span></div>
              <div className="day-col-header">T3<br/><span className="day-num">5</span></div>
              <div className="day-col-header">T4<br/><span className="day-num">6</span></div>
              <div className="day-col-header">T5<br/><span className="day-num">7</span></div>
              <div className="day-col-header">T6<br/><span className="day-num">8</span></div>
              <div className="day-col-header">T7<br/><span className="day-num">9</span></div>
            </div>
            
            <div className="cal-grid-body">
              {/* Time rows */}
              {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'].map(time => (
                <div key={time} className="cal-row">
                  <div className="time-label">{time}</div>
                  <div className="cal-cell"></div><div className="cal-cell"></div>
                  <div className="cal-cell"></div><div className="cal-cell"></div>
                  <div className="cal-cell"></div><div className="cal-cell"></div>
                  <div className="cal-cell"></div>
                </div>
              ))}
              
              {events.map(event => (
                <div 
                  key={event.id}
                  className={`cal-event event-${event.color}`} 
                  style={{ top: event.top, left: event.left, height: event.height, cursor: 'pointer' }}
                  onClick={() => handleEventClick(event)}
                >
                  <p className="event-time">{event.time}</p>
                  <p className="event-title">{event.student}</p>
                  <p className="event-desc">{event.title}</p>
                </div>
              ))}

              {/* Current time line mock */}
              <div className="current-time-line" style={{ top: '80%' }}>
                <div className="current-time-dot"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - Event Details */}
        {selectedEvent && (
          <div className="cal-details-panel">
            <div className="details-header">
              <span className="details-label">Chi tiết buổi học</span>
              <div className="details-student-tag">
                <span className="status-dot green"></span>
                <span className="student-name">{selectedEvent.student}</span>
              </div>
            </div>
            
            <h2 className="details-title">{selectedEvent.title}</h2>
            
            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span>{selectedEvent.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🕒</span>
                <span>{selectedEvent.time}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🎥</span>
                <div>
                  <p>Google Meet</p>
                  <a href="meet.google.com/abc-defg-hij" className="meta-link">meet.google.com/abc-defg-hij</a>
                </div>
              </div>
            </div>
            
            <div className="details-section">
              <h3 className="section-title">Nội dung</h3>
              <p className="section-text">Review và góp ý dự án cuối kỳ của Mentee</p>
              
              <p className="section-text-muted">Chuẩn bị trước:</p>
              <ul className="details-list">
                <li>Hoàn thành báo cáo dự án</li>
                <li>Chuẩn bị slide trình bày</li>
              </ul>
            </div>
            
            <div className="details-section">
              <h3 className="section-title">Ghi chú</h3>
              <textarea className="details-notes" placeholder="Thêm ghi chú cho buổi họp này"></textarea>
            </div>
            
            <div className="details-section">
              <h3 className="section-title">Mentee</h3>
              {(() => {
                const mentee = managedMentees.find(m => m.name === selectedEvent.student);
                return mentee ? (
                  <div className="details-mentee-card">
                    <div className="details-mentee-info">
                      <img src={mentee.avatar} alt="Avatar"/>
                      <div>
                        <p className="name">{mentee.name}</p>
                        <p className="track">{mentee.track}</p>
                      </div>
                    </div>
                    <button className="btn-view-profile">Xem hồ sơ</button>
                  </div>
                ) : (
                  <div className="details-mentee-card">
                    <div className="details-mentee-info">
                      <div className="mentee-avatar placeholder"></div>
                      <div>
                        <p className="name">{selectedEvent.student}</p>
                        <p className="track">Mentee chưa được kết nối</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
            
            <div className="details-section">
              <h3 className="section-title">Hành động</h3>
              <div className="details-actions">
                <button className="btn-action primary">✉️ Gửi lịch cho Mentee</button>
                <button className="btn-action warning" onClick={() => openEditModal(selectedEvent)}>⚙️ Chỉnh sửa</button>
                <button className="btn-action danger" onClick={() => {
                  setEvents(events.filter(ev => ev.id !== selectedEvent.id));
                  setSelectedEvent(null);
                }}>✕ Hủy buổi học</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Google Calendar Style Event Modal */}
      {isModalOpen && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <div className="modal-header">
              <h3>{editingEvent ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}</h3>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSaveEvent} className="event-form-premium">
              <div className="form-section title-section">
                <input 
                  type="text" 
                  className="input-title-large"
                  placeholder="Thêm tiêu đề sự kiện..." 
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  required
                  autoFocus
                />
              </div>
              
              <div className="form-section">
                <div className="form-row">
                  <div className="form-icon-col">👤</div>
                  <div className="form-content-col">
                    <label className="input-label">Chọn Mentee tham gia</label>
                    <select 
                      className="select-custom"
                      value={form.menteeId}
                      onChange={e => setForm({...form, menteeId: e.target.value})}
                    >
                      {managedMentees.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-icon-col">🕒</div>
                  <div className="form-content-col">
                    <div className="datetime-grid">
                      <div className="datetime-field">
                        <label className="input-label">Ngày bắt đầu</label>
                        <input 
                          type="date" 
                          className="input-custom"
                          value={form.startDate}
                          onChange={e => setForm({...form, startDate: e.target.value})}
                        />
                      </div>
                      <div className="datetime-field">
                        <label className="input-label">Giờ bắt đầu</label>
                        <input 
                          type="time" 
                          className="input-custom"
                          value={form.startTime}
                          onChange={e => setForm({...form, startTime: e.target.value})}
                        />
                      </div>
                      <div className="datetime-field">
                        <label className="input-label">Ngày kết thúc</label>
                        <input 
                          type="date" 
                          className="input-custom"
                          value={form.endDate}
                          onChange={e => setForm({...form, endDate: e.target.value})}
                        />
                      </div>
                      <div className="datetime-field">
                        <label className="input-label">Giờ kết thúc</label>
                        <input 
                          type="time" 
                          className="input-custom"
                          value={form.endTime}
                          onChange={e => setForm({...form, endTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-icon-col">🎥</div>
                  <div className="form-content-col">
                    <label className="input-label">Link Google Meet / Địa điểm</label>
                    <input 
                      type="text" 
                      className="input-custom"
                      placeholder="Thêm vị trí hoặc link video"
                      value={form.link}
                      onChange={e => setForm({...form, link: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-icon-col">📝</div>
                  <div className="form-content-col">
                    <label className="input-label">Ghi chú & Nội dung</label>
                    <textarea 
                      className="textarea-custom"
                      placeholder="Thêm mô tả cho buổi học..."
                      value={form.notes}
                      onChange={e => setForm({...form, notes: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-actions-premium">
                <button type="button" className="btn-cancel-premium" onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-save-premium">Lưu sự kiện</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Rejection Confirmation Modal */}
      {isRejectModalOpen && (
        <div className="event-modal-overlay">
          <div className="confirm-modal reject-modal-content">
            <div className="confirm-icon-container">
              <img src={iconWarning} alt="warning" className="confirm-warning-img" />
            </div>
            <h3>Xác nhận từ chối</h3>
            <p>Bạn có chắc chắn muốn từ chối yêu cầu lịch học từ <strong>{requestToReject?.name}</strong>?</p>
            <p className="confirm-subtext">Hành động này không thể hoàn tác và Mentee sẽ nhận được thông báo.</p>
            
            <div className="confirm-actions">
              <button className="btn-cancel-premium" onClick={() => setIsRejectModalOpen(false)}>Quay lại</button>
              <button className="btn-confirm-danger" onClick={confirmReject}>Xác nhận từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeCalendar;
