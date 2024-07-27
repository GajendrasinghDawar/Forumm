import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export function Tooltip({
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    ...props
}) {
    return (
        <TooltipPrimitive.Root
            open={ open }
            defaultOpen={ defaultOpen }
            onOpenChange={ onOpenChange }
        >
            <TooltipPrimitive.Trigger asChild>
                { children }
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Content side="top" align="center" { ...props }>
                { content }
                <TooltipPrimitive.Arrow width={ 11 } height={ 11 } />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
    );
}