import React from 'react';
import Column, { ColumnProps } from './Column';

export interface RowType extends React.ForwardRefExoticComponent<ColumnProps> {
  animate: (object: object) => void;
  transitionTo: (object: object) => void;
}

const Row = React.memo((props: ColumnProps): JSX.Element => {
  return <Column {...props} row />;
});

export default Row;
