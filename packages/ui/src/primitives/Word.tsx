import { Fragment, type ReactNode } from 'react';

type WordSpec = {
  text: string;
  /** Wrap the word in `<em>` (gets the orange underline treatment). */
  em?: boolean;
};

type WordsProps = {
  /** Either an array of word specs, or a string that will be split on spaces. */
  words: WordSpec[] | string;
  /** Stagger between successive word reveals (ms). */
  stagger?: number;
  /** Initial delay before the first word starts (ms). */
  baseDelay?: number;
  className?: string;
};

/**
 * Words — splits a headline into individual word spans that rise into
 * view with staggered spring-curve animation. Use inside a `Display`
 * heading.
 *
 * If `words` is a string, it's split on spaces. Use the array form
 * when one word needs the `<em>` underline treatment.
 *
 * @example
 *   <Display as="h1" size="lg">
 *     <Words words={[
 *       { text: 'Transform' },
 *       { text: 'your' },
 *       { text: 'operations' },
 *       { text: 'with' },
 *       { text: 'AI' },
 *       { text: "that's" },
 *       { text: 'customized', em: true },
 *       { text: 'to' },
 *       { text: 'your' },
 *       { text: 'business.' },
 *     ]} />
 *   </Display>
 */
export function Words({
  words,
  stagger = 80,
  baseDelay = 0,
  className = '',
}: WordsProps): ReactNode {
  const list: WordSpec[] = typeof words === 'string'
    ? words.split(/\s+/).filter(Boolean).map((text) => ({ text }))
    : words;

  return (
    <>
      {list.map((w, i) => (
        <Fragment key={`${w.text}-${i}`}>
          {i > 0 && ' '}
          <span
            className={`ds-word${w.em ? ' ds-word-em' : ''}${className ? ` ${className}` : ''}`}
            style={{ animationDelay: `${baseDelay + i * stagger}ms` }}
          >
            {w.em ? <em>{w.text}</em> : w.text}
          </span>
        </Fragment>
      ))}
    </>
  );
}
