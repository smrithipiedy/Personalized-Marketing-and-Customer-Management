import { toast } from 'react-toastify';

// Mock API for development purposes
// In a real app, this would be replaced with actual API calls

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Set a delay to simulate network latency
const MOCK_DELAY = 800;

// Utility function to create a delayed promise
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API calls with mock data
const mockApi = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    await delay(MOCK_DELAY);
    
    // Mock responses based on URL
    if (url === '/preferences') {
      const mockPreferences = [
        { id: '1', name: 'Fitness', selected: false, category: 'lifestyle' },
        { id: '2', name: 'Technology', selected: false, category: 'interest' },
        { id: '3', name: 'Fashion', selected: false, category: 'shopping' },
        { id: '4', name: 'Travel', selected: false, category: 'lifestyle' },
        { id: '5', name: 'Cooking', selected: false, category: 'hobby' },
        { id: '6', name: 'Gaming', selected: false, category: 'interest' },
        { id: '7', name: 'Reading', selected: false, category: 'hobby' },
        { id: '8', name: 'Music', selected: false, category: 'interest' },
        { id: '9', name: 'Movies', selected: false, category: 'interest' },
        { id: '10', name: 'Sports', selected: false, category: 'lifestyle' },
        { id: '11', name: 'Art', selected: false, category: 'hobby' },
        { id: '12', name: 'Photography', selected: false, category: 'hobby' },
      ];
      return {
        data: mockPreferences as unknown as T,
        status: 200,
        statusText: 'OK'
      };
    }
    
    // Default response for unhandled URLs
    throw new Error(`No mock implementation for GET ${url}`);
  },
  
  post: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    await delay(MOCK_DELAY);
    
    // Mock responses based on URL
    if (url === '/preferences') {
      // Just return success for preferences update
      return {
        data: { success: true } as unknown as T,
        status: 200,
        statusText: 'OK'
      };
    }
    
    if (url === '/login') {
      // Mock login response
      return {
        data: {
          id: '123',
          name: 'Test User',
          email: data.email
        } as unknown as T,
        status: 200,
        statusText: 'OK'
      };
    }
    
    if (url === '/signup') {
      // Mock signup response
      return {
        data: {
          id: '123',
          name: data.name,
          email: data.email
        } as unknown as T,
        status: 201,
        statusText: 'Created'
      };
    }
    
    // Default response for unhandled URLs
    throw new Error(`No mock implementation for POST ${url}`);
  }
};

// Create an API wrapper with error handling
export const api = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      return await mockApi.get<T>(url);
    } catch (error) {
      console.error(`API GET Error (${url}):`, error);
      toast.error('Error fetching data. Please try again.');
      throw error;
    }
  },
  
  post: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    try {
      return await mockApi.post<T>(url, data);
    } catch (error) {
      console.error(`API POST Error (${url}):`, error);
      toast.error('Error saving data. Please try again.');
      throw error;
    }
  }
};