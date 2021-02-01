<?php

/**
 * @file
 * Theme and preprocess functions for forms.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vactory_theme_form_search_block_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Add the navbar-form class.
  $form['#attributes']['class'][] = 'navbar-form';

  // Update the placeholder and size of field.
  $form['keys']['#title'] = '';
  $form['keys']['#size'] = 20;
  $form['keys']['#placeholder'] = t('Search');
}

/**
 * Implements hook_preprocess_input().
 */
function vactory_theme_preprocess_input(&$variables) {
  $element = $variables['element'];
  // Add the element type to the theme.
  $variables['type'] = $element['#type'];
}

/**
 * Implements template_preprocess_container().
 */
function vactory_theme_preprocess_container(&$variables) {
  // Add the element inline state to the theme.
  $variables['is_inline'] = isset($variables['element']['#is_inline']) ? TRUE : FALSE;
}

/**
 * Implements template_preprocess_form_element().
 */
function vactory_theme_preprocess_form_element(&$variables) {
  // Add the element inline state to the theme.
  $variables['is_inline'] = isset($variables['element']['#is_inline']) ? TRUE : FALSE;

  /*if (isset($variables['element']['#is_inline'])) {
  $variables['title_display'] = 'invisible';
  }*/

  // Add class to indecate if the label display mode is inline.
  /*if (isset($variables['element']['#_title_display'])) {
  $variables['_title_display'] = 'label-inline';
  }*/

  if (isset($variables['element']['#_title_display'])) {
    $variables['label_display'] = $variables['element']['#_title_display'];
  }
  else {
    $variables['label_display'] = $variables['element']['#title_display'];
  }

  /*$variables['label_display'] = isset($variables['element']['#_title_display']) ? $variables['element']['#_title_display'] : '';*/

  // Code commented to keep bootstrap standard.
  // Render the form element inside the label for checkbox and radio.
  /*if (in_array($variables['element']['#type'], ['checkbox', 'radio'])) {
  $variables['label']['#children'] = $variables['children'];
  unset($variables['children']);
  }*/
  // Use description field to get radio input type classes in webforms.
  if ($variables['type'] == 'radio' && isset($variables['description'])) {
    $descrition = $variables['element']['#description'];
    $descrition = $descrition instanceof Markup ? $descrition->__toString() : $descrition;
    if (strpos($descrition, "class:") === 0) {
      $classes = explode(' ', $descrition);
      unset($classes[0]);
      $variables['attributes']['class'] = isset($variables['attributes']['class']) ? $variables['attributes']['class'] : [];
      $variables['attributes']['class'] = array_merge($variables['attributes']['class'], $classes);
      unset($variables['element']['#description']);
      unset($variables['description']);
    }
  }
  // Use to hide labels from the BEF views.
  if (isset($variables['element']['#context'])) {
    $plugin_type = $variables['element']['#context']['#plugin_type'];
    if ($plugin_type == 'bef') {
      if (isset($variables['label']['#title'])) {
        $variables['label']['#title'] = '';
      }
    }
  }

}

/**
 * Implements hook_preprocess_HOOK().
 */
function vactory_theme_preprocess_form_element_label(&$variables) {
  $variables['label_display'] = isset($variables['element']['#_title_display']) ? $variables['element']['#_title_display'] : '';
}

/**
 * Implements hook_theme_suggestions_HOOK().
 */
function vactory_theme_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'form__' . $variables['element']['#form_id'];

  if (!empty($variables['element']['#theme'])) {
    $suggestions[] = 'form__' . $variables['element']['#theme'][0];
  }

  if (!empty($variables['element']['#custom_theme'])) {
    $suggestions[] = 'form__' . $variables['element']['#custom_theme'][0];
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vactory_theme_form_views_exposed_form_alter(&$form, FormStateInterface $form_state, $form_id) {

  foreach ($form as $key => $form_element) {
    if (
      substr($key, 0, 1) != '#' &&
      isset($form_element['#type']) &&
      $form_element['#type'] != 'hidden'
    ) {
      $form[$key]['#is_inline'] = TRUE;
      $form[$key]['#hide_label'] = TRUE;
    }
  }

  if (isset($form['sort_bef_combine'])) {
    $form['sort_bef_combine']['#title'] = '';
  }

  $form['actions']['reset']['#attributes']['class'][] = 'btn-secondary btn-reset';
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vactory_theme_form_comment_comment_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  $form['comment_body']['widget']['#after_build'][] = '_remove_textformat_help';
  $form['actions']['submit']['#value'] = t('Envoyer');
  unset($form['actions']['preview']);

  // Set placeholder to comment form elements.
  $form['author']['name']['#attributes'] = [
    'placeholder' => t('Votre nom'),
  ];
  $form['subject']['widget'][0]['value']['#attributes'] = [
    'placeholder' => t('Objet'),
  ];
  $form['comment_body']['widget'][0]['#attributes'] = [
    'placeholder' => t('Laissez un commentaire'),
  ];
}

/**
 * Function to remove text format field description.
 */
function _remove_textformat_help($form_element, FormStateInterface $form_state) {
  if (isset($form_element[0]['format'])) {
    unset($form_element[0]['format']['guidelines']);
    unset($form_element[0]['format']['help']);
    unset($form_element[0]['format']['#type']);
    unset($form_element[0]['format']['#theme_wrappers']);
    $form_element[0]['format']['format']['#access'] = FALSE;
  }

  return $form_element;
}
