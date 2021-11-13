<?php
/**
 * Plugin Name: My Timeline
 */
 
function mytimeline_shortcode() {
 
 return '<div id="my-timeline-react" ></div>';
}
 
add_shortcode('my-timeline-react', 'mytimeline_shortcode');
 
function mytimeline_load_assets() {
 
 $react_app_js  = plugin_dir_url( __FILE__ ) . 'react/build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'react/build/static/css/all_in_one_file.css'; 
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time(); 
    wp_enqueue_script( 'my-timeline-react', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'my-timeline-react', $react_app_css, array(), $version );
}
 
add_action( 'wp_enqueue_scripts', 'mytimeline_load_assets' );

/**
 * Plugin Name: My Timeline
 */