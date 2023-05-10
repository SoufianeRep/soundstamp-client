import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}
