'use client';

import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button';
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Button — primary interactive element.
 *
 * Variants:
 *   primary → navy fill, white text (highest-priority CTAs)
 *   ghost   → transparent, text-color, hovers to surface tint (secondary CTAs)
 *
 * Renders as `<button>` by default, or `<a>` when `as="a"` is passed
 * (with `href` required). Both forms accept a `trailingIcon` slot.
 *
 * @example
 *   <Button trailingIcon="→">Book a free consultation</Button>
 *   <Button variant="ghost" as="a" href="#process">See our process</Button>
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant = 'primary', trailingIcon, className = '', children, ...rest },
  ref
) {
  const cls = `ds-btn ds-btn-${variant} ${className}`.trim();
  const content = (
    <>
      {children}
      {trailingIcon && (
        <span aria-hidden style={{ display: 'inline-flex' }}>
          {trailingIcon}
        </span>
      )}
    </>
  );

  if (rest.as === 'a') {
    const { as: _as, ...anchorRest } = rest;
    return (
      <a
        className={cls}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { as: _asBtn, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      className={cls}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...buttonRest}
    >
      {content}
    </button>
  );
});
