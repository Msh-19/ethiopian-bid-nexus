
export type Role = 'BIDDER' | 'OFFICER' | 'ADMIN';

export interface User { 
  id: string;
  email: string; 
  password: string; 
  role: Role; 
  name: string;
  organization?: string;
}

const users: User[] = [
  { id: "bidder-001", email: 'bidder@example.com', password: 'password123', role: 'BIDDER', name: 'John Bidder', organization: 'ABC Construction' },
  { id: "officer-001", email: 'officer@example.com', password: 'password123', role: 'OFFICER', name: 'Jane Officer', organization: 'Ministry of Construction' },
  { id: "admin-001", email: 'admin@example.com', password: 'password123', role: 'ADMIN', name: 'Alex Admin', organization: 'System Administration' },
];

export function login(email: string, password: string): User | null {
  return users.find(u => u.email === email && u.password === password) ?? null;
}

// Store the current user in localStorage to persist across page refreshes
export function saveUserToStorage(user: User): void {
  // Don't save the password to localStorage
  const { password, ...userWithoutPassword } = user;
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
}

export function getUserFromStorage(): Omit<User, 'password'> | null {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return null;
  return JSON.parse(userJson);
}

export function logout(): void {
  localStorage.removeItem('currentUser');
}

export function isAuthenticated(): boolean {
  return getUserFromStorage() !== null;
}
