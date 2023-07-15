import React from 'react';
import { WindowTitleType } from 'src/config/types/types';
import './WindowTitle.css';

export default function WindowTitle({ title, children, className }: WindowTitleType): JSX.Element {
    const dark = className === 'dark' ? 'WindowTitle--Dark' : 'WindowTitle--light';
    return (
        <div className={`WindowTitle ${dark}`}>
            <h4 className="WindowTitle__title">{title}</h4>
            <span className="WindowTitle__children">{children}</span>
        </div>
    );
}
