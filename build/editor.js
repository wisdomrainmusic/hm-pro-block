(function (wp) {
	const { registerBlockType, registerBlockVariation } = wp.blocks;
	const { __ } = wp.i18n;
	const { Fragment } = wp.element;
	const { InspectorControls, InnerBlocks } = wp.blockEditor;
	const { PanelBody, ToggleControl, RangeControl } = wp.components;
	const { useSelect, useDispatch } = wp.data;

	registerBlockType('hm-pro/container', {
		edit: (props) => {
			const { attributes, setAttributes } = props;
			const { clientId } = props;
			const { isFullWidth, padding } = attributes;

			// Detect if container is empty (no inner blocks yet)
			const hasInnerBlocks = useSelect((select) => {
				const block = select('core/block-editor').getBlock(clientId);
				return !!(block && block.innerBlocks && block.innerBlocks.length);
			}, [clientId]);

			const { replaceInnerBlocks } = useDispatch('core/block-editor');

			// Templates for columns
			const tpl1 = [
				wp.blocks.createBlock('core/columns', {}, [
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Write…', 'hm-pro-blocks') })
					])
				])
			];
			const tpl2 = [
				wp.blocks.createBlock('core/columns', {}, [
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Left…', 'hm-pro-blocks') })
					]),
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Right…', 'hm-pro-blocks') })
					])
				])
			];
			const tpl3 = [
				wp.blocks.createBlock('core/columns', {}, [
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Col 1…', 'hm-pro-blocks') })
					]),
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Col 2…', 'hm-pro-blocks') })
					]),
					wp.blocks.createBlock('core/column', {}, [
						wp.blocks.createBlock('core/paragraph', { placeholder: __('Col 3…', 'hm-pro-blocks') })
					])
				])
			];

			const insertLayout = (n) => {
				const blocks = n === 1 ? tpl1 : (n === 2 ? tpl2 : tpl3);
				replaceInnerBlocks(clientId, blocks, true);
			};

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
						// If empty: show Spectra-like layout chooser
						!hasInnerBlocks
							? wp.element.createElement('div', { className: 'hmpb-layout-picker' },
								wp.element.createElement('div', { className: 'hmpb-layout-picker__title' }, __('Container', 'hm-pro-blocks')),
								wp.element.createElement('div', { className: 'hmpb-layout-picker__sub' }, __('Select a container layout to start with.', 'hm-pro-blocks')),
								wp.element.createElement('div', { className: 'hmpb-layout-picker__grid' },
									wp.element.createElement('button', { type: 'button', className: 'hmpb-layout-btn', onClick: () => insertLayout(1) }, '1'),
									wp.element.createElement('button', { type: 'button', className: 'hmpb-layout-btn', onClick: () => insertLayout(2) }, '2'),
									wp.element.createElement('button', { type: 'button', className: 'hmpb-layout-btn', onClick: () => insertLayout(3) }, '3')
								)
							)
							: wp.element.createElement(InnerBlocks, { placeholder: __('Drop blocks here…', 'hm-pro-blocks') })
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
