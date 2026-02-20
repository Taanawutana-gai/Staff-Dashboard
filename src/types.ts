export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  ON_LEAVE = 'ON_LEAVE',
  OFFLINE = 'OFFLINE',
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: StaffStatus;
  lastActive: string;
  performance: number; // 0-100
  avatar?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}
