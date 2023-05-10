import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import useAuth from '../hooks/useAuth';

export default function PrivateLayout() {
  const { user } = useAuth();

  return user ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}
