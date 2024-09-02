<?php
/**
 * Plugin Name: Capture Eye
 * Description: Capture Eye WordPress plugin.
 * Version:     0.0.1
 * Author:      Numbers Protocol
 * Author URI:  https://www.numbersprotocol.io/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register scripts for the widget.
 *
 * Include Capture Eye script and register it.
 *
 * @since 0.0.1
 * @return void
 */
/**
 * Register scripts for Elementor widgets.
 */
function capture_eye_script_dependencies() {
	wp_register_script(
		'script-capture-eye',
		'https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye@latest/dist/capture-eye.bundled.js',
		[],
		'0.0.1',
	);
	wp_enqueue_script( 'script-capture-eye' );
	add_filter( 'script_loader_tag', function($tag, $handle, $src) {
		if ('script-capture-eye' === $handle) {
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		}
		return $tag;
	}, 10, 3 );
}
add_action( 'wp_enqueue_scripts', 'capture_eye_script_dependencies' );

/**
 * Register Capture Eye widget.
 *
 * Include widget file and register widget class.
 *
 * @since 0.0.1
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 * @return void
 */
function capture_eye_register_elementor_widget( $widgets_manager ) {

	require_once( __DIR__ . '/includes/elementor-image-widget.php' );

	$widgets_manager->register( new \Elementor_Widget_Capture_Eye_Image() );

}
add_action( 'elementor/widgets/register', 'capture_eye_register_elementor_widget' );

/**
 * Add Elementor widget categories.
 *
 * Include widget file and register widget class.
 *
 * @since 0.0.1
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 * @return void
 */
function add_elementor_widget_categories( $elements_manager ) {
	$elements_manager->add_category(
		'capture-eye',
		[
			'title' => esc_html__( 'Capture Eye', 'textdomain' ),
			'icon' => 'fa fa-eye',
		]
	);
}
add_action( 'elementor/elements/categories_registered', 'add_elementor_widget_categories' );
