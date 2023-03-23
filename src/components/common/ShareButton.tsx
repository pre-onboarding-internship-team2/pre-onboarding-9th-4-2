interface ShareButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  dataTestId?: string | number;
}

const ShareButton = ({
  style,
  className,
  type,
  name,
  children,
  onClick,
  disabled,
  dataTestId,
}: ShareButtonProps) => {
  return (
    <button
      className={className}
      disabled={disabled}
      style={style}
      type={type}
      name={name}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

export default ShareButton;
