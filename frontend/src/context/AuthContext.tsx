import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { AuthContextType, AuthState, Role, Permission, AdminUser } from '../types';
import { canAccessMinRole, hasPermission as checkPermission } from '../lib/permissions';
import { authApi } from '@/lib/api';

// ─── State & Reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AdminUser; token: string } }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: AdminUser };

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  token: localStorage.getItem('token'),
  isLoading: !!localStorage.getItem('token'),
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
			return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
			return { user: action.payload.user, token: action.payload.token, isLoading: false };
    case 'LOGIN_ERROR':
			return { ...state, isLoading: false };
    case 'LOGOUT':
			return { user: null, token: null, isLoading: false };
    case 'UPDATE_USER':
			return { ...state, user: action.payload };
    default:
			return state;
  }
}

// ─── Context 
export const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider 
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
	
  // On mount: check localStorage for existing session
  useEffect(() => {
		let isMounted = true;
    async function restoreSession() {
			const token = localStorage.getItem('token');
			const userJson = localStorage.getItem('auth_user');

			if(!token) {
				if(isMounted) dispatch({ type: 'LOGOUT'})
				return;
			}

			try {
				const response = await authApi.me() as any;

				const freshUser = response.data;
				console.log('REFRESH USER DATA:', freshUser);

				localStorage.setItem('auth_user', JSON.stringify(freshUser));
				if(isMounted) {
					dispatch({ type: 'LOGIN_SUCCESS', payload: { user: freshUser, token} });
					localStorage.setItem('auth_user', JSON.stringify(freshUser));
				}
			} catch {
				if(userJson) {
					try {
						const cashedUser = JSON.parse(userJson);
						console.log('CASHED USER: ', cashedUser);
						if(isMounted) dispatch({ type: 'LOGIN_SUCCESS', payload: { user: cashedUser, token } })
						return;
					} catch(error) {
						console.error('Session restore failed: ', error);

						localStorage.removeItem('token');
						localStorage.removeItem('auth_user');
						if(isMounted) dispatch({ type: 'LOGOUT'});
					}
				}

				localStorage.removeItem('token');
				localStorage.removeItem('auth_user');
				if(isMounted) dispatch({ type: 'LOGOUT' })
			}
		}

		restoreSession();

		return () => { isMounted = false }
  }, []);

  // ─── Auth actions 
  async function login(email: string, password: string) {
		dispatch({ type: 'LOGIN_START' });
    try {
			const data = await authApi.login({ email, password });
			console.log('--------------------------------');
			console.log('DATA:', JSON.stringify(data, null, 2));
			
			const token = data.accessToken;
			const user = data.user as unknown as AdminUser;
      // const { user, token } = await res.json();

      // Mock: find user by email for now
      // const { MOCK_USERS } = await import('../lib/mockData');
			localStorage.setItem('token', token);
			localStorage.setItem('auth_user', JSON.stringify(user));
      // const user = MOCK_USERS.find(u => u.email === email) ?? MOCK_USERS[0];
      // const token = 'mock-jwt-token';

      // localStorage.setItem('token', token);
      // localStorage.setItem('auth_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch(error: any) {
      console.error('Auth login failed:', error);
  		dispatch({ type: 'LOGIN_ERROR' });
  		throw new Error(error?.response?.data?.message || error?.message || 'Login failed');
    }
  }

  function logout() {
		console.log('--------------LOGOUT------------------')
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  }

  // ─── Permission helpers ─────────────────────────────────────────────────────
  function hasRole(role: Role | Role[]): boolean {
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  }

  function hasPermissionFn(permission: Permission): boolean {
    if (!state.user) return false;
    return checkPermission(state.user.role, permission);
  }

  function canAccess(minRole: Role): boolean {
    if (!state.user) return false;
    return canAccessMinRole(state.user.role, minRole);
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      hasRole,
      hasPermission: hasPermissionFn,
      canAccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

