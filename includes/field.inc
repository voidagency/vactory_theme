<?php

/**
 * @file
 * Theme and preprocess functions for fields.
 */

/**
 * Implements hook_preprocess_field().
 */
function vactory_theme_preprocess_field(&$variables) {
  $element = $variables['element'];
  $field_name = $element['#field_name'];
  $bundle = $element['#bundle'];

  // Add bundle to template.
  $variables['bundle'] = $bundle;

  // Add a clean field name without the field_BUNDLE_ prefix.
  $safe_field_name_prefix = 'field_' . $bundle . '_';
  $variables['field_name_clean'] = str_replace($safe_field_name_prefix, '', $field_name);
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function vactory_theme_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];

  if (isset($element['#vactory_no_wrapper'])) {
    $suggestions[] = 'field__no_wrapper';
  }
}
