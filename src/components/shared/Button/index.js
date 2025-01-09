// type: black || primary || ghost
function ButtonComponent({
  type = 'primary',
  children,
  onClick,
  className = ''
}) {
  return (
    <button
      className={`button-container btn-${type} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
