'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`${styles.container} page-enter`}>
      <h1 className={styles.pageTitle}>Contact</h1>
      
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoSection}>
            <h2 className={styles.subtitle}>Let's work together</h2>
            <p className={styles.description}>
              Whether you have a project in mind, need commission work, or just want 
              to connect, I'd love to hear from you.
            </p>
          </div>
          
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Email</h3>
            <a href="mailto:hello@ismailaaddioui.com" className={styles.link}>
              hello@ismailaaddioui.com
            </a>
          </div>
          
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Follow</h3>
            <div className={styles.social}>
              <a href="#" className={styles.link}>Instagram</a>
              <a href="#" className={styles.link}>Behance</a>
              <a href="#" className={styles.link}>LinkedIn</a>
            </div>
          </div>
          
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Location</h3>
            <p className={styles.infoText}>
              Casablanca, Morocco
            </p>
          </div>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              rows={6}
              required
            />
          </div>
          
          <button type="submit" className={styles.submit}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
