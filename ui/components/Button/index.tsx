import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import NextLink from 'next/link';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 border border-primary-500 text-white hover:bg-primary-600',
        inactive: 'bg-primary-900 text-white hover:bg-primary-600',
        danger: 'bg-feedback-danger text-white',
        outline:
          'border border-border-card bg-white hover:bg-primary-50 text-primary-500',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'text-primary-600 hover:bg-primary-100 justify-start text-left',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 py-0 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-7 w-7 rounded-full',
        slim: 'h-8 px-2 py-0 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  link?: {
    href: string;
    onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
    target?: string;
  };
  icon?: {
    src: string;
    position: 'before' | 'after' | 'center';
    size: number;
  };
}

const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      asChild = false,
      link,
      children,
      ...props
    },
    ref
  ) => {
    const iconComponent = (position: string) => {
      let classes;

      switch (position) {
        case 'before':
          classes = 'mr-0';
          break;
        case 'after':
          classes = 'ml-0';
          break;
      }

      if (icon) {
        return (
          <Image
            src={icon.src}
            alt=""
            width={icon.size}
            height={icon.size}
            className={classes}
          />
        );
      }

      return null;
    };

    const Comp = asChild || link ? Slot : 'button';

    const buttonContent = (
      <>
        {icon && icon.position === 'before' && iconComponent(icon.position)}
        {icon && icon.position === 'center'
          ? iconComponent(icon.position)
          : children}
        {icon && icon.position === 'after' && iconComponent(icon.position)}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {link?.href ? (
          <NextLink href={link?.href || ''}>{buttonContent}</NextLink>
        ) : (
          buttonContent
        )}
      </Comp>
    );
  }
);

UIButton.displayName = 'UIButton';

export { UIButton, buttonVariants };
