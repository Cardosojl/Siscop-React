/* eslint-disable prettier/prettier */
import React from 'react';
import { TableType } from 'src/config/types/types';
import './Table.css'

export default function Table({ head, body }: TableType): JSX.Element {
    return (
        <div className="table-responsive">
            <table className="Table table table-borderless table-hover">
                <thead className="">
                    <tr>{head}</tr>
                </thead>
                {body}
            </table>
        </div>
    );
}
