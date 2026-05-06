import React from 'react'

import { Helmet } from 'react-helmet'

import './confirm-approval.css'

const ConfirmApproval = (props) => {
  return (
    <div className="confirm-approval-container1">
      <Helmet>
        <title>ConfirmApproval - exported project</title>
        <meta
          property="og:title"
          content="ConfirmApproval - exported project"
        />
        <link
          rel="canonical"
          href="https://untitled-ifirvm.teleporthq.app/confirm-approval"
        />
        <meta
          property="og:url"
          content="https://untitled-ifirvm.teleporthq.app/confirm-approval"
        />
      </Helmet>
      <div className="confirm-approval-thq-confirm-approval-elm">
        <span className="confirm-approval-thq-text-elm1">TỪ CHỐI MENTEE</span>
        <span className="confirm-approval-thq-text-elm2">Lý do từ chối *</span>
        <div className="confirm-approval-thq-button-cookies-elm1">
          <span className="confirm-approval-thq-text-elm3">Cancel</span>
        </div>
        <div className="confirm-approval-thq-button-cookies-elm2">
          <img
            src="/rectangle401149-ccn8-200h.png"
            alt="Rectangle401149"
            className="confirm-approval-thq-rectangle40-elm"
          />
          <span className="confirm-approval-thq-text-elm4">Submit</span>
        </div>
        <img
          src="/rectangle541149-k8eg-200h.png"
          alt="Rectangle541149"
          className="confirm-approval-thq-rectangle54-elm"
        />
        <img
          src="/rectangle551149-4z6r-500h.png"
          alt="Rectangle551149"
          className="confirm-approval-thq-rectangle55-elm"
        />
        <span className="confirm-approval-thq-text-elm5">
          Suggestions for Revision
        </span>
        <img
          src="/button11150-703-200h.png"
          alt="button11150"
          className="confirm-approval-thq-button1-elm"
        />
      </div>
      <a
        href="https://play.teleporthq.io/signup"
        className="confirm-approval-link"
      >
        <div
          aria-label="Sign up to TeleportHQ"
          className="confirm-approval-container2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="confirm-approval-icon1"
          >
            <path
              d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
              fill="#B23ADE"
            ></path>
            <path
              d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
              fill="#FF5C5C"
            ></path>
            <path
              d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
              fill="#2874DE"
            ></path>
          </svg>
          <span className="confirm-approval-text">Built in TeleportHQ</span>
        </div>
      </a>
    </div>
  )
}

export default ConfirmApproval
