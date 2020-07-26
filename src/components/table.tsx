/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { FunctionComponent } from 'react';

export interface TableCell {
  value: string | number;
  alignRight?: boolean;
}

export interface TableRow {
  isHeader: boolean;
  cells: TableCell[];
}

interface TableProps {
  rows: TableRow[];
}

export const Table: FunctionComponent<TableProps> = ({ rows }: TableProps) => {
  return (
    <div className="prose" tw="mb-4">
      <table>
        <thead>
          <tr>
            {rows
              .filter(r => r.isHeader)
              .map(r =>
                r.cells.map((c, index) => (
                  <th key={index} css={[c.alignRight && tw`text-right`]}>
                    {c.value}
                  </th>
                )),
              )}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter(r => !r.isHeader)
            .map((r, rowIndex) => (
              <tr key={rowIndex}>
                {r.cells.map((c, index) => (
                  <td key={index} css={[c.alignRight && tw`text-right`]}>
                    {c.value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
