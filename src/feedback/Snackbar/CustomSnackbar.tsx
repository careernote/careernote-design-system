import { forwardRef, ReactNode, useCallback } from 'react';
import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import { CheckCircleIcon } from '../../icons/CheckCircleIcon';
import { CloseCircleIcon } from '../../icons/CloseCircleIcon';
import { TriangleInfoIcon } from '../../icons/TriangleInfoIcon';
import { InfoIcon } from '../../icons/InfoIcon';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';
import { snackbarStyles } from './snackbar.styles';
import { SnackbarVariant } from './snackbar.types';

interface CustomSnackbarProps extends Omit<CustomContentProps, 'variant'> {
  variant?: SnackbarVariant;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  onRightIconClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const DefaultLeftIcon: Record<SnackbarVariant, React.ReactNode> = {
  success: <CheckCircleIcon size={20} color="#FFFFFF" />,
  error: <CloseCircleIcon size={20} color="#FFFFFF" />,
  warning: <TriangleInfoIcon size={20} color="#FFFFFF" />,
  info: <InfoIcon size={20} color="#FFFFFF" />,
  default: <InfoIcon size={20} color="#FFFFFF" />,
};

const CustomSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  (
    {
      id,
      message,
      variant = 'default',
      showLeftIcon = true,
      showRightIcon = false,
      onRightIconClick,
      leftIcon,
      rightIcon,
    },
    ref
  ) => {
    const { closeSnackbar } = useSnackbar();
    const styleClass = snackbarStyles[variant] || snackbarStyles.default;
    const defaultLeftIcon = DefaultLeftIcon[variant];
    const displayLeftIcon = leftIcon ?? defaultLeftIcon;

    const handleClose = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    const handleRightIconClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRightIconClick?.();
      },
      [onRightIconClick]
    );

    return (
      <SnackbarContent ref={ref} role="alert">
        <div
          onClick={handleClose}
          className={`flex items-center gap-[12px] px-[20px] py-[14px] rounded-[12px] font-semibold text-body1 shadow-lg min-w-[320px] cursor-pointer hover:opacity-90 transition-opacity ${styleClass}`}
        >
          {showLeftIcon && displayLeftIcon && (
            <span className="flex-shrink-0">{displayLeftIcon}</span>
          )}
          <span className="flex-1 whitespace-pre-line">{message}</span>
          {showRightIcon && (
            <button
              onClick={handleRightIconClick}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
              aria-label="More action"
            >
              {rightIcon ?? <ArrowRightIcon size={20} color="#FFFFFF" />}
            </button>
          )}
        </div>
      </SnackbarContent>
    );
  }
);

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;
