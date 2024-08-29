interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  buttonName?: string;
  'aria-label'?: string;
}

export const Button = ({
  children,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  buttonName,
  ...props
}: IButtonProps) => {
  const button = type;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={button}
      className={className}
      aria-label={ariaLabel || buttonName || 'button'}
      {...props}
    >
      {children || buttonName}
    </button>
  );
};
