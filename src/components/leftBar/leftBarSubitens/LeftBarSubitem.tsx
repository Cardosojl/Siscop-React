import React from 'react';
import { LeftBarSubitens } from 'src/config/types/types';
import '../LeftBar.css';

export default function LeftBarSubitem(props: LeftBarSubitens): JSX.Element {
    const active = props.active ? 'LeftBar__subitem--selected' : '';

    return (
        <div className={`LeftBar__subitem ${active}`}>
            <p>{props.title}</p>
        </div>
    );
}
