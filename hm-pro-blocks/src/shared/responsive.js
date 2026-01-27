export function pickResponsiveImage({ desktop, tablet, mobile }) {
	return mobile || tablet || desktop || null;
}
