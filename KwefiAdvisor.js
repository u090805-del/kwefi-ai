'use client'

import { useState, useRef, useEffect } from 'react'

const CATEGORIES = [
  { id: 'strategy', icon: '🎯', ar: 'استراتيجية التسويق', en: 'Marketing Strategy' },
  { id: 'social', icon: '📱', ar: 'التسويق الرقمي', en: 'Digital Marketing' },
  { id: 'sales', icon: '💰', ar: 'مشاكل المبيعات', en: 'Sales Problems' },
  { id: 'branding', icon: '✨', ar: 'الهوية والتصميم', en: 'Branding & Design' },
  { id: 'ads', icon: '📣', ar: 'الإعلانات المدفوعة', en: 'Paid Ads' },
  { id: 'content', icon: '✍️', ar: 'المحتوى والكتابة', en: 'Content Writing' },
]

const QUICK_QUESTIONS = [
  'كيف أزيد مبيعاتي عبر الإنترنت؟',
  'ما أفضل منصات التسويق لمشروعي؟',
  'كيف أبني هوية تجارية قوية؟',
  'كيف أكتب إعلانات مؤثرة؟',
  'ما ميزانية الإعلانات المناسبة؟',
  'كيف أحلل منافسيّ؟',
]

export default function KwefiAdvisor() {
  const [lang, setLang] = useState('ar')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [screen, setScreen] = useState('home')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  const isRTL = lang === 'ar'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    setLoading(true)
    setScreen('chat')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          categoryContext: selectedCategory?.en || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: isRTL ? '⚠️ حدث خطأ في الاتصال. حاول مرة أخرى.' : '⚠️ Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const resetChat = () => {
    setMessages([])
    setSelectedCategory(null)
    setScreen('home')
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        fontFamily: isRTL ? "'Noto Naskh Arabic', 'Cairo', serif" : "'DM Sans', sans-serif",
        minHeight: '100svh',
        background: '#0a0a0f',
        color: '#f0ede8',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 480,
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        .card-hover { transition: all 0.25s cubic-bezier(.4,0,.2,1); cursor: pointer; }
        .card-hover:hover { transform: translateY(-2px); border-color: rgba(255,180,0,0.4) !important; background: rgba(255,180,0,0.06) !important; }
        .card-hover:active { transform: scale(0.97); }
        .btn-primary { background: linear-gradient(135deg, #ffb400, #ff6b00); border: none; border-radius: 14px; color: #0a0a0f; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-primary:hover { opacity: 0.9; transform: scale(1.02); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .msg-user { background: linear-gradient(135deg, #ffb400, #ff6b00); color: #0a0a0f; border-radius: 20px 20px 4px 20px; padding: 12px 16px; max-width: 78%; font-weight: 500; font-size: 15px; line-height: 1.6; align-self: flex-start; word-break: break-word; }
        [dir="ltr"] .msg-user { border-radius: 20px 20px 20px 4px; align-self: flex-end; }
        .msg-ai { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px 20px 20px 4px; padding: 14px 16px; max-width: 88%; font-size: 14.5px; line-height: 1.8; align-self: flex-end; word-break: break-word; white-space: pre-wrap; }
        [dir="ltr"] .msg-ai { border-radius: 20px 20px 4px 20px; align-self: flex-start; }
        .typing-dot { width: 7px; height: 7px; background: #ffb400; border-radius: 50%; display: inline-block; animation: bounce 1.2s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }
        .input-field { background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 16px; color: #f0ede8; font-family: inherit; font-size: 15px; resize: none; outline: none; transition: border-color 0.2s; line-height: 1.6; }
        .input-field:focus { border-color: rgba(255,180,0,0.5); }
        .input-field::placeholder { color: rgba(240,237,232,0.35); }
        .tag-pill { background: rgba(255,180,0,0.1); border: 1px solid rgba(255,180,0,0.25); border-radius: 20px; padding: 5px 12px; font-size: 13px; color: #ffb400; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .tag-pill:hover { background: rgba(255,180,0,0.2); }
        .cat-selected { border-color: rgba(255,180,0,0.6) !important; background: rgba(255,180,0,0.1) !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(255,140,0,0.12)', top: -100, right: -80 }} />
      <div className="glow-orb" style={{ width: 200, height: 200, background: 'rgba(100,60,255,0.08)', bottom: 200, left: -60 }} />

      {/* Header */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {screen === 'chat' && (
            <button onClick={resetChat} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#f0ede8', padding: '6px 10px', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
              ←
            </button>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg, #ffb400, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Kwefi AI
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.4)', marginTop: 1 }}>
              {isRTL ? 'مستشارك التسويقي الذكي' : 'Your Smart Marketing Advisor'}
            </div>
          </div>
        </div>
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#f0ede8', padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>

      {/* HOME */}
      {screen === 'home' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 140px' }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 32, paddingTop: 8 }}>
            <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #ffb400, #ff6b00)', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, margin: '0 auto 16px', boxShadow: '0 8px 40px rgba(255,140,0,0.3)' }}>🚀</div>
            <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.4, marginBottom: 10 }}>
              {isRTL ? 'كيف يمكنني مساعدتك في تنمية مشروعك؟' : 'How can I help grow your business?'}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.5)', lineHeight: 1.7 }}>
              {isRTL ? 'اسألني أي سؤال في التسويق، المبيعات، أو الهوية التجارية' : 'Ask me anything about marketing, sales, or branding'}
            </p>
          </div>

          <div className="fade-up" style={{ marginBottom: 24, animationDelay: '0.1s' }}>
            <p style={{ fontSize: 12, color: 'rgba(240,237,232,0.4)', marginBottom: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              {isRTL ? 'اختر المجال' : 'Choose Area'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className={`card-hover ${selectedCategory?.id === cat.id ? 'cat-selected' : ''}`} onClick={() => setSelectedCategory(selectedCategory?.id === cat.id ? null : cat)} style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{isRTL ? cat.ar : cat.en}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up" style={{ marginBottom: 24, animationDelay: '0.2s' }}>
            <p style={{ fontSize: 12, color: 'rgba(240,237,232,0.4)', marginBottom: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              {isRTL ? 'أسئلة شائعة' : 'Quick Questions'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <div key={i} className="tag-pill" onClick={() => sendMessage(q)}>{q}</div>
              ))}
            </div>
          </div>

          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, animationDelay: '0.3s' }}>
            {[
              { n: '200+', label: isRTL ? 'علامة ناجحة' : 'Brands Launched' },
              { n: '3x', label: isRTL ? 'متوسط النمو' : 'Avg. Growth' },
              { n: '99%', label: isRTL ? 'رضا العملاء' : 'Satisfaction' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, background: 'linear-gradient(135deg, #ffb400, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.4)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAT */}
      {screen === 'chat' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {selectedCategory && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.2)', borderRadius: 10, padding: '8px 12px', fontSize: 13, color: '#ffb400' }}>
              <span>{selectedCategory.icon}</span>
              <span>{isRTL ? selectedCategory.ar : selectedCategory.en}</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`fade-in ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="msg-ai fade-in" style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '14px 16px' }}>
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div style={{ position: 'sticky', bottom: 0, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px 24px', zIndex: 10 }}>
        {selectedCategory && screen === 'home' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.2)', borderRadius: 10, padding: '7px 12px', fontSize: 12.5 }}>
            <span style={{ color: '#ffb400' }}>{selectedCategory.icon} {isRTL ? selectedCategory.ar : selectedCategory.en}</span>
            <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', color: 'rgba(240,237,232,0.4)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
        )}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            ref={(el) => { inputRef.current = el; textareaRef.current = el }}
            className="input-field"
            rows={1}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={isRTL ? 'اسألني عن التسويق والمبيعات...' : 'Ask about marketing & sales...'}
            style={{ flex: 1, padding: '13px 16px', minHeight: 48, maxHeight: 120 }}
          />
          <button className="btn-primary" onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {loading ? '⏳' : isRTL ? '↩' : '↪'}
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(240,237,232,0.25)', textAlign: 'center', marginTop: 8 }}>
          {isRTL ? 'مدعوم بـ Claude AI · Kwefi Team' : 'Powered by Claude AI · Kwefi Team'}
        </p>
      </div>
    </div>
  )
}
