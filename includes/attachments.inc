<?php

/**
 * @file
 * Theme and preprocess functions for attachments.
 */

/**
 * Implements hook_page_attachments_alter().
 */
function vactory_theme_page_attachments_alter(array &$page) {
  $meta_override = [
    // https://getbootstrap.com/docs/4.0/getting-started/introduction/#responsive-meta-tag
    'viewport' => [
      '#tag' => 'meta',
      '#attributes' => [
        'name' => 'viewport',
        'content' => 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
      ],
    ],
  ];
  foreach ($meta_override as $key => $value) {
    $page['#attached']['html_head'][] = [$value, $key];
  }
}
