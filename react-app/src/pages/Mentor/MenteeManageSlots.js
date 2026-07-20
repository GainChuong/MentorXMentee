import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MenteeManageSlots.css';

import iconOpenNew from '../../assets/icon-open-new.png';
import iconClosedNew from '../../assets/icon-closed-new.png';
import iconCheckMet from '../../assets/icon-check-met.png';
import iconCheckUnmet from '../../assets/icon-check-unmet.png';
import iconCalendarRule from '../../assets/icon-calendar-rule.png';
import iconGradRule from '../../assets/icon-grad-rule.png';
import iconQtyRule from '../../assets/icon-qty-rule.png';
import iconSupportNew from '../../assets/icon-support-new.png';

const MenteeManageSlots = () => {
  const history = useHistory();
  const [slotCount, setSlotCount] = useState(5);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mms-container">
      <div className="mms-header-nav">
        <button className="mms-back-btn" onClick={() => history.goBack()}>← Quay lại</button>
        <div className="mms-nav-links">
          <span>Tìm kiếm Mentee</span>
          <span>Đơn đăng ký</span>
          <span className="active">Quản lý Mentee</span>
        </div>
      </div>

      <h1 className="mms-main-title">QUẢN LÝ SỐ LƯỢNG MENTEE NHẬN</h1>

      <div className="mms-grid">
        <div className="mms-left-col">
          {/* Section 1: Current Info */}
          <div className="mms-row">
            <div className="mms-card mms-info-card">
              <h3 className="mms-card-title">Số lượng Mentee hiện tại</h3>
              <div className="mms-info-content">
                <span className="mms-big-num">3<small>/5</small></span>
                <span className="mms-user-icon">👥</span>
              </div>
              <p className="mms-card-desc">Bạn đang nhận 3 trên tổng số 5 Mentee.</p>
            </div>

            <div className="mms-card mms-status-toggle-card">
              <h3 className="mms-card-title">Trạng thái nhận Mentee</h3>
              <div className="mms-toggle-row">
                <div className={`mms-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                  <div className="mms-toggle-handle"></div>
                </div>
                <div className="mms-status-text">
                  <p className="mms-status-label">Đang nhận Mentee mới</p>
                  <span className={`mms-status-badge ${isOpen ? 'open' : 'closed'}`}>
                    {isOpen ? 'Đang mở' : 'Đang đóng'}
                  </span>
                </div>
              </div>
              <p className="mms-card-desc">Bạn vẫn có thể nhận thêm 2 Mentees nữa</p>
            </div>
          </div>

          {/* Section 2: Change Slots */}
          <div className="mms-card mms-change-slots-card">
            <h3 className="mms-card-title">Thay đổi số lượng Mentee mong muốn</h3>
            <p className="mms-card-desc mb-20">Điều chỉnh tổng số Mentee tối đa mà bạn muốn nhận</p>
            
            <div className="mms-slot-control-row">
              <div className="mms-slot-item">
                <span className="mms-slot-label">Số lượng hiện tại</span>
                <span className="mms-slot-val old">5</span>
              </div>
              <div className="mms-slot-stepper">
                <button className="mms-step-btn minus" onClick={() => setSlotCount(Math.max(1, slotCount - 1))}>-</button>
                <div className="mms-step-input">{slotCount}</div>
                <button className="mms-step-btn plus" onClick={() => setSlotCount(slotCount + 1)}>+</button>
              </div>
              <div className="mms-slot-item">
                <span className="mms-slot-label">Số lượng mới</span>
                <span className="mms-slot-val new">{slotCount}</span>
              </div>
            </div>

            <div className="mms-alert-green">
              <span className="mms-alert-icon">✓</span>
              <div className="mms-alert-text">
                <strong>Bạn có thể tăng số lượng bất cứ lúc nào</strong>
                <p>Số lượng mới sẽ có hiệu lực ngay sau khi lưu</p>
              </div>
            </div>
          </div>

          {/* Section 3: Rules */}
          <div className="mms-card mms-rules-card">
            <h3 className="mms-card-title">Quy tắc giảm số lượng Mentee</h3>
            <p className="mms-card-desc mb-20">Bạn chỉ có thể giảm số lượng Mentee mong muốn khi đáp ứng tất cả các yêu cầu sau:</p>
            
            <div className="mms-rules-list">
              <div className="mms-rule-item">
                <img src={iconCalendarRule} alt="rule" className="mms-rule-icon-main" />
                <div className="mms-rule-content">
                  <h4>Nguyên tắc tháng</h4>
                  <p>Giảm số lượng Mentee chỉ có hiệu lực vào tháng tiếp theo</p>
                </div>
                <div className="mms-rule-status met">
                  <img src={iconCheckMet} alt="met" />
                  <div>
                    <strong>Đã mở khóa</strong>
                    <span>Có thể giảm từ 01/06/2026</span>
                  </div>
                </div>
              </div>

              <div className="mms-rule-item">
                <img src={iconGradRule} alt="rule" className="mms-rule-icon-main" />
                <div className="mms-rule-content">
                  <h4>Hoàn thành hướng dẫn</h4>
                  <p>Cần hoàn thành hướng dẫn các Mentees hiện tại</p>
                </div>
                <div className="mms-rule-status unmet">
                  <img src={iconCheckUnmet} alt="unmet" />
                  <div>
                    <strong>Chưa đáp ứng</strong>
                    <span>Còn 1 mentee chưa hoàn thành</span>
                  </div>
                </div>
              </div>

              <div className="mms-rule-item">
                <img src={iconQtyRule} alt="rule" className="mms-rule-icon-main" />
                <div className="mms-rule-content">
                  <h4>Nguyên tắc về số lượng</h4>
                  <p>Số lượng Mentees mới phải {'>'}= số lượng Mentees hiện tại</p>
                </div>
                <div className="mms-rule-status met">
                  <img src={iconCheckMet} alt="met" />
                  <div>
                    <strong>Đã đáp ứng</strong>
                    <span>6 {'>'} 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mms-footer-actions">
            <button className="mms-save-btn">Lưu thay đổi</button>
            <div className="mms-footer-hint">
              <span className="mms-hint-icon">🔒</span>
              Bạn chỉ có thể giảm số lượng khi đáp ứng tất cả các quy tắc trên
            </div>
          </div>
        </div>

        <div className="mms-right-col">
          <div className="mms-card mms-side-card">
            <h3 className="mms-card-title sm">Trạng thái nhận Mentee</h3>
            <div className="mms-status-legend">
              <div className="mms-legend-item open">
                <div className="mms-legend-icon-wrap">
                  <img src={iconOpenNew} alt="open" />
                </div>
                <div className="mms-legend-text">
                  <strong>Đang mở</strong>
                  <span>Bạn có thể nhận Mentee mới</span>
                </div>
              </div>
              <div className="mms-legend-item closed">
                <div className="mms-legend-icon-wrap">
                  <img src={iconClosedNew} alt="closed" />
                </div>
                <div className="mms-legend-text">
                  <strong>Đang đóng</strong>
                  <span>Bạn đã đủ số lượng mong muốn. Không thể nhận thêm Mentee</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mms-card mms-side-card">
            <h3 className="mms-card-title sm">Lưu ý quan trọng</h3>
            <ul className="mms-notes-list">
              <li>Tăng số lượng: Áp dụng ngay lập tức</li>
              <li>Giảm số lượng: chỉ có hiệu lực vào tháng tiếp theo và phải đáp ứng tất cả các quy tắc</li>
              <li>Khi đã đạt đủ số lượng mong muốn, trạng thái nhận mentee sẽ tự động đóng cho tới tháng sau</li>
              <li>Mentee đang trong quá trình hướng dẫn sẽ không bị ảnh hưởng bởi thay đổi này</li>
            </ul>
          </div>

          <div className="mms-card mms-support-card">
            <div className="mms-support-header">
              <img src={iconSupportNew} alt="support" className="mms-support-img" />
              <div className="mms-support-title-wrap">
                <h4>Cần hỗ trợ?</h4>
                <p>Nếu bạn có thắc mắc về việc quản lý mentee, hãy liên hệ với đội ngũ hỗ trợ</p>
              </div>
            </div>
            <button className="mms-contact-btn">Liên hệ hỗ trợ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeManageSlots;
