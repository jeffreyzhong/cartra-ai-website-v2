import { ImageResponse } from 'next/og';

export const alt = 'Cartra custom AI agents for workflow automation';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F5F1E8',
          color: '#08111F',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: '#08111F',
              color: '#F5F1E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>
            Cartra
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ fontSize: 72, lineHeight: 0.95, fontWeight: 700, letterSpacing: -4, maxWidth: 920 }}>
            Custom AI agents for operational workflow automation.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#48515F', maxWidth: 920 }}>
            Built into the tools your team already uses. Deployed in weeks.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
