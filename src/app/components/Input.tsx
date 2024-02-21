'use client'

type InputProps = {
  type?: string
  name?: string
  placeholder?: string
  id?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  className?: string
}

function Input({
  type = 'text',
  name,
  placeholder,
  id,
  value,
  onChange,
  className = '',
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      className={'p-2 px-3 outline-none text-black rounded-md m-3 border-transparent' + className}
    />
  )
}

export default Input
