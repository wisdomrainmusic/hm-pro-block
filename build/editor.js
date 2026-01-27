(function (wp) {
	const { registerBlockType, registerBlockVariation } = wp.blocks;
	const { __ } = wp.i18n;
	const { Fragment } = wp.element;
	const { InspectorControls, InnerBlocks } = wp.blockEditor;
	const { PanelBody, ToggleControl, RangeControl } = wp.components;

	registerBlockType('hm-pro/container', {
		edit: (props) => {
			const { attributes, setAttributes } = props;
			const { isFullWidth, padding } = attributes;

			return (
				wp.element.createElement(Fragment, {},
					wp.element.createElement(InspectorControls, {},
						wp.element.createElement(PanelBody, { title: __('Layout', 'hm-pro-blocks'), initialOpen: true },
							wp.element.createElement(ToggleControl, {
								label: __('Full Width', 'hm-pro-blocks'),
								checked: !!isFullWidth,
								onChange: (v) => setAttributes({ isFullWidth: !!v })
							}),
							wp.element.createElement(RangeControl, {
								label: __('Padding (Top)', 'hm-pro-blocks'),
								value: padding?.top ?? 0,
								min: 0,
								max: 120,
								onChange: (v) => setAttributes({ padding: { ...padding, top: v } })
							}),
							wp.element.createElement(RangeControl, {
								label: __('Padding (Right)', 'hm-pro-blocks'),
								value: padding?.right ?? 0,
								min: 0,
								max: 120,
								onChange: (v) => setAttributes({ padding: { ...padding, right: v } })
							}),
							wp.element.createElement(RangeControl, {
								label: __('Padding (Bottom)', 'hm-pro-blocks'),
								value: padding?.bottom ?? 0,
								min: 0,
								max: 120,
								onChange: (v) => setAttributes({ padding: { ...padding, bottom: v } })
							}),
							wp.element.createElement(RangeControl, {
								label: __('Padding (Left)', 'hm-pro-blocks'),
								value: padding?.left ?? 0,
								min: 0,
								max: 120,
								onChange: (v) => setAttributes({ padding: { ...padding, left: v } })
							})
						)
					),
					wp.element.createElement('div', {
						className: `hmpb-container ${isFullWidth ? 'is-fullwidth' : ''}`,
						style: {
							paddingTop: (padding?.top ?? 0) + 'px',
							paddingRight: (padding?.right ?? 0) + 'px',
							paddingBottom: (padding?.bottom ?? 0) + 'px',
							paddingLeft: (padding?.left ?? 0) + 'px'
						}
					},
						wp.element.createElement(InnerBlocks, {
							placeholder: __('Drop blocks here…', 'hm-pro-blocks')
						})
					)
				)
			);
		},
		save: () => {
			return wp.element.createElement('div', {},
				wp.element.createElement(InnerBlocks.Content, {})
			);
		}
	});

	// --- Variations (Spectra container starter layouts) ---
	const COL_TPL_1 = [
		['core/columns', {}, [
			['core/column', {}, []]
		]]
	];

	const COL_TPL_2 = [
		['core/columns', {}, [
			['core/column', {}, []],
			['core/column', {}, []]
		]]
	];

	const COL_TPL_3 = [
		['core/columns', {}, [
			['core/column', {}, []],
			['core/column', {}, []],
			['core/column', {}, []]
		]]
	];

	registerBlockVariation('hm-pro/container', {
		name: 'hm-1col',
		title: '1 Column',
		description: 'Start with a single column layout.',
		attributes: { isFullWidth: false },
		innerBlocks: COL_TPL_1,
		scope: ['inserter']
	});

	registerBlockVariation('hm-pro/container', {
		name: 'hm-2col',
		title: '2 Columns',
		description: 'Start with a two column layout.',
		attributes: { isFullWidth: false },
		innerBlocks: COL_TPL_2,
		scope: ['inserter']
	});

	registerBlockVariation('hm-pro/container', {
		name: 'hm-3col',
		title: '3 Columns',
		description: 'Start with a three column layout.',
		attributes: { isFullWidth: false },
		innerBlocks: COL_TPL_3,
		scope: ['inserter']
	});
})(window.wp);
