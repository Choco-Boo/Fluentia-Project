function SidebarNav({ userName, section, setSection, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Settings' }
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
            {item.label}
          </button>
        ))}
      </nav>
      <button type="button" className="fd-pro-logout" onClick={onLogout}>Log out</button>
    </aside>
  );
}

export default SidebarNav;
