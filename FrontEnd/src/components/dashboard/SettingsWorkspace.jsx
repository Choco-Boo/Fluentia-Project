import { useState } from 'react';

const settingsTabs = [
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing plans' },
  { id: 'security', label: 'Login & security' },
  { id: 'members', label: 'Members' }
];

const notificationOptions = [
  { id: 'sound', label: 'Sound effects' },
  { id: 'haptic', label: 'Haptic feedback' },
  { id: 'motivation', label: 'Motivational messages' },
  { id: 'listening', label: 'Listening exercises' },
  { id: 'pronunciation', label: 'Show pronunciation' }
];

function SettingsWorkspace({ user, settings, languages = [], goals = [] }) {
  const [activeTab, setActiveTab] = useState('account');
  const [enabledNotifications, setEnabledNotifications] = useState({
    sound: false,
    haptic: false,
    motivation: true,
    listening: true,
    pronunciation: true
  });

  function toggleNotification(id) {
    setEnabledNotifications((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="fd-pro-card fd-settings-workspace">
      <header className="fd-settings-title-row">
        <h2>Settings</h2>
      </header>

      <nav className="fd-settings-tabs fd-settings-tabs-inline" aria-label="Settings sections">
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="fd-settings-panel">
        {activeTab === 'account' && (
          <section className="fd-settings-block">
            <header>
              <h3>Account</h3>
              <p>Update your personal profile and learning defaults.</p>
            </header>

            <div className="fd-settings-avatar-row">
              <div className="fd-settings-avatar">Upload photo</div>
              <div className="fd-settings-avatar-actions">
                <button type="button" className="ghost">Remove</button>
                <button type="button">Upload</button>
              </div>
            </div>

            <form className="fd-settings-form" onSubmit={(event) => event.preventDefault()}>
              <div className="fd-settings-grid two">
                <label>
                  First name
                  <input type="text" defaultValue={user?.name?.split(' ')[0] ?? 'Cassandra'} />
                </label>
                <label>
                  Last name
                  <input type="text" defaultValue={user?.name?.split(' ').slice(1).join(' ') || 'Eloise'} />
                </label>
              </div>

              <div className="fd-settings-grid two">
                <label>
                  Email
                  <input type="email" defaultValue={settings?.account?.email ?? 'cassandra@fluentia.com'} />
                </label>
                <label>
                  Goal focus
                  <select defaultValue={user?.goal ?? goals[0] ?? ''}>
                    {goals.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="fd-settings-grid two">
                <label>
                  Main language
                  <select defaultValue="English">
                    {['English', 'Spanish', 'Portuguese', 'French'].map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Want to learn
                  <select defaultValue={user?.language ?? languages[0] ?? ''}>
                    {languages.map((language) => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="fd-settings-actions">
                <button type="submit">Save changes</button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="fd-settings-block">
            <header>
              <h3>Lesson experience</h3>
              <p>Control feedback and reminder preferences during practice.</p>
            </header>
            <div className="fd-settings-switch-list">
              {notificationOptions.map((item) => (
                <div key={item.id} className="fd-settings-switch-row">
                  <span>{item.label}</span>
                  <button
                    type="button"
                    className={`fd-switch ${enabledNotifications[item.id] ? 'on' : ''}`}
                    onClick={() => toggleNotification(item.id)}
                    aria-pressed={enabledNotifications[item.id]}
                  >
                    <span></span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'billing' && (
          <section className="fd-settings-block">
            <header className="fd-settings-inline-header">
              <div>
                <h3>Payment method</h3>
                <p>Use a card for future subscription renewals.</p>
              </div>
              <button type="button">Save changes</button>
            </header>

            <form className="fd-settings-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                Name on card
                <input type="text" defaultValue="Cassandra Eloise" />
              </label>
              <div className="fd-settings-grid two-plus">
                <label>
                  Card number
                  <input type="text" defaultValue="**** **** **** 2048" />
                </label>
                <label>
                  CVC
                  <input type="text" defaultValue="***" />
                </label>
              </div>
              <div className="fd-settings-grid two">
                <label>
                  Expiry month
                  <select defaultValue="09">
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                  </select>
                </label>
                <label>
                  Expiry year
                  <select defaultValue="2028">
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                </label>
              </div>
            </form>

            <hr />

            <div className="fd-settings-subsection">
              <h4>Billing email</h4>
              <p>Receipts and payment updates will be sent here.</p>
              <div className="fd-settings-inline-form">
                <input type="email" defaultValue={settings?.account?.email ?? 'billing@fluentia.com'} />
                <button type="button">Update email</button>
              </div>
            </div>

            <hr />

            <div className="fd-settings-subsection danger">
              <h4>Cancel subscription</h4>
              <p>Your current plan stays active until the end of the billing period.</p>
              <a href="/billing-cancel" onClick={(event) => event.preventDefault()}>I want to cancel my subscription.</a>
              <button type="button" className="danger-btn">Cancel subscription</button>
            </div>
          </section>
        )}

        {activeTab === 'security' && (
          <section className="fd-settings-block fd-settings-security">
            <header>
              <h3>Login & security</h3>
              <p>Manage password access and account safety options.</p>
            </header>
            <div className="fd-settings-subsection">
              <h4>Email address</h4>
              <p>Your email address is {settings?.account?.email ? 'set' : 'not set'}.</p>
              <a href="/change-email" onClick={(event) => event.preventDefault()}>Change</a>
            </div>
            <div className="fd-settings-subsection">
              <h4>Password</h4>
              <p>Can&apos;t remember your current password? <a href="/reset-password" onClick={(event) => event.preventDefault()}>Reset your password</a></p>
            </div>
            <div className="fd-settings-subsection danger">
              <h4>Delete account</h4>
              <a href="/delete-account" onClick={(event) => event.preventDefault()}>I want to delete my account.</a>
              <button type="button" className="danger-btn">Delete account</button>
            </div>
          </section>
        )}

        {activeTab === 'members' && (
          <section className="fd-settings-block">
            <header>
              <h3>Members</h3>
              <p>Invite study partners or manage your shared learning group.</p>
            </header>

            <div className="fd-settings-members-list">
              {[
                { name: 'Cassandra Eloise', role: 'Owner', status: 'Active' },
                { name: 'Riley Johnson', role: 'Coach', status: 'Active' },
                { name: 'Mina Duarte', role: 'Learner', status: 'Pending invite' }
              ].map((member) => (
                <article key={member.name}>
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.role}</p>
                  </div>
                  <span>{member.status}</span>
                </article>
              ))}
            </div>

            <div className="fd-settings-actions">
              <button type="button">Invite member</button>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default SettingsWorkspace;
