import { useId } from 'react'

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'url' | 'tel' | 'number'
  multiline?: boolean
  rows?: number
  required?: boolean
  className?: string
  id?: string
}

export default function ExamInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline,
  rows = 4,
  required,
  className,
  id,
}: Props) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const ariaLabel = label ?? placeholder
  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      {label && (
        <label htmlFor={fieldId} className="exam-input-label">
          {label}
          {required && <span style={{ color: '#B91C1C', marginLeft: 4 }}>*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          aria-label={!label ? ariaLabel : undefined}
          className="exam-input resize-none"
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-label={!label ? ariaLabel : undefined}
          className="exam-input"
        />
      )}
    </div>
  )
}
