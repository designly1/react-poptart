export function getContrastColor({
	backgroundColor,
	lightColor,
	darkColor,
	threshold = 0.32,
}: {
	backgroundColor: string;
	lightColor: string;
	darkColor: string;
	threshold?: number;
}): string {
	// Helper function to calculate luminance of a color
	const getLuminance = (r: number, g: number, b: number) => {
		const [red, green, blue] = [r, g, b].map(channel => {
			const c = channel / 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
	};

	// Helper function to convert hex color to RGB
	const hexToRgb = (hex: string) => {
		let normalizedHex = hex.replace('#', '');
		if (normalizedHex.length === 3) {
			normalizedHex = normalizedHex
				.split('')
				.map(char => char + char)
				.join('');
		}
		const bigint = parseInt(normalizedHex, 16);
		return {
			r: (bigint >> 16) & 255,
			g: (bigint >> 8) & 255,
			b: bigint & 255,
		};
	};

	// Convert hex color to RGB
	const { r, g, b } = hexToRgb(backgroundColor);

	// Calculate the luminance
	const luminance = getLuminance(r, g, b);

	// Return lightColor if the background is dark, and darkColor if the background is light
	return luminance > threshold ? darkColor : lightColor;
}

// Function to dynamically inject styles into the document
export const injectStyle = (id: string, style: string) => {
	const existingStyleElement = document.getElementById(id);
	if (existingStyleElement) {
		existingStyleElement.innerHTML = style;
		return;
	}
	const styleElement = document.createElement('style');
	styleElement.id = id;
	styleElement.innerHTML = style;
	document.head.appendChild(styleElement);
};

export function generateSecureString(length: number): string {
	if (length <= 0) {
		throw new Error('Length must be a positive number.');
	}

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const maxByte = 256 - (256 % chars.length);
	let secureString = '';

	while (secureString.length < length) {
		const randomBytes = new Uint8Array(length);
		crypto.getRandomValues(randomBytes);

		for (let i = 0; i < randomBytes.length && secureString.length < length; i++) {
			const randomByte = randomBytes[i];

			if (randomByte < maxByte) {
				secureString += chars[randomByte % chars.length];
			}
		}
	}

	return secureString;
}

export function isObject(item: any): item is object {
	return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends object, T2 extends object>(target: T, ...sources: T2[]): T {
	if (!sources.length) return target;

	const source = sources.shift();

	if (source) {
		Object.keys(source).forEach(key => {
			const targetValue = (target as any)[key];
			const sourceValue = (source as any)[key];

			if (isObject(targetValue) && isObject(sourceValue)) {
				(target as any)[key] = deepMerge({ ...targetValue }, sourceValue);
			} else {
				(target as any)[key] = sourceValue;
			}
		});
	}

	return deepMerge(target, ...sources);
}
