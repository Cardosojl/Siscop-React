/* eslint-disable prettier/prettier */
import React from 'react';
import { TableType } from 'src/config/types/types';
import './Table.css'

export default function Table({ table }: { table: TableType}): JSX.Element {
    return (
        <div className="table-responsive">
            <table className="Table table table-borderless table-hover">
                <thead className="">
                    {table.head}
                </thead>
                {table.body}
            </table>
        </div>
    );
}
