# Implementation Plan - Mentor Dashboard Module

Build a comprehensive Mentor Dashboard for the "Cựu SV" platform, enabling Alumnus Mentors to manage their activities, engage with the community, and track mentee progress.

## User Review Required

> [!IMPORTANT]
> [!IMPORTANT]
> The following architectural assumptions have been made. Please review and confirm:
> 1. **Tech Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Shadcn UI.
> 2. **Data Layer**: **Mockup Data (JSON/Local State)** for now. Real database integration (Supabase) is deferred to a later stage.
> 3. **Shared Resources**: Forum and Events are assumed to be shared with Admin and Mentee modules but with Mentor-specific views/actions.

## Proposed Changes

### 1. Mock Data Structures [NEW]

#### `profiles` (Existing/Extended)
- `id`: uuid (PK)
- `role`: enum ('admin', 'mentor', 'mentee')
- `full_name`: text
- `avatar_url`: text
- `bio`: text
- `is_mentor_approved`: boolean (default: false)
- `applied_to_be_mentor`: boolean (default: false)

#### `mentors` [NEW]
- `id`: uuid (PK, FK to profiles)
- `capacity`: int (default 3)
- `career_track`: text[]
- `skills`: text[]
- `is_intake_open`: boolean (generated: capacity > active_mentees)

#### `mentees` [NEW]
- `id`: uuid (PK, FK to profiles)
- `education_level`: text
- `cv_url`: text
- `goals`: text

#### `mentorship_matches` [NEW]
- `id`: uuid (PK) - "Match ID"
- `mentor_id`: uuid (FK)
- `mentee_id`: uuid (FK)
- `status`: enum ('pending', 'active', 'completed', 'rejected')
- `applied_at`: timestamp

#### `seasons` [NEW]
- `id`: uuid (PK)
- `name`: text (e.g., 'Spring 2024')
- `start_date`: timestamp
- `end_date`: timestamp
- `is_active`: boolean

#### `mentor_applications` [NEW]
- `id`: uuid (PK)
- `user_id`: uuid (FK to profiles)
- `applied_at`: timestamp
- `target_season_id`: uuid (FK to seasons)
- `status`: enum ('pending', 'approved', 'rejected')

#### `sessions` [NEW]
- `id`: uuid (PK)
- `match_id`: uuid (FK)
- `scheduled_at`: timestamp
- `status`: enum ('scheduled', 'completed', 'rescheduled', 'cancelled')
- `report_content`: jsonb (duration, topics, outcome)

---

### 2. Frontend Structure (Next.js) [NEW]

#### Layout & Navigation
- `src/app/dashboard/mentor/layout.tsx`: Sidebar/TopNav wrapper.
#### Modules (Always Visible to Alumnus)
- `src/app/dashboard/mentor/page.tsx`: Home (Activity Hub).
- `src/app/dashboard/mentor/forum/`: Community interaction.
- `src/app/dashboard/mentor/apply/`: Form for Alumni to register as mentors.

#### Modules (Visible ONLY if `is_mentor_approved` is true)
- `src/app/dashboard/mentor/mentees/search/`: Proactive matching.
- `src/app/dashboard/mentor/mentees/applications/`: Incoming requests.
- `src/app/dashboard/mentor/mentees/active/`: My Mentees management.
- `src/app/dashboard/mentor/schedule/`: Session calendar.
- `src/app/dashboard/mentor/settings/`: Capacity and profile.

---

## Task Breakdown

### Phase 1: Foundation & Auth
- [ ] Initialize Next.js project (if not existing)
- [ ] Set up Supabase Client and Middleware for Mentor-only route protection
- [ ] Configure Shadcn UI components (Card, Button, Dialog, Form)

### Phase 2: Mock Data & Services
- [ ] Create `src/lib/mock-data.ts` with initial data for:
    - Mentors, Mentees, Seasons, and Matches
    - Forum posts and comments
- [ ] Implement local service functions (getMentors, applyToBeMentor, etc.) that manipulate local state

### Phase 3: Module Implementation
- [ ] **Home**: Fetch and display stats and upcoming sessions (Stats hidden for non-mentors).
- [ ] **Become a Mentor**: Implement application form and logic to check "Season" availability.
- [ ] **Forum**: Post creation and nested comments with topic tagging (Available to all).
- [ ] **Conditional UI**: Implement Sidebar logic (Regular Alumnus -> Pending Mentor -> Active Mentor).
- [ ] **Search/Applications/Management**: Build full functionality for approved Mentors only.

---

## Verification Plan

### Automated Tests
- `vitest`: Unit tests for capacity logic (cannot decrease below active count).
- `playwright`: E2E tests for the "Accept Application" flow.

### Manual Verification
- Verify that "Accept" button disables when capacity is reached.
- Check that "Closed for Intake" status displays correctly on the public/search profile.
