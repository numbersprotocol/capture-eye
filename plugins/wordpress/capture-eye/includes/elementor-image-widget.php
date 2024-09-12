<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor Widget Capture Eye Image.
 *
 * Elementor widget that inserts an embbedable content into the page, from any given URL.
 *
 * @since 0.0.1
 */
class Elementor_Widget_Capture_Eye_Image extends \Elementor\Widget_Image {

	/**
	 * Get widget name.
	 *
	 * Retrieve image widget name.
	 *
	 * @since 0.0.1
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'capture_eye_image';
	}

	/**
	 * Get widget title.
	 *
	 * Retrieve image widget title.
	 *
	 * @since 0.0.1
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return esc_html__( 'Capture Eye Image', 'elementor-capture-eye-widget' );
	}

	/**
	 * Get widget keywords.
	 *
	 * Retrieve the list of keywords the oEmbed widget belongs to.
	 *
	 * @since 0.0.1
	 * @access public
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return [ 'capture', 'eye', 'image', 'photo', 'visual' ];
	}

	/**
	 * Get widget categories.
	 *
	 * Retrieve the list of categories the image widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * @since 0.0.1
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'capture-eye' ];
	}

	/**
	 * Register image widget controls.
	 *
	 * Adds different input fields to allow the user to change and customize the widget settings.
	 *
	 * @since 0.0.1
	 * @access protected
	 */
	protected function register_controls() {
		parent::register_controls();

		$this->start_controls_section(
			'section_capture_eye',
			[
				'label' => esc_html__( 'Capture Eye', 'elementor-capture-eye-widget' ),
			]
		);

		$this->add_control(
			'nid',
			[
				'label' => esc_html__( 'Nid', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => esc_html__( 'Enter your Nid', 'elementor-capture-eye-widget' ),
				'condition' => [
					'image[url]!' => '',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'capture_eye_layout',
			[
				'label' => esc_html__( 'Layout', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => [
					'original' => esc_html__( 'Original', 'elementor-capture-eye-widget' ),
					'curated' => esc_html__( 'Curated', 'elementor-capture-eye-widget' ),
				],
				'default' => 'original',
				'condition' => [
					'nid!' => '',
				],
			]
		);

		$this->add_control(
			'capture_eye_visibility',
			[
				'label' => esc_html__( 'Visibility', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => [
					'hover' => esc_html__( 'Hover', 'elementor-capture-eye-widget' ),
					'always' => esc_html__( 'Always', 'elementor-capture-eye-widget' ),
				],
				'default' => 'hover',
				'condition' => [
					'nid!' => '',
				],
			]
		);

		$this->add_control(
			'eng_img',
			[
				'label' => esc_html__( 'Engagement zone banner image', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::URL,
				'condition' => [
					'nid!' => '',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'eng_link',
			[
				'label' => esc_html__( 'Engagement zone banner link', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::URL,
				'condition' => [
					'nid!' => '',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'action_button_text',
			[
				'label' => esc_html__( 'Action button text', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '',
				'condition' => [
					'nid!' => '',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'action_button_link_source',
			[
				'label' => esc_html__( 'Action button link', 'elementor-capture-eye-widget' ),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => [
					'default' => esc_html__( 'Default', 'elementor-capture-eye-widget' ),
					'verify_asset_profile' => esc_html__( 'Verify asset profile', 'elementor-capture-eye-widget' ),
					'custom' => esc_html__( 'Custom', 'elementor-capture-eye-widget' ),
				],
				'default' => 'default',
				'condition' => [
					'nid!' => '',
				],
			]
		);

		$this->add_control(
			'action_button_link',
			[
				'type' => \Elementor\Controls_Manager::URL,
				'condition' => [
					'nid!' => '',
					'action_button_link_source' => 'custom',
				],
				'dynamic' => [
					'active' => true,
				],
				'show_label' => false,
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render image widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 0.0.1
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();

		if ( empty( $settings['image']['url'] ) ) {
			return;
		}

		$nid = $settings['nid'];
		?>

		<capture-eye
			nid="<?php echo $nid; ?>"
			layout="<?php echo $settings['capture_eye_layout']; ?>"
			visibility="<?php echo $settings['capture_eye_visibility']; ?>"
			<?php if ( $settings['eng_img']['url'] ) { ?>
				eng-img="<?php echo $settings['eng_img']['url']; ?>"
			<?php } ?>
			<?php if ( $settings['eng_link']['url'] ) { ?>
				eng-link="<?php echo $settings['eng_link']['url']; ?>"
			<?php } ?>
			<?php if ( $settings['action_button_text'] ) { ?>
				action-button-text="<?php echo $settings['action_button_text']; ?>"
			<?php } ?>
			<?php
			$action_url = '';
			if ( $settings['action_button_link_source'] === 'verify_asset_profile' ) {
				$action_url = "https://asset.captureapp.xyz/$nid";
			} elseif (
				$settings['action_button_link_source'] === 'custom' &&
				$settings['action_button_link']['url']
			) {
				$action_url = $settings['action_button_link']['url'];
			}
			if ( $action_url ) { ?>
				action-button-link="<?php echo $action_url; ?>"
			<?php } ?>
		>
		<?php parent::render(); ?>
		</capture-eye>
		<?php
	}

	/**
	 * Render image widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 0.0.1
	 * @access protected
	 */
	protected function content_template() {
		?>
		<# let skip = false;
		if ( settings.image.url ) {
			let image = {
				id: settings.image.id,
				url: settings.image.url,
				size: settings.image_size,
				dimension: settings.image_custom_dimension,
				model: view.getEditModel()
			};

			let image_url = elementor.imagesManager.getImageUrl( image );

			if ( ! image_url ) {
				skip = true;
				return;
			}

			const nid = settings.nid;
			#><capture-eye
				nid="{{ nid }}"
				layout="{{ settings.capture_eye_layout }}"
				visibility="{{ settings.capture_eye_visibility }}"
				<# if ( settings.eng_img.url ) {
					#> eng-img="{{ settings.eng_img.url }}"
				<# } #>
				<# if ( settings.eng_link.url ) {
					#> eng-link="{{ settings.eng_link.url }}"
				<# } #>
				<# if ( settings.action_button_text ) {
					#> action-button-text="{{ settings.action_button_text }}"
				<# }
				let action_url = '';
				if ( settings.action_button_link_source === 'verify_asset_profile' ) {
					action_url = `https://asset.captureapp.xyz/${nid}`;
				} else if (
					settings.action_button_link_source === 'custom' &&
					settings.action_button_link.url
				) {
					action_url = settings.action_button_link.url;
				}
				if ( settings.action_button_link.url ) {
					#> action-button-link="{{ action_url }}"
				<# } #>
			><#
		} #>
		<?php parent::content_template(); ?>
		<# if ( skip === false ) {
			#></capture-eye><#
		} #>
		<?php
	}
}
