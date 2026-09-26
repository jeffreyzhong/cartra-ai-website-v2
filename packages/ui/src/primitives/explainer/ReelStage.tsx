import { Fragment } from 'react';
import { EXPLAINER_COPY as COPY } from './copy';

/**
 * ReelStage — static markup for all five scenes, layered in paint order.
 *
 * Nothing here animates on its own. `data-xp` names are the handles the
 * timeline animates; `data-probe` marks caret stops the engine measures.
 * Line breaks come in two flavours so server and client markup always match:
 * `xp-br-p` breaks only in portrait, `xp-br-l` only in landscape.
 */
export function ReelStage({ logoSrc }: { logoSrc: string }) {
  const { problem, what, how, proof, brand } = COPY;

  return (
    <>
      {/* Hairline frame edge, beneath every full-bleed field so each one
          covers it wherever its wipe has reached */}
      <div className="ds-xp-edge" />

      {/* Scene 2 · What we do */}
      <div className="ds-xp-layer ds-xp-what">
        <div className="ds-xp-stack ds-xp-headline">
          <span className="ds-xp-mask ds-xp-mask-slam">
            <span className="ds-xp-line" data-xp="head-1">
              <i className="ds-xp-probe ds-xp-probe-start" data-probe="w-start" />
              {what.headline.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && ' '}
                  <span className={`ds-xp-word${word === 'agents' ? ' ds-xp-agent' : ''}`} data-xp={`w${i}`}>
                    {word}
                    <i className="ds-xp-probe" data-probe={`w${i}`} />
                  </span>
                  {i === 1 && <br className="xp-br-p" />}
                </Fragment>
              ))}
            </span>
          </span>
          <span className="ds-xp-mask ds-xp-mask-slam">
            <span className="ds-xp-line" data-xp="head-2">
              <span className="ds-xp-word" data-xp="w-tail">
                {what.headlineTail[0]}
                <br className="xp-br-p" /> {what.headlineTail[1]}
                <i className="ds-xp-probe" data-probe="w-tail" />
              </span>
            </span>
          </span>
        </div>

        <div className="ds-xp-stack ds-xp-no">
          {what.objections.map((lines, i) => (
            <span className="ds-xp-mask ds-xp-mask-slam" key={lines[0]}>
              <span className="ds-xp-line ds-xp-slam" data-xp={`no${i}`}>
                {lines[0]}
                {lines[1] && (
                  <>
                    <br className="xp-br-p" /> {lines[1]}
                  </>
                )}
                <i className="ds-xp-probe" data-probe={`no${i}`} />
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Scene 3 · How it works */}
      <div className="ds-xp-layer ds-xp-how" data-xp="how">
        <div className="ds-xp-odo">
          <span className="ds-xp-odo-strip" data-xp="odo">
            {how.steps.map((step) => (
              <span key={step.n}>{step.n}</span>
            ))}
          </span>
        </div>
        <div className="ds-xp-stack ds-xp-steps">
          {how.steps.map((step, i) => (
            <span className="ds-xp-mask" key={step.n}>
              <span className="ds-xp-line" data-xp={`step${i}`}>
                <span data-xp={`stepc${i}`}>{step.title}</span>
              </span>
            </span>
          ))}
        </div>
        {how.steps.map((step, i) => (
          <div className={`ds-xp-stack ds-xp-sup ds-xp-sup-${i}`} key={step.n}>
            {step.support.map((line, j) => (
              <span className="ds-xp-mask" key={line}>
                <span className="ds-xp-line" data-xp={`sup${i}-${j}`}>
                  {line}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Scene 5 · Cartra (under the proof field so the iris can reveal it) */}
      <div className="ds-xp-layer ds-xp-brand">
        <div className="ds-xp-lockup">
          <span className="ds-xp-logo" data-xp="logo">
            <span className="ds-xp-logo-clip">
              {/* Plain img: @repo/ui has no next/image. The PNG is only masked, never redrawn. */}
              <img
                className="ds-xp-logo-img"
                data-xp="logo-img"
                src={logoSrc}
                alt=""
                width={600}
                height={600}
                decoding="sync"
                draggable={false}
              />
              <span className="ds-xp-disc" data-xp="disc" />
            </span>
            <span className="ds-xp-ring" data-xp="ring" />
          </span>
          <span className="ds-xp-wordmark" data-xp="wordmark">
            <span className="ds-xp-wordmark-i" data-xp="wordmark-i">
              {brand.name}
            </span>
          </span>
        </div>
        <div className="ds-xp-tagline">
          <span className="ds-xp-imask">
            <span className="ds-xp-line-i" data-xp="tag0">
              {brand.tagline[0]}
            </span>
          </span>
          <br className="xp-br-p" />{' '}
          <span className="ds-xp-imask">
            <span className="ds-xp-line-i" data-xp="tag1">
              {brand.tagline[1]}
              <i className="ds-xp-probe" data-probe="tag-end" />
            </span>
          </span>
        </div>
      </div>

      {/* Scene 4 · Proof (full-bleed orange field) */}
      <div className="ds-xp-layer ds-xp-orange" data-xp="orange">
        <div className="ds-xp-stat-wrap">
          <span className="ds-xp-mask">
            <span className="ds-xp-stat" data-xp="stat">
              <span className="ds-xp-num">
                <span className="ds-xp-num-ghost">{proof.value}</span>
                <span className="ds-xp-num-live" data-xp="num" />
              </span>
              %
            </span>
          </span>
        </div>
        <div className="ds-xp-stat-label">
          <span className="ds-xp-mask">
            <span className="ds-xp-line" data-xp="stat-label">
              {proof.label[0]}
              <br className="xp-br-p" /> {proof.label[1]}
            </span>
          </span>
        </div>
      </div>

      {/* The process rail, which later becomes the cost bar */}
      <div className="ds-xp-rail" data-xp="rail">
        <span className="ds-xp-rail-track" data-xp="rail-track" />
        <span className="ds-xp-rail-fill" data-xp="rail-fill">
          <span className="ds-xp-rail-white" data-xp="rail-white" />
        </span>
      </div>

      {/* Scene 1 · The problem (ink field, lifts away at 5.75s) */}
      <div className="ds-xp-layer ds-xp-ink" data-xp="ink">
        <div className="ds-xp-verbs">
          {problem.verbs.map((verb, i) => (
            <Fragment key={verb}>
              <span className="ds-xp-imask" data-poster={i > 0 ? 'hide' : undefined}>
                <span className="ds-xp-vmove" data-xp={`vm${i}`}>
                  <span className="ds-xp-verb" data-xp={`v${i}`}>
                    {verb}
                  </span>
                  <i className="ds-xp-probe" data-probe={`v${i}`} />
                  {i === 0 && <i className="ds-xp-poster-caret" />}
                </span>
              </span>
              {i === 1 || i === 3 ? <br /> : i < 4 ? <br className="xp-br-p" /> : null}
              {i < 4 && ' '}
            </Fragment>
          ))}
        </div>

        <div className="ds-xp-stack ds-xp-punch" data-poster="hide">
          <span className="ds-xp-mask">
            <span className="ds-xp-line" data-xp="people">
              {problem.people[0]}
              <br className="xp-br-p" /> {problem.people[1]}
            </span>
          </span>
          <span className="ds-xp-mask">
            <span className="ds-xp-line" data-xp="stuck">
              {problem.stuck}
              <br className="xp-br-p" />{' '}
              <span className="ds-xp-sel" data-xp="sel">
                <i className="ds-xp-probe ds-xp-probe-start" data-probe="sel-start" />
                <span className="ds-xp-sel-bar" data-xp="sel-bar" />
                <span className="ds-xp-sel-txt" data-xp="sel-txt">
                  {problem.busywork}
                </span>
                <span className="ds-xp-sel-ink" data-xp="sel-ink">
                  {problem.busywork}
                </span>
              </span>
              <i className="ds-xp-probe" data-probe="sel-end" />
            </span>
          </span>
        </div>
      </div>

      {/* Loop seam: ink rises back in so 30s matches 0s */}
      <div className="ds-xp-layer ds-xp-ink-loop" data-xp="ink-loop" />

      <div className="ds-xp-caret" data-xp="caret">
        <i className="ds-xp-caret-i" data-xp="caret-i">
          <i className="ds-xp-caret-c" data-xp="caret-c" />
        </i>
      </div>

    </>
  );
}
