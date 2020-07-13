<?php
/**
 * @file
 * Theme and preprocess functions for pages
 */

use Drupal\node\NodeInterface;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 * @param array $variables
 */
function vactory_theme_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  if ($node = \Drupal::routeMatch()
    ->getParameter('node')) {

    $route = \Drupal::routeMatch()->getRouteObject();
    $is_admin = \Drupal::service('router.admin_context')->isAdminRoute($route);

    if ($node instanceof NodeInterface && !$is_admin) {
      $suggestions[] = 'page__' . $node->bundle();
    }
  }
}
