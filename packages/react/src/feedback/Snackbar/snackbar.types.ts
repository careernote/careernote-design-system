import { ReactNode } from 'react';

export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface SnackbarOptions {
  variant?: SnackbarVariant;
  autoHideDuration?: number;
  persist?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  onRightIconClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
