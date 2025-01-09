import Image from 'next/image';

function InputComponent({
  className = '',
  placeholder,
  label = '',
  suffixIcon = '',
  type = 'text',
  required = false,
  onChange = () => { }
}) {
  return (
    <div className={`input-container ${className}`}>
      {
        label && <label>{label}</label>
      }
      <input
        className={`${suffixIcon ? 'has-icon' : ''}`}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        type={type}
      />
      {
        suffixIcon && (
          <span className="input-suffix">
            <Image
              src={suffixIcon}
              alt="search"
              width={20}
              height={20}
              priority
            />
          </span>
        )
      }
    </div>

  );
}

export default InputComponent;
