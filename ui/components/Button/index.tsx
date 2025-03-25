import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import NextLink from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
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
    const Link = link ? NextLink : React.Fragment;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <Link href={link?.href || ''}>
          {icon && icon.position === 'before' && iconComponent(icon.position)}
          {icon && icon.position === 'center'
            ? iconComponent(icon.position)
            : children}
          {icon && icon.position === 'after' && iconComponent(icon.position)}
        </Link>
      </Comp>
    );
  }
);

UIButton.displayName = 'UIButton';

// const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ link, asChild, ...props }, ref) => {

//     if (link) {
//       return (<Link href={link.href} passHref>)
//     }

//     return <UIButtonBase {...props} ref={ref} />;
//   }
// );

// UIButton.displayName = 'UIButton';

export { UIButton, buttonVariants };
