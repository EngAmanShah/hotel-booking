'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import { Field, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import SocialsList from '@/shared/SocialsList'
import Textarea from '@/shared/Textarea'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const PageContact = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const t = useTranslations('ContactInfo')
  const info = [
    {
      title: t('title1'),
      description: t('des1'),
    },
    // {
    //   title: '💌 EMAIL',
    //   description: t('example@example.com'),
    // },
    // {
    //   title: '☎ PHONE',
    //   description: t('000-123-456-7890'),
    // },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      alert('Message sent!')

      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (err) {
      console.error(err)
      alert('Error sending message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">{t('Heading')}</h1>
            <div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">{item.title}</h3>
                  <span className="mt-2 block text-neutral-500 dark:text-neutral-400">{item.description}</span>
                </div>
              ))}
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">{t('Socials')}</h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
          </div>

          <form className="grid grid-cols-1 gap-6" onSubmit={submitContact}>
            <Field className="block">
              <Label>{t('Name')}</Label>
              <Input
                name="name"
                placeholder="Example Doe"
                type="text"
                className="mt-1"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>
            <Field className="block">
              <Label>{t('Email')}</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>
            <Field className="block">
              <Label>{t('Message')}</Label>
              <Textarea
                name="message"
                className="mt-1"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Field>
            <div>
              <ButtonPrimary type="submit" disabled={loading}>
                {t('Submit')}
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PageContact
