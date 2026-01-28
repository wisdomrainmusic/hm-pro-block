/*
 * HM Pro Blocks – Editor Script (no build step)
 *
 * Registers hm-pro/container.
 */
(function (wp) {
  if (!wp || !wp.blocks || !wp.blockEditor) return;

  var el = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var __ = wp.i18n.__;

  var registerBlockType = wp.blocks.registerBlockType;
  var createBlock = wp.blocks.createBlock;

  var blockEditor = wp.blockEditor;
  var useBlockProps = blockEditor.useBlockProps;
  var InnerBlocks = blockEditor.InnerBlocks;
  var InspectorControls = blockEditor.InspectorControls;

  var components = wp.components;
  var PanelBody = components.PanelBody;
  var ToggleControl = components.ToggleControl;
  var Button = components.Button;

  var data = wp.data;
  var useSelect = data.useSelect;
  var useDispatch = data.useDispatch;

  function buildColumnsTemplate(count) {
    var cols = [];
    for (var i = 0; i < count; i++) {
      cols.push(createBlock('core/column', {}, []));
    }
    return [createBlock('core/columns', {}, cols)];
  }

  function LayoutPicker(props) {
    return el(
      'div',
      { className: 'hm-container__picker' },
      el('div', { className: 'hm-container__picker-title' }, __('Container', 'hm-pro-blocks')),
      el(
        'div',
        { className: 'hm-container__picker-subtitle' },
        __('Select a container layout to start with.', 'hm-pro-blocks')
      ),
      el(
        'div',
        { className: 'hm-container__picker-buttons' },
        [1, 2, 3].map(function (n) {
          return el(
            Button,
            {
              key: 'layout-' + n,
              variant: 'secondary',
              onClick: function () {
                props.onPick(n);
              },
            },
            String(n)
          );
        })
      )
    );
  }

  registerBlockType('hm-pro/container', {
    edit: function (props) {
      var attributes = props.attributes || {};
      var clientId = props.clientId;

      var isFullWidth = !!attributes.isFullWidth;
      var columnCount = attributes.columnCount || 0;

      var blockProps = useBlockProps({
        className: ['hm-container', isFullWidth ? 'alignfull' : ''].filter(Boolean).join(' '),
      });

      var innerBlocks = useSelect(
        function (select) {
          return select('core/block-editor').getBlocks(clientId);
        },
        [clientId]
      );

      var dispatch = useDispatch('core/block-editor');

      function setLayout(count) {
        // 1) Persist choice
        props.setAttributes({ columnCount: count });

        // 2) Create nested core/columns with N columns
        var newBlocks = buildColumnsTemplate(count);
        dispatch.replaceInnerBlocks(clientId, newBlocks, false);

        // 3) Focus the newly created columns block
        if (newBlocks && newBlocks[0] && newBlocks[0].clientId) {
          dispatch.selectBlock(newBlocks[0].clientId);
        }
      }

      var showPicker = (!columnCount || !innerBlocks || innerBlocks.length === 0);

      return el(
        Fragment,
        null,
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: __('Layout', 'hm-pro-blocks'), initialOpen: true },
            el(ToggleControl, {
              label: __('Full Width', 'hm-pro-blocks'),
              checked: isFullWidth,
              onChange: function (value) {
                props.setAttributes({ isFullWidth: !!value });
              },
            })
          )
        ),
        el(
          'div',
          blockProps,
          showPicker
            ? el(LayoutPicker, { onPick: setLayout })
            : el(InnerBlocks, {
                renderAppender: InnerBlocks.ButtonBlockAppender,
              })
        )
      );
    },

    save: function (props) {
      var attrs = props.attributes || {};
      var isFullWidth = !!attrs.isFullWidth;

      var blockProps = wp.blockEditor.useBlockProps.save({
        className: ['hm-container', isFullWidth ? 'alignfull' : ''].filter(Boolean).join(' '),
      });

      return el('div', blockProps, el(InnerBlocks.Content, null));
    },
  });
})(window.wp);
