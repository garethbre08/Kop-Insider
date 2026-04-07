'use client'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

type Props = {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const teal = theme === 'away' ? 'rgb(0, 163, 152)' : '#01586B'

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=KopInsider`,
      '_blank'
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      '_blank'
    )
  }

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank'
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '13px', color: '#333', opacity: 0.5, marginRight: '4px' }}>
        Share this article
      </span>

      <button
        onClick={shareTwitter}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E7DFC9', color: teal, border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}
      >
        X / Twitter
      </button>

      <button
        onClick={shareWhatsApp}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E7DFC9', color: teal, border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}
      >
        WhatsApp
      </button>

      <button
        onClick={shareFacebook}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E7DFC9', color: teal, border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}
      >
        Facebook
      </button>

      <button
        onClick={copyLink}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: copied ? teal : '#E7DFC9', color: copied ? '#fff' : teal, border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}
