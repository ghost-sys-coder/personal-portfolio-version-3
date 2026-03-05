import { AlertCircle } from "lucide-react"

export function InputField({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='text-zinc-500 text-xs font-mono uppercase tracking-widest'
      >
        {label}
      </label>
      {children}
      {error && (
        <p className='text-red-400 text-xs flex items-center gap-1.5 mt-1'>
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}