import { TabPanel } from '@wordpress/components';
import { PANEL_TABS } from '../../shared/constants';

const tabNames = PANEL_TABS.map( ( tab ) => tab.name );

export function PanelTabs( { activeTab, onSelect, children } ) {
	const initialTab = activeTab && tabNames.includes( activeTab )
		? activeTab
		: PANEL_TABS[ 0 ].name;

	return (
		<TabPanel
			className="hmpb-panel-tabs"
			activeClass="is-active"
			tabs={ PANEL_TABS }
			initialTabName={ initialTab }
			onSelect={ onSelect }
		>
			{ ( tab ) => children( tab ) }
		</TabPanel>
	);
}
