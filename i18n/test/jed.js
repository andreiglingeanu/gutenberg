import { resetLocaleData, setLocaleData, __, getI18n } from '../index';

describe( 'wp.i18n', () => {
	describe( '.setLocaleData', () => {
		it('should set locale data', () => {
			resetLocaleData();

			setLocaleData({
				domain: 'gutenberg',
				locale_data: {
					gutenberg: {
						"": {
							domain: 'gutenberg',
							lang: 'ro_RO'
						},
						Demo: ["Demonstrație"],
						['Gutenberg Team']: ["Echipa Gutenberg"]
					}
				}
			});

			expect( __('Demo') ).toBe( 'Demonstrație' );
			expect( __('Gutenberg Team') ).toBe( 'Echipa Gutenberg' );
		});

		it('should preserve local data between multiple .setLocaleData calls', () => {
			resetLocaleData();

			setLocaleData({
				domain: 'gutenberg',
				locale_data: {
					gutenberg: {
						"": {
							domain: 'gutenberg',
							lang: 'ro_RO'
						},
						Demo: ["Demonstrație"]
					}
				}
			});

			setLocaleData({
				...getI18n().options,
				locale_data: {
					gutenberg: {
						...getI18n().options.locale_data.gutenberg,
						['Gutenberg Team']: ["Echipa Gutenberg"]
					}
				}
			});

			expect( __('Gutenberg Team') ).toBe( 'Echipa Gutenberg' );
		} );
	} );
} );
