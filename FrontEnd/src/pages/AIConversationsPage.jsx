import { useState } from 'react';

const mockMessages = [
  { id: 'm1', from: 'ai', text: 'Hi! I am your Fluentia AI tutor. Ready to practice today?' },
  { id: 'm2', from: 'user', text: 'Yes, let us practice travel conversations.' },
  { id: 'm3', from: 'ai', text: 'Great. Tell me how you would ask for directions to the train station.' }
];

const suggestedPrompts = ['Practice introductions', 'Ask me questions', 'Travel roleplay'];

function AIConversationsPage() {
  const [talkState, setTalkState] = useState('idle');
  const [draft, setDraft] = useState('');

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
    idle: 'Tap start to practice speaking with AI.',
    listening: 'Listening...',
    processing: 'Processing...'
  }[talkState];

  const mockAIResponse = talkState === 'processing'
    ? 'AI: Nice sentence structure. Try adding one more detail to sound more natural.'
    : 'AI response preview appears here after your voice input.';

  return (
    <section className="fd-pro-card fd-ai-page">
      <header className="fd-pro-card-head fd-ai-head">
        <div>
          <h2>AI Conversations</h2>
          <p>Practice speaking or texting with AI</p>
        </div>
      </header>

      <div className="fd-ai-layout">
        <article className="fd-ai-panel fd-ai-talk">
          <div className="fd-ai-panel-head">
            <span className="fd-ai-icon" aria-hidden="true">🎙️</span>
            <h3>Talk to AI</h3>
          </div>
          <p className="fd-ai-status">{talkLabel}</p>
          <button type="button" className="fd-ai-primary-btn" onClick={cycleTalkState}>
            Start Talking
          </button>
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
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`fd-ai-chat-bubble ${message.from === 'user' ? 'is-user' : 'is-ai'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="fd-ai-prompt-row">
            {suggestedPrompts.map((prompt) => (
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
            <button type="submit">Send</button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default AIConversationsPage;
