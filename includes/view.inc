<?php
/**
 * @file
 * Theme and preprocess functions for views.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function vactory_theme_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  // Add a suggestion based on the view name and the current display.
  $view = $variables['view'];
  $name = $view->id();
  $display = $view->current_display;
  $suggestions[] = 'views_view__' . $name;
  $suggestions[] = 'views_view__' . $name . '__' . $display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function vactory_theme_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  // Add a suggestion based on the view name and the current display.
  $view = $variables['view'];
  $name = $view->id();
  $display = $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $name . '__' . $display;
}

/**
 * Implements template_preprocess_views_view_table().
 */
function vactory_theme_preprocess_views_view_table(&$variables) {
  if (!isset($variables['classes_array'])) {
    $variables['classes_array'] = [];
  }
  // Add Bootstrap table classes.
  $variables['classes_array'] = array_merge($variables['classes_array'], [
    'table',
    'table-striped',
    'table-bordered',
  ]);
}
