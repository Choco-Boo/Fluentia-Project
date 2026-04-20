function SidebarNav({ userName, section, setSection, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'lessons', label: 'Lessons', icon: '📚' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'ai-conversations', label: 'AI Conversations', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="fd-pro-sidebar">
      <div className="fd-pro-brand">Fluentia</div>
      <div className="fd-pro-user-pill">{userName}</div>
      <nav className="fd-pro-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={section === item.id ? 'active' : ''}
            onClick={() => setSection(item.id)}
          >
            <span className="fd-pro-nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button type="button" className="fd-pro-logout" onClick={onLogout}>Log out</button>
    </aside>
  );
}

export default SidebarNav;
