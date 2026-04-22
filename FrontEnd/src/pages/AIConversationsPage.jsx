import { useEffect, useState } from 'react';

const AI_CONTENT_API_URL = '/api/ai-conversations';
const AI_CONTENT_FALLBACK_URL = '/data/ai-conversations.json';

const DEFAULT_AI_CONTENT = {
  messages: [
    { id: 'm1', from: 'ai', text: 'Hi! I am your Fluentia AI tutor. Ready to practice today?' },
    { id: 'm2', from: 'user', text: 'Yes, let us practice travel conversations.' },
    { id: 'm3', from: 'ai', text: 'Great. Tell me how you would ask for directions to the train station.' }
  ],
  suggestedPrompts: ['Practice introductions', 'Ask me questions', 'Travel roleplay'],
  talk: {
    idleLabel: 'Tap start to practice speaking with AI.',
    listeningLabel: 'Listening...',
    processingLabel: 'Processing...',
    defaultResponse: 'AI response preview appears here after your voice input.',
    processingResponse: 'AI: Nice sentence structure. Try adding one more detail to sound more natural.'
  }
};

function AIConversationsPage() {
  const [talkState, setTalkState] = useState('idle');
  const [draft, setDraft] = useState('');
  const [content, setContent] = useState(DEFAULT_AI_CONTENT);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      const sources = [AI_CONTENT_API_URL, AI_CONTENT_FALLBACK_URL];

      for (const url of sources) {
        try {
          const response = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!response.ok) continue;
          const payload = await response.json();
          if (!payload || !Array.isArray(payload.messages) || !Array.isArray(payload.suggestedPrompts)) continue;
          if (isMounted) {
            setContent({ ...DEFAULT_AI_CONTENT, ...payload, talk: { ...DEFAULT_AI_CONTENT.talk, ...(payload.talk || {}) } });
          }
          return;
        } catch {
          // Try next source.
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  function cycleTalkState() {
    if (talkState === 'idle') {
      setTalkState('listening');
      return;
    }
    if (talkState === 'listening') {
      setTalkState('processing');
      return;
    }
    setTalkState('idle');
  }

  const talkLabel = {
    idle: content.talk.idleLabel,
    listening: content.talk.listeningLabel,
    processing: content.talk.processingLabel
  }[talkState];

  const talkButtonLabel = {
    idle: 'Start Talking',
    listening: 'Stop Listening',
    processing: 'Reset'
  }[talkState];

  const mockAIResponse = talkState === 'processing'
    ? content.talk.processingResponse
    : content.talk.defaultResponse;

  return (
    <section className="fd-pro-card fd-ai-page">
      <header className="fd-pro-card-head fd-ai-head">
        <div>
          <h2>AI Conversations</h2>
          <p>Practice speaking or texting with AI</p>
        </div>
        <div className="fd-ai-head-badges">
          <span>Live Practice</span>
          <span>Instant Feedback</span>
        </div>
      </header>

      <div className="fd-ai-layout">
        <article className={`fd-ai-panel fd-ai-talk is-${talkState}`}>
          <div className="fd-ai-panel-head">
            <span className="fd-ai-icon" aria-hidden="true">🎙️</span>
            <div>
              <h3>Talk to AI</h3>
              <p className={`fd-ai-state ${talkState}`}>{talkState.toUpperCase()}</p>
            </div>
          </div>
          <p className="fd-ai-status">{talkLabel}</p>
          <button type="button" className="fd-ai-primary-btn" onClick={cycleTalkState}>
            {talkButtonLabel}
          </button>
          <div className="fd-ai-wave" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="fd-ai-response-box">
            <strong>AI Response</strong>
            <p>{mockAIResponse}</p>
          </div>
        </article>

        <article className="fd-ai-panel fd-ai-chat">
          <div className="fd-ai-panel-head">
            <span className="fd-ai-icon" aria-hidden="true">💬</span>
            <h3>Text with AI</h3>
          </div>

          <div className="fd-ai-chat-stream" role="log" aria-live="polite">
            {content.messages.map((message) => (
              <div
                key={message.id}
                className={`fd-ai-chat-bubble ${message.from === 'user' ? 'is-user' : 'is-ai'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="fd-ai-prompt-row">
            {content.suggestedPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => setDraft(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="fd-ai-input-row" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" disabled={!draft.trim()}>Send</button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default AIConversationsPage;
