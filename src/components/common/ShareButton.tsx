interface ShareButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ShareButton = ({ type, name, children, onClick }: ShareButtonProps) => {
  return (
    <button type={type} name={name} onClick={onClick}>
      {children}
    </button>
  );
};

export default ShareButton;
