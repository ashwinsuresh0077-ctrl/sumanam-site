import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Check, AlertCircle } from 'lucide-react'
import { TextReveal, Stagger, StaggerItem } from '../lib/motion'

const EMAIL = 'info@sumanam.co.in'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', half: true },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', half: true },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full bg-ink/[0.04] rounded-lg border px-5 py-4 text-ink placeholder-ink/40 focus:outline-none transition-colors'

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }))
    setErrors((x) => (x[name] ? { ...x, [name]: undefined } : x))
    setSent(false)
  }

  const validate = () => {
    const e = {}
    if (!values.name.trim()) e.name = 'Please enter your name.'
    if (!values.email.trim()) e.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(values.email.trim())) e.email = 'That does not look like a valid email address.'
    if (!values.message.trim()) e.message = 'Please tell us a little about your project.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) {
      // Focus the first field with a problem so keyboard users aren't stranded.
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }

    // No backend on this site, so hand the enquiry to the visitor's mail client
    // pre-filled. A lead is never silently swallowed by a dead form.
    const subject = values.subject.trim() || `Project enquiry from ${values.name.trim()}`
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow text-sm mb-3">Let&apos;s Build Together</p>
          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-semibold text-ink mb-6"
            text="Got an Idea? We'd Love to Chat."
          />
          <p className="text-ink/65 leading-relaxed max-w-md mb-10">
            Ensuring sustainable growth of our company and positively contributing
            to the success of our clients&apos; organizations.
          </p>

          <Stagger className="space-y-5" stagger={0.1}>
            {[
              { Icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
              { Icon: Phone, text: '+91 98461 50055', href: 'tel:+919846150055' },
              { Icon: MapPin, text: 'Aditya Apartment, SH, Kowdiar, Thiruvananthapuram, Kerala 695003' },
            ].map(({ Icon, text, href }) => (
              <StaggerItem key={text} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-ink/[0.05] border border-ink/10 flex items-center justify-center shrink-0">
                  <Icon className="text-ink/70" size={18} strokeWidth={1.5} />
                </div>
                {href ? (
                  <a href={href} className="text-ink/75 hover:text-ink transition-colors py-2">
                    {text}
                  </a>
                ) : (
                  <span className="text-ink/75">{text}</span>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FIELDS.filter((f) => f.half).map((f) => (
              <Field key={f.name} field={f} value={values[f.name]} error={errors[f.name]} onChange={set(f.name)} />
            ))}
          </div>

          {FIELDS.filter((f) => !f.half).map((f) => (
            <Field key={f.name} field={f} value={values[f.name]} error={errors[f.name]} onChange={set(f.name)} optional />
          ))}

          <div>
            <label htmlFor="contact-message" className="block text-sm text-ink/70 mb-2">
              Tell us about your project <span className="text-ink/50">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={set('message')}
              aria-required="true"
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`${inputClass} resize-none ${errors.message ? 'border-red-500' : 'border-ink/15 focus:border-ink/50'}`}
            />
            {errors.message && <FieldError id="contact-message-error">{errors.message}</FieldError>}
          </div>

          <button
            type="submit"
            className="btn-primary text-sm uppercase tracking-widest w-full sm:w-auto justify-center"
          >
            Send Message
          </button>

          {sent && (
            <p role="status" className="flex items-start gap-2 text-sm text-ink/75">
              <Check size={16} className="text-ink/70 mt-0.5 shrink-0" />
              Your email app should have opened with the message ready to send. If nothing
              happened, email us directly at{' '}
              <a href={`mailto:${EMAIL}`} className="text-ink font-medium underline">
                {EMAIL}
              </a>
              .
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

function Field({ field, value, error, onChange, optional }) {
  const id = `contact-${field.name}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ink/70 mb-2">
        {field.label} {!optional && <span className="text-ink/50">*</span>}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        autoComplete={field.autoComplete}
        aria-required={optional ? undefined : 'true'}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${error ? 'border-red-500' : 'border-ink/15 focus:border-ink/50'}`}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
      <AlertCircle size={14} className="shrink-0" />
      {children}
    </p>
  )
}
