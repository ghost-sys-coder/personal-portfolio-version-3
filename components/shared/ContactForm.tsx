'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'franktamalejr@gmail.com',
    href: 'mailto:franktamalejr@gmail.com',
    color: 'amber-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kampala, Uganda — Remote Globally',
    href: null,
    color: 'emerald-400',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Open to new projects',
    href: null,
    color: 'cyan-400',
  },
]

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ghost-sys-coder',
    handle: '@ghost-sys-coder',
    color: 'zinc-100',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tamalefrank',
    handle: 'Tamale Frank',
    color: 'blue-600',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: 'https://twitter.com/tamalefrank',
    handle: '@tamalefrank',
    color: 'sky-500',
  },
]

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'E-commerce',
  'Dashboard / Admin',
  'AI Integration',
  'Other',
]

const BUDGETS = [
  '< $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  "Let's discuss",
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-3 mb-5'>
      <div className='w-6 h-px bg-amber-500/70' />
      <span className='font-mono text-amber-500 text-xs tracking-[0.25em] uppercase font-medium'>
        {children}
      </span>
    </div>
  )
}

function InputField({
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

const inputBase =
  "w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"

const INITIAL_FORM = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const update = (field: keyof typeof INITIAL_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const toggleSelect = (field: 'projectType' | 'budget', value: string) =>
    setForm(prev => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }))

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Tell me about your project.'
    else if (form.message.trim().length < 20)
      errs.message = 'Please provide at least 20 characters.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setStatus('loading')

    // TODO: Replace with real submission (EmailJS, Resend, your API route, etc.)
    await new Promise(res => setTimeout(res, 1800))
    setStatus('success')
    setForm(INITIAL_FORM)
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id='contact' className='relative bg-zinc-950 py-28 md:py-32 overflow-hidden'>
      {/* Background glow */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-150 md:w-225 h-100 md:h-150 bg-linear-to-b from-amber-500/5 to-transparent rounded-full pointer-events-none' />

      {/* Subtle diagonal texture */}
      <div className='absolute inset-0 opacity-[0.015] pointer-events-none bg-[repeating-linear-gradient(-45deg,#C9A84C_0px,#C9A84C_1px,transparent_1px,transparent_72px)]' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-12'>
        {/* Header */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className='text-center mb-16'
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-zinc-100'>
            Let&apos;s build something
            <span className='block font-semibold bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent'>
              great together.
            </span>
          </h2>
          <p className='text-zinc-500 mt-5 text-base max-w-xl mx-auto leading-relaxed'>
            Have a project in mind? I&apos;d love to hear about it. Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-[380px_1fr] gap-8 xl:gap-12'>
          {/* Left – Info & Socials */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='flex flex-col gap-6'
          >
            {/* Contact Info Card */}
            <motion.div variants={fadeInUp} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden'>
              <div className='h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent' />
              <div className='p-6 space-y-6'>
                <h3 className='text-zinc-100 font-medium text-base'>Get in touch</h3>
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                  <div key={label} className='flex items-start gap-4'>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-${color}/20 bg-${color}/5`}>
                      <Icon size={16} className={`text-${color}`} />
                    </div>
                    <div>
                      <p className='text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-0.5'>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className='text-zinc-100 text-sm hover:text-amber-400 transition-colors'>
                          {value}
                        </a>
                      ) : (
                        <p className='text-zinc-100 text-sm'>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6'>
              <h3 className='text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-4'>
                Find me online
              </h3>
              <div className='space-y-3'>
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, handle, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    variants={fadeInUp}
                    className='group flex items-center gap-4 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/50 hover:bg-zinc-900/80 transition-all'
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-${color}/20 bg-${color}/5`}>
                      <Icon size={14} className={`text-${color}`} />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-zinc-100 text-xs font-medium'>{label}</p>
                      <p className='text-zinc-500 text-[11px] font-mono truncate'>{handle}</p>
                    </div>
                    <div className='ml-auto w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors' />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              variants={fadeInUp}
              className='rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 flex items-center gap-4'
            >
              <div className='relative shrink-0'>
                <span className='flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70' />
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-400' />
                </span>
              </div>
              <div>
                <p className='text-emerald-400 text-sm font-semibold'>Currently Available</p>
                <p className='text-zinc-500 text-xs mt-0.5'>
                  Taking on new projects — typical response within 24h
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <div className='relative rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden'>
              <div className='h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent' />

              {status === 'success' && (
                <div className='absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950 rounded-2xl'>
                  <div className='w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-5'>
                    <CheckCircle2 size={32} className='text-emerald-400' />
                  </div>
                  <h3 className='text-2xl text-zinc-100 font-medium mb-2'>Message Sent!</h3>
                  <p className='text-zinc-500 text-sm text-center max-w-xs'>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className='p-6 md:p-8 space-y-6' noValidate>
                <div className='grid sm:grid-cols-2 gap-5'>
                  <InputField label='Full Name *' id='name' error={errors.name}>
                    <input
                      id='name'
                      type='text'
                      placeholder='John Doe'
                      value={form.name}
                      onChange={update('name')}
                      className={`${inputBase} ${errors.name ? 'border-red-500/50 focus:border-red-500/60' : ''}`}
                    />
                  </InputField>

                  <InputField label='Email Address *' id='email' error={errors.email}>
                    <input
                      id='email'
                      type='email'
                      placeholder='john@example.com'
                      value={form.email}
                      onChange={update('email')}
                      className={`${inputBase} ${errors.email ? 'border-red-500/50 focus:border-red-500/60' : ''}`}
                    />
                  </InputField>
                </div>

                <InputField label='Project Type' id='projectType'>
                  <div className='flex flex-wrap gap-2'>
                    {PROJECT_TYPES.map(type => (
                      <button
                        key={type}
                        type='button'
                        onClick={() => toggleSelect('projectType', type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          form.projectType === type
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-400'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </InputField>

                <InputField label='Budget Range' id='budget'>
                  <div className='flex flex-wrap gap-2'>
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        type='button'
                        onClick={() => toggleSelect('budget', b)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          form.budget === b
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-400'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </InputField>

                <InputField label='Your Message *' id='message' error={errors.message}>
                  <textarea
                    id='message'
                    rows={5}
                    placeholder='Tell me about your project, goals, timeline...'
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputBase} resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500/60' : ''}`}
                  />
                  <div className='flex justify-end mt-1'>
                    <span
                      className={`text-[10px] font-mono ${
                        form.message.length > 500 ? 'text-red-400' : 'text-zinc-600'
                      }`}
                    >
                      {form.message.length} / 500
                    </span>
                  </div>
                </InputField>

                <button
                  type='submit'
                  disabled={status === 'loading'}
                  className='group w-full flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0'
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className='animate-spin' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send
                        size={16}
                        className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
                      />
                      Send Message
                    </>
                  )}
                </button>

                <p className='text-center text-zinc-600 text-xs font-mono'>
                  I typically respond within 24 hours · No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}