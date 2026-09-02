type IconName =
  | 'workspaces'
  | 'versioning'
  | 'catalog'
  | 'permissions'
  | 'skills'
  | 'a2a'
  | 'tags'
  | 'ab';

const PATHS: Record<IconName, string> = {
  workspaces:
    'M4 5.5h6.5V11H4V5.5zm8.5 0H19V11h-6.5V5.5zM4 13h6.5v5.5H4V13zm8.5 0H19v5.5h-6.5V13z',
  versioning:
    'M7 5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm.75-5v5m3.75-7.5H15a2 2 0 0 1 2 2v9',
  catalog:
    'M6 5.5h12v13H6v-13zm3 3h6M9 12h6M9 15h4',
  permissions:
    'M12 4.5a3.5 3.5 0 0 1 3.5 3.5v2h1.5v9h-10v-9H8.5V8A3.5 3.5 0 0 1 12 4.5z',
  skills:
    'M8 7l4-2.5L16 7v5.5L12 15.5 8 12.5V7zm4 8.5V21',
  a2a:
    'M5 8h9m0 0-2.5-2.5M14 8l-2.5 2.5M19 16H10m0 0 2.5-2.5M10 16l2.5 2.5',
  tags:
    'M4.5 12.5V5.5H12l7 7-6.5 6.5-8-6.5zm4-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  ab:
    'M6 17V7h5.5a3.2 3.2 0 0 1 0 6.4H6m.2 0H12M15.5 7l3 10m-5.2-3.6h4.6',
};

export default function LifecycleIcon({ name }: { name: IconName }) {
  return (
    <span className="agents-icon" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={PATHS[name]} />
      </svg>
    </span>
  );
}
