'use client';

import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

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
 * Button — primary interactive element (DESIGN.md).
 *
 * Variants:
 *   primary   → orange CTA (#f54e00)
 *   secondary → white + hairline border
 *   ghost     → tertiary text link style
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
        <span aria-hidden className="ds-btn-icon">
          {trailingIcon}
        </span>
      )}
    </>
  );

  if (rest.as === 'a') {
    const { as: _as, ...anchorRest } = rest;
    void _as;
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
  void _asBtn;
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
