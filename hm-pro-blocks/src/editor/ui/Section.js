import { PanelBody } from '@wordpress/components';

export function Section( { title, children, initialOpen = true } ) {
	return (
		<PanelBody title={ title } initialOpen={ initialOpen }>
			{ children }
		</PanelBody>
	);
}
