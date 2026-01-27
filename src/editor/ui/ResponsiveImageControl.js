import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { pickResponsiveImage } from '../../shared/responsive';

const labels = {
	desktop: 'Desktop Image',
	tablet: 'Tablet Image',
	mobile: 'Mobile Image',
};

function getMediaValue( media ) {
	if ( ! media ) {
		return null;
	}

	return {
		id: media.id,
		url: media.url,
		alt: media.alt,
	};
}

function ImagePicker( { label, value, onChange } ) {
	return (
		<Flex direction="column" gap={ 2 } className="hmpb-image-picker">
			<FlexItem className="hmpb-image-picker__label">{ label }</FlexItem>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => onChange( getMediaValue( media ) ) }
					allowedTypes={ [ 'image' ] }
					value={ value?.id }
					render={ ( { open } ) => (
						<Button variant="secondary" onClick={ open }>
							{ value?.url ? 'Replace' : 'Select' }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</Flex>
	);
}

export function ResponsiveImageControl( { value = {}, onChange } ) {
	const { desktop = null, tablet = null, mobile = null } = value;
	const fallback = pickResponsiveImage( { desktop, tablet, mobile } );

	const updateValue = ( key, media ) => {
		onChange( { ...value, [ key ]: media } );
	};

	return (
		<Flex direction="column" gap={ 4 } className="hmpb-responsive-image">
			<ImagePicker
				label={ labels.desktop }
				value={ desktop }
				onChange={ ( media ) => updateValue( 'desktop', media ) }
			/>
			<ImagePicker
				label={ labels.tablet }
				value={ tablet }
				onChange={ ( media ) => updateValue( 'tablet', media ) }
			/>
			<ImagePicker
				label={ labels.mobile }
				value={ mobile }
				onChange={ ( media ) => updateValue( 'mobile', media ) }
			/>
			{ fallback?.url && (
				<FlexItem className="hmpb-responsive-image__fallback">
					<span>Fallback URL:</span> { fallback.url }
				</FlexItem>
			) }
		</Flex>
	);
}
