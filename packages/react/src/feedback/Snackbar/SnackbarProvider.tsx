'use client';

import { ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import CustomSnackbar from './CustomSnackbar';

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  return (
    <NotistackProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      // 모달(z-[10000001~2])보다 항상 위에 표시
      classes={{ containerRoot: '!z-[10000010]' }}
      Components={{
        default: CustomSnackbar,
        success: CustomSnackbar,
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
      }}
    >
      {children}
    </NotistackProvider>
  );
}
