export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-3 mb-5'>
      <div className='w-6 h-px bg-amber-500/70' />
      <span className='font-mono text-amber-500 text-xs tracking-[0.25em] uppercase font-medium'>
        {children}
      </span>
    </div>
  )
}