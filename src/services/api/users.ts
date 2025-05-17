
import { User, UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: "user001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "BIDDER",
    organization: "ABC Construction",
    verified: true,
    createdAt: "2024-03-15T09:30:00Z"
  },
  {
    id: "user002",
    name: "Jane Smith",
    email: "jane.smith@gov.et",
    role: "OFFICER",
    organization: "Ministry of Education",
    verified: true,
    createdAt: "2024-02-20T14:45:00Z"
  },
  {
    id: "user003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "BIDDER",
    organization: "MediTech Supplies",
    verified: false,
    createdAt: "2024-04-05T11:15:00Z"
  },
  {
    id: "user004",
    name: "Sarah Williams",
    email: "sarah.williams@gov.et",
    role: "COMMITTEE",
    organization: "Ministry of Health",
    verified: true,
    createdAt: "2024-03-10T08:20:00Z"
  },
  {
    id: "user005",
    name: "David Chen",
    email: "david.chen@example.com",
    role: "BIDDER",
    organization: "SolarTech Solutions",
    verified: true,
    createdAt: "2024-03-25T10:50:00Z"
  }
];

// Simulate an API call with a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Interface for creating a new user
export interface CreateUserPayload {
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
}

// Interface for updating a user
export interface UpdateUserPayload {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  organization?: string;
  verified?: boolean;
}

// Mock API functions
async function fetchUsers(): Promise<User[]> {
  await delay(800); // simulate network delay
  return [...MOCK_USERS];
}

async function createUser(userData: CreateUserPayload): Promise<User> {
  await delay(1000); // simulate network delay
  
  // Validate email is unique
  if (MOCK_USERS.some(user => user.email === userData.email)) {
    throw new Error("Email already in use");
  }
  
  const newUser: User = {
    id: `user${Math.random().toString(36).substring(2, 9)}`,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    organization: userData.organization || "",
    verified: false,
    createdAt: new Date().toISOString()
  };
  
  MOCK_USERS.push(newUser);
  return newUser;
}

async function updateUser(userData: UpdateUserPayload): Promise<User> {
  await delay(800); // simulate network delay
  
  const userIndex = MOCK_USERS.findIndex(user => user.id === userData.id);
  if (userIndex === -1) {
    throw new Error(`User with ID ${userData.id} not found`);
  }
  
  // If email is being changed, check it's unique
  if (userData.email && userData.email !== MOCK_USERS[userIndex].email) {
    if (MOCK_USERS.some(user => user.email === userData.email)) {
      throw new Error("Email already in use");
    }
  }
  
  // Update the user
  MOCK_USERS[userIndex] = {
    ...MOCK_USERS[userIndex],
    ...userData
  };
  
  return MOCK_USERS[userIndex];
}

async function deleteUser(userId: string): Promise<void> {
  await delay(800); // simulate network delay
  
  const userIndex = MOCK_USERS.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error(`User with ID ${userId} not found`);
  }
  
  // Remove the user
  MOCK_USERS.splice(userIndex, 1);
}

async function verifyUser(userId: string): Promise<User> {
  await delay(800); // simulate network delay
  
  const userIndex = MOCK_USERS.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error(`User with ID ${userId} not found`);
  }
  
  // Verify the user
  MOCK_USERS[userIndex].verified = true;
  
  return MOCK_USERS[userIndex];
}

// React Query hooks
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Created",
        description: `${user.name} has been added successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create user: ${error.message}`,
      });
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Updated",
        description: `${user.name}'s information has been updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update user: ${error.message}`,
      });
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Deleted",
        description: "The user has been removed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete user: ${error.message}`,
      });
    }
  });
}

export function useVerifyUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: verifyUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Verified",
        description: `${user.name}'s account has been verified.`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to verify user: ${error.message}`,
      });
    }
  });
}
