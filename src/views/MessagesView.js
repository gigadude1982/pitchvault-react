import React, { useState, useRef, useEffect } from 'react';
import { db } from '../services/db';

export default function MessagesView() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputVal, setInputVal] = useState('');

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    db.getChats().then((data) => {
      setChats(data);
      if (data.length > 0) setActiveChatId(data[0].id);
      setLoading(false);
    });
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const sendMessage = () => {
    const text = inputVal.trim();
    if (!text) return;
    const msg = { from: 'brand', text, time: 'Now' };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, msg], preview: text } : c
      )
    );
    setInputVal('');
    db.addMessage(activeChatId, msg);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toUpperCase();
    const newRevisions = (activeChat?.revisions ?? 0) + 1;
    const msg = { from: 'brand', file: file.name, fileType: ext, delivery: false, time: 'Now' };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              revisions: newRevisions,
              messages: [...c.messages, msg],
              preview: `Uploaded ${file.name}`,
            }
          : c
      )
    );
    e.target.value = '';
    db.addMessage(activeChatId, msg, newRevisions);
  };

  const markFinalDelivery = (messageId) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== activeChatId) return c;
        const messages = c.messages.map((m) => (m.id === messageId ? { ...m, delivery: true } : m));
        return { ...c, messages, status: 'Delivered', statusClass: 'status-delivered' };
      })
    );
    db.markFinalDelivery(messageId, activeChatId);
  };

  if (loading || !activeChat)
    return (
      <div
        className="view"
        style={{
          textAlign: 'center',
          padding: '60px 0',
          fontFamily: 'var(--cinzel)',
          color: 'var(--text-muted)',
          letterSpacing: 3,
        }}
      >
        LOADING...
      </div>
    );

  const revisionsLeft = activeChat.maxRevisions - activeChat.revisions;

  return (
    <div className="view">
      <div className="section-header">Correspondence</div>
      <div className="section-sub">All communication is secured within the platform.</div>

      <div className="chat-layout">
        <div className="chat-list">
          <div className="chat-list-header">Active Deals</div>
          {chats.map((c) => (
            <div
              key={c.id}
              className={`chat-item${c.id === activeChatId ? ' active' : ''}`}
              onClick={() => setActiveChatId(c.id)}
            >
              <div className="chat-item-name">
                {c.name}
                {c.unread && <span className="unread-dot" />}
              </div>
              <div className="chat-item-preview">{c.preview}</div>
            </div>
          ))}
        </div>

        <div className="chat-main">
          <div className="chat-header">
            <div className="avatar">{activeChat.init}</div>
            <div style={{ flex: 1 }}>
              <div className="chat-name">{activeChat.name}</div>
              <div className="chat-sub">{activeChat.campaign}</div>
            </div>
            <div className="revision-bar">
              <span className="revision-label">Revisions</span>
              <div className="revision-pips">
                {Array.from({ length: activeChat.maxRevisions }).map((_, i) => (
                  <div
                    key={i}
                    className={`revision-pip${i < activeChat.revisions ? ' used' : ''}`}
                  />
                ))}
              </div>
              <span className="revision-count">{revisionsLeft} left</span>
            </div>
            <div className={`status-badge ${activeChat.statusClass}`}>{activeChat.status}</div>
          </div>

          <div className="chat-messages">
            {activeChat.messages.map((m, i) => {
              if (m.file)
                return (
                  <div className={`msg from-${m.from}`} key={m.id ?? i}>
                    <div className="file-bubble">
                      <div className="file-icon">{m.fileType}</div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{ fontSize: 18, fontWeight: 500, color: 'var(--text-primary)' }}
                        >
                          {m.file}
                        </div>
                        <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                          {m.delivery ? '◆ Final Delivery' : 'Tap to review'}
                        </div>
                      </div>
                      {!m.delivery && m.from === 'creator' && (
                        <button className="delivery-btn" onClick={() => markFinalDelivery(m.id)}>
                          Mark Final
                        </button>
                      )}
                      {m.delivery && <span className="delivery-badge">◆ Delivered</span>}
                    </div>
                    <div className="msg-meta">{m.time}</div>
                  </div>
                );
              return (
                <div className={`msg from-${m.from}`} key={m.id ?? i}>
                  <div className="msg-bubble">{m.text}</div>
                  <div className="msg-meta">{m.time}</div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="attach-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach file"
            >
              ⊕
            </button>
            <input
              className="chat-input"
              placeholder={`Message ${activeChat.name.split(' ')[0]}...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="send-btn" onClick={sendMessage}>
              &#10148;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
