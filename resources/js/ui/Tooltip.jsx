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
        <TooltipPrimitive.Provider delayDuration={ 800 } skipDelayDuration={ 500 }>
            <TooltipPrimitive.Root
                open={ open }
                defaultOpen={ defaultOpen }
                onOpenChange={ onOpenChange }
            >
                <TooltipPrimitive.Trigger asChild>
                    { children }
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-sand-sand6 px-[15px] py-[10px] text-[15px] leading-none will-change-[transform,opacity] hover:bg-gray-gray4 border border-gray-gray5 text-sm"
                    side="bottom" align="center" { ...props }>
                    { content }
                    <TooltipPrimitive.Arrow width={ 11 } height={ 5 } className='fill-sand-sand6' />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}