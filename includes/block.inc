<?php

/**
 * @file
 * Theme and preprocess functions for block.
 */

use Drupal\Core\Render\Element;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function vactory_theme_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Check for BlockContent.
  if ($variables['elements']['#base_plugin_id'] != 'block_content' || empty($variables['elements']['content']['#block_content'])) {
    return;
  }

  // Get the block bundle.
  $block_content = $variables['elements']['content']['#block_content'];
  $bundle = $block_content->bundle();

  // Add to theme suggestions.
  $suggestions[] = 'block__block_content__' . $bundle;
}

/**
 * Implements hook_preprocess_block().
 */
function vactory_theme_preprocess_block(&$variables) {
  // Add id to template.
  if (isset($variables['elements']['#id'])) {
    $variables['id'] = str_replace('_', '-', $variables['elements']['#id']);
  }

  // Alter System branding block.
  if ($variables['plugin_id'] === 'system_branding_block') {
    // Get default theme.
    $default_theme = \Drupal::config('system.theme')->get('default');
    // Get current theme to avoid the process on admin themes.
    $current_theme = \Drupal::service('theme.manager')->getActiveTheme()->getName();
    if ($current_theme == $default_theme) {
      $current_language = \Drupal::languageManager()->getCurrentLanguage();
      $default_language = \Drupal::languageManager()->getDefaultLanguage();
      if ($current_language->getId() !== $default_language->getId()) {
        // Get default site logo path.
        $logo_path = theme_get_setting('logo.url');
        $logo_path_info = pathinfo($logo_path);
        // Logo path for current language.
        $new_logo_path = $logo_path_info['dirname'] . '/' . $logo_path_info['filename'] . '-' . $current_language->getId() . '.' . $logo_path_info['extension'];
        if (file_exists(DRUPAL_ROOT . $new_logo_path)) {
          // Use current language Logo if exist.
          $variables['site_logo'] = $new_logo_path;
        }
      }
    }
  }

  // Check for BlockContent.
  if ($variables['elements']['#configuration']['provider'] != 'block_content' || empty($variables['elements']['content']['#block_content'])) {
    return;
  }

  // Get the block bundle.
  $block_content = $variables['elements']['content']['#block_content'];

  // Add bundle to template.
  $variables['bundle'] = $block_content->bundle();
}

/**
 * Implements template_preprocess_block_content().
 */
function vactory_theme_preprocess_block_content(&$variables) {
  // Helpful $content variable for templates.
  $variables += ['content' => []];
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
