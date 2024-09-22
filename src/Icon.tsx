/**
 * Font Awesome Free 6.6.0 by @fontawesome
 * https://fontawesome.com
 * License - https://fontawesome.com/license/free
 * Copyright 2024 Fonticons, Inc.
 */

import React from 'react';

import type { T_PoptartType } from './types';

interface Props {
	type: T_PoptartType;
	color: string;
	size: number;
}

export default function Icon(props: Props) {
	const { type, color, size } = props;

	switch (type) {
		case 'success':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={`${size}px`} height={`${size}px`}>
					<path
						fill={color}
						d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
					/>
				</svg>
			);
		case 'error':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={`${size}px`} height={`${size}px`}>
					<path
						fill={color}
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
			);
		case 'warning':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={`${size}px`} height={`${size}px`}>
					<path
						fill={color}
						d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
					/>
				</svg>
			);
		default: // info
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={`${size}px`} height={`${size}px`}>
					<path
						fill={color}
						d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
					/>
				</svg>
			);
	}
}
