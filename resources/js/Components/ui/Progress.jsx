import React from 'react';
import * as Progress from '@radix-ui/react-progress';

export function ProgressBar({ progress }) {

    return (
        <Progress.Root
            className="relative overflow-hidden bg-blackA6 rounded-full w-[300px] h-[25px]"
            style={ {
                transform: 'translateZ(0)',
            } }
            value={ progress.percentage }
        >
            <Progress.Indicator
                className="bg-sand-sand4 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                style={ { transform: `translateX(-${100 - progress.percentage}%)` } }
            />
        </Progress.Root>
    );
};

