import { StaffMember, StaffStatus, Announcement } from './types';

export const MOCK_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    role: 'Senior Systems Architect',
    department: 'Engineering',
    email: 'elena.r@nexus.tech',
    status: StaffStatus.ACTIVE,
    lastActive: '2 mins ago',
    performance: 94,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Lead Product Designer',
    department: 'Design',
    email: 'm.chen@nexus.tech',
    status: StaffStatus.AWAY,
    lastActive: '15 mins ago',
    performance: 88,
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'DevOps Engineer',
    department: 'Engineering',
    email: 's.jenkins@nexus.tech',
    status: StaffStatus.ACTIVE,
    lastActive: 'Just now',
    performance: 91,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Data Scientist',
    department: 'Analytics',
    email: 'd.kim@nexus.tech',
    status: StaffStatus.ON_LEAVE,
    lastActive: '2 days ago',
    performance: 85,
  },
  {
    id: '5',
    name: 'Aisha Patel',
    role: 'Frontend Developer',
    department: 'Engineering',
    email: 'a.patel@nexus.tech',
    status: StaffStatus.ACTIVE,
    lastActive: '5 mins ago',
    performance: 97,
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Security Specialist',
    department: 'Security',
    email: 'j.wilson@nexus.tech',
    status: StaffStatus.OFFLINE,
    lastActive: '4 hours ago',
    performance: 82,
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'System Maintenance',
    content: 'Scheduled downtime for the internal API on Saturday at 02:00 UTC.',
    date: '2026-02-20',
    priority: 'high',
  },
  {
    id: '2',
    title: 'New Office Policy',
    content: 'Updated guidelines for remote work equipment reimbursement are now available.',
    date: '2026-02-19',
    priority: 'medium',
  },
];

export const ATTENDANCE_DATA = [
  { name: 'Mon', present: 42, away: 5 },
  { name: 'Tue', present: 45, away: 2 },
  { name: 'Wed', present: 44, away: 3 },
  { name: 'Thu', present: 40, away: 7 },
  { name: 'Fri', present: 38, away: 9 },
];
