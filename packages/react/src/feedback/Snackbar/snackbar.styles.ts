import { SnackbarVariant } from './snackbar.types';

export const snackbarStyles: Record<SnackbarVariant, string> = {
  success: 'bg-green100 text-white100',
  error: 'bg-red text-white100',
  warning: 'bg-[#FFA500] text-white100',
  info: 'bg-sky text-white100',
  default: 'bg-gray900 text-white100',
};
