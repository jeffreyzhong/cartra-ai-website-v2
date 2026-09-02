type IconName =
  | 'workspaces'
  | 'versioning'
  | 'catalog'
  | 'permissions'
  | 'skills'
  | 'a2a'
  | 'tags'
  | 'ab';

function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case 'workspaces':
      return (
        <>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.2" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="1.2" />
        </>
      );
    case 'versioning':
      return (
        <>
          <circle cx="7" cy="6" r="2.2" />
          <circle cx="7" cy="18" r="2.2" />
          <circle cx="17" cy="12" r="2.2" />
          <path d="M7 8.2v7.6M9.1 6.8c3.2.4 5.6 2 5.6 5.2" />
        </>
      );
    case 'catalog':
      return (
        <>
          <path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v12.5H7.5A1.5 1.5 0 0 1 6 18V4.5Z" />
          <path d="M6 4.5A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5" />
          <path d="M9 9h6M9 12.5h6M9 16h4" />
        </>
      );
    case 'permissions':
      return (
        <>
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8.5 11V8.2a3.5 3.5 0 0 1 7 0V11" />
        </>
      );
    case 'skills':
      return (
        <>
          <path d="M8 8.2 12 5.5 16 8.2v5.4L12 16.3 8 13.6V8.2Z" />
          <path d="M12 16.3V20" />
        </>
      );
    case 'a2a':
      return (
        <>
          <path d="M4 8h11M15 8l-3-3M15 8l-3 3" />
          <path d="M20 16H9M9 16l3-3M9 16l3 3" />
        </>
      );
    case 'tags':
      return (
        <>
          <path d="M4.5 12.2V5.5H11l7.2 7.2-6.2 6.2L4.5 12.2Z" />
          <circle cx="8.2" cy="9.2" r="1" />
        </>
      );
    case 'ab':
      return (
        <>
          <path d="M3.8 18 8.2 6.8 12.6 18" />
          <path d="M5.6 13.7h5.2" />
          <path d="M14.4 7v11" />
          <path d="M16.6 7v11" />
          <path d="M16.6 7h3.4a2.05 2.05 0 0 1 0 4.1H16.6" />
          <path d="M16.6 11.1h3.8a2.25 2.25 0 0 1 0 5.5H16.6" />
        </>
      );
    default:
      return null;
  }
}

export default function LifecycleIcon({ name }: { name: IconName }) {
  return (
    <span className="agents-icon" aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IconPaths name={name} />
      </svg>
    </span>
  );
}
