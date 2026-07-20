import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'

// New modular components
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import News from './pages/News'
import Forum from './pages/Forum'
import ComingSoon from './pages/ComingSoon'
import MenteeSearch from './pages/Mentor/MenteeSearch'
import MenteeApplications from './pages/Mentor/MenteeApplications'
import MenteeManage from './pages/Mentor/MenteeManage'
import MenteeCalendar from './pages/Mentor/MenteeCalendar'
import MenteeProfile from './pages/Mentor/MenteeProfile'
import MenteeProfileSelf from './pages/Mentor/MenteeProfileSelf'
import MenteeManageSlots from './pages/Mentor/MenteeManageSlots'
import { UserProvider } from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
        {/* Auth pages - own layout (Header included inside) */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* All other pages - wrapped in Layout (Header + Footer) */}
        <Route>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" render={() => <ComingSoon title="Giới Thiệu" />} />
              <Route exact path="/news" component={News} />
              <Route exact path="/forum" component={Forum} />
              <Route exact path="/donate" render={() => <ComingSoon title="Quyên góp" />} />
              <Route exact path="/jobs" render={() => <ComingSoon title="Cơ hội việc làm" />} />
              <Route exact path="/dashboard" render={() => <ComingSoon title="Dashboard" />} />
              <Route exact path="/profile" component={MenteeProfileSelf} />
              <Route exact path="/mentees/search" component={MenteeSearch} />
              <Route exact path="/mentees/applications" component={MenteeApplications} />
              <Route exact path="/mentees/manage" component={MenteeManage} />
              <Route exact path="/mentees/manage-slots" component={MenteeManageSlots} />
              <Route exact path="/mentees/calendar" component={MenteeCalendar} />
              <Route exact path="/mentees/profile/:id" component={MenteeProfile} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
    </UserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
