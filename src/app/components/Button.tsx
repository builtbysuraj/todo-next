'use client'

type ButtonProps = {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  active?: boolean
  className?: string
  style?: Record<string, string>
}

export default function Button({
  children,
  onClick,
  className,
  style,
}: ButtonProps) {
  return (
    <button
      style={style}
      onMouseDown={(evt) => {
        evt.preventDefault()
        evt.stopPropagation()
      }}
      onClick={onClick}
      className={'rounded-md py-1 p-2 m-1 bg-orange-700 ' + className}
    >
      {children}
    </button>
  )
}
