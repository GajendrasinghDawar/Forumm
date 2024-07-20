import { Link } from '@inertiajs/react';
import React from 'react';

export default function MentionText({ text }) {

    const parseMentions = (text) => {
        const mentionRegex = /@([A-Za-z0-9_]+)/g;
        const parts = text.split(mentionRegex);

        const parsedText = parts.map(function (part, index) {
            if (index % 2 === 1)
            {
                return <Link href={ `/profile/${part}` } key={ index }>@{ part }</Link>;
            }
            return part;
        })
        return parsedText
    }

    return (
        <p>
            { parseMentions(text) }
        </p>
    );

}

