import { HTMLAttributes } from 'react';

export interface BaseProps extends HTMLAttributes<HTMLSpanElement> {}

export interface IconBaseProps extends HTMLAttributes<HTMLOrSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}