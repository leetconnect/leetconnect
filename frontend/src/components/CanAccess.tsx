import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { Role, Permission } from '../types';
import { Spin } from '../components/ui/Spin'

interface CanAccessProps {
  children: ReactNode;
  fallback?: ReactNode;
  role?: Role;
  roles?: Role[];
  permission?: Permission;
  minRole?: Role;
}

export const CanAccess = ({ children, fallback = null, role, roles, permission, minRole }: CanAccessProps) => {
  const { hasRole, hasPermission, canAccess } = useAuth();

  let allowed = true;

  if (role) allowed = allowed && hasRole(role);
  if (roles) allowed = allowed && hasRole(roles);
  if (permission) allowed = allowed && hasPermission(permission);
  if (minRole) allowed = allowed && canAccess(minRole);

  return allowed ? <>{children}</> : <>{fallback}</>;
}


interface ProtectedRouteProps {
  children: ReactNode;
  role?: Role;
  roles?: Role[];
  permission?: Permission;
  minRole?: Role;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, role, roles, permission, minRole, redirectTo = '/403'}: ProtectedRouteProps) => {
  const { user, isLoading, hasRole, hasPermission, canAccess, token } = useAuth();
  const location = useLocation();

  if (isLoading) {
    <Spin />
	}

  if (!user || !token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  let allowed = true;
  if (role) allowed = allowed && hasRole(role);
  if (roles) allowed = allowed && hasRole(roles);
  if (permission) allowed = allowed && hasPermission(permission);
  if (minRole)allowed = allowed && canAccess(minRole);

  if (!allowed)
    return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
}