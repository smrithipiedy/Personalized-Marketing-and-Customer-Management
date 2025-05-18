import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../utils/api';

export interface Preference {
  id: string;
  name: string;
  selected: boolean;
  category: string;
}

interface PreferencesContextType {
  preferences: Preference[];
  selectedPreferences: Preference[];
  togglePreference: (id: string) => void;
  savePreferences: () => Promise<void>;
  loading: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const response = await api.get('/preferences');
        setPreferences(response.data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
        // Fallback to mock data
        setPreferences([
          { id: '1', name: 'Fitness', selected: false, category: 'lifestyle' },
          { id: '2', name: 'Technology', selected: false, category: 'interest' },
          { id: '3', name: 'Fashion', selected: false, category: 'shopping' },
          { id: '4', name: 'Travel', selected: false, category: 'lifestyle' },
          { id: '5', name: 'Cooking', selected: false, category: 'hobby' },
          { id: '6', name: 'Gaming', selected: false, category: 'entertainment' },
          { id: '7', name: 'Reading', selected: false, category: 'hobby' },
          { id: '8', name: 'Music', selected: false, category: 'entertainment' },
          { id: '9', name: 'Movies', selected: false, category: 'entertainment' },
          { id: '10', name: 'Sports', selected: false, category: 'lifestyle' },
          { id: '11', name: 'Art', selected: false, category: 'hobby' },
          { id: '12', name: 'Photography', selected: false, category: 'hobby' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const togglePreference = (id: string) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };

  const savePreferences = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      await api.post('/preferences', { preferences: selectedPreferences });
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving preferences:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedPreferences = preferences.filter((pref) => pref.selected);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        selectedPreferences,
        togglePreference,
        savePreferences,
        loading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};