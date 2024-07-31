import React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';

export function Avatar({ imageUrl, className = "", alt = "" }) {
    return (
        <RadixAvatar.Root className={ `bg-whiteA-whiteA2 inline-flex  select-none items-center justify-center overflow-hidden rounded-full align-middle cursor-pointer ` + className }>
            <RadixAvatar.Image
                src={ imageUrl }
                className="h-full w-full rounded-[inherit] object-cover"
                alt={ alt }
            />
            <RadixAvatar.Fallback
                className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-whiteA-whiteA10 text-[15px] font-medium"
                delayMs={ 600 }
            >
            </RadixAvatar.Fallback>
        </RadixAvatar.Root>
    )
}

