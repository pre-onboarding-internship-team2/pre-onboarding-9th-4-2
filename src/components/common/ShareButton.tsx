interface ShareButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ShareButton = ({
  style,
  type,
  name,
  children,
  onClick,
  disabled,
}: ShareButtonProps) => {
  return (
    <button
      disabled={disabled}
      style={style}
      type={type}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ShareButton;
