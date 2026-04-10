import React, { useState, useRef, useEffect } from 'react';

const CHATS = [
  {
    id: 0,
    name: 'Jordan Reeves',
    init: 'JR',
    campaign: 'Summer Launch · TikTok Video',
    status: 'In Review',
    statusClass: 'status-review',
    unread: true,
    revisions: 1,
    maxRevisions: 3,
    preview: 'Uploaded the final cut...',
    messages: [
      {
        from: 'creator',
        text: 'Hey! I just uploaded the final cut for your review. Really happy with how it turned out.',
        time: '2:14 PM',
      },
      {
        from: 'brand',
        text: 'Love the hook in the first 3 seconds. One ask: can you add a CTA overlay at the end?',
        time: '2:31 PM',
      },
      {
        from: 'creator',
        text: "Absolutely, I'll have that revision ready within the hour.",
        time: '2:33 PM',
      },
      {
        from: 'creator',
        file: 'final_cut_v2.mp4',
        fileType: 'MP4',
        delivery: false,
        time: '3:07 PM',
      },
    ],
  },
  {
    id: 1,
    name: 'Maya Chen',
    init: 'MC',
    campaign: 'Fall Collection · UGC Ad',
    status: 'Active',
    statusClass: 'status-active',
    unread: false,
    revisions: 0,
    maxRevisions: 3,
    preview: 'Can I adjust the deadline?',
    messages: [
      {
        from: 'brand',
        text: 'Hi Maya! Excited for this one. Brief is attached.',
        time: 'Yesterday',
      },
      {
        from: 'creator',
        text: 'Thank you! Can I adjust the deadline by 1 day? Want the lighting to be perfect.',
        time: 'Yesterday',
      },
      { from: 'brand', text: 'No problem — take the time you need.', time: 'Yesterday' },
    ],
  },
  {
    id: 2,
    name: 'Caleb St. James',
    init: 'CS',
    campaign: 'Faith Community · Lifestyle',
    status: 'In Review',
    statusClass: 'status-review',
    unread: false,
    revisions: 2,
    maxRevisions: 3,
    preview: 'Revision 2 is ready',
    messages: [
      {
        from: 'creator',
        text: 'Revision 2 is ready! Incorporated all your feedback from round one.',
        time: '10:15 AM',
      },
      {
        from: 'brand',
        text: 'This looks excellent. Sending for final approval now.',
        time: '11:00 AM',
      },
      {
        from: 'creator',
        file: 'lifestyle_rev2.mp4',
        fileType: 'MP4',
        delivery: true,
        time: '11:04 AM',
      },
    ],
  },
  {
    id: 3,
    name: 'Sofia Voss',
    init: 'SV',
    campaign: 'TechDrop Launch · TikTok',
    status: 'Active',
    statusClass: 'status-active',
    unread: false,
    revisions: 0,
    maxRevisions: 3,
    preview: 'Excited to get started...',
    messages: [
      {
        from: 'brand',
        text: 'Sofia, product sample is on its way. Let us know when it arrives!',
        time: 'Mon',
      },
      { from: 'creator', text: 'Sounds great, excited to get started on this one!', time: 'Mon' },
    ],
  },
];

export default function MessagesView() {
  const [activeChatId, setActiveChatId] = useState(0);
  const [chats, setChats] = useState(CHATS);
  const [inputVal, setInputVal] = useState('');

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const sendMessage = () => {
    const text = inputVal.trim();
    if (!text) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, { from: 'brand', text, time: 'Now' }], preview: text }
          : c
      )
    );
    setInputVal('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toUpperCase();
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              revisions: c.revisions + 1,
              messages: [
                ...c.messages,
                { from: 'brand', file: file.name, fileType: ext, delivery: false, time: 'Now' },
              ],
              preview: `Uploaded ${file.name}`,
            }
          : c
      )
    );
    e.target.value = '';
  };

  const markFinalDelivery = (msgIndex) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== activeChatId) return c;
        const messages = c.messages.map((m, i) => (i === msgIndex ? { ...m, delivery: true } : m));
        return { ...c, messages, status: 'Delivered', statusClass: 'status-delivered' };
      })
    );
  };

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
                  <div className={`msg from-${m.from}`} key={i}>
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
                        <button className="delivery-btn" onClick={() => markFinalDelivery(i)}>
                          Mark Final
                        </button>
                      )}
                      {m.delivery && <span className="delivery-badge">◆ Delivered</span>}
                    </div>
                    <div className="msg-meta">{m.time}</div>
                  </div>
                );
              return (
                <div className={`msg from-${m.from}`} key={i}>
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
