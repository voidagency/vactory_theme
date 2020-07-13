// //== Files
// //
// //## Apply custom skin to upload fields.
// (function ($, Drupal) {
//   "use strict";
//
//   Drupal.vactory.utility.filesUpload = function () {
//
//     $(document).ready(function () {
//       var managedFile = jQuery('.form-managed-file,
// .form-item.form-type-file'); var fileWrapper = jQuery('.skinned-file'); if
// (managedFile.length) { managedFile.each(function (index, el) {  // Move
// descriptions below input field. var descriptionField =
// $(el).next('.description'); if (descriptionField.length) {
// descriptionField.appendTo($(el).parent().parent());
// descriptionField.addClass('file-description'); }  // Add label text to input
// field. $(el).append('<span class="help-block">' + Drupal.t("Upload your
// file") + '</span>');  $(el).find('input[type="file"]').on('change', function
// (event) { var $this = $(this);  if ($this[0].files.length) {
// $this.closest('.form-item').find('label').text($this[0].files[0].name); $this.closest('.form-item').find('.error').remove(); } else { $this.closest('.form-item').find('label').text($this.closest('.form-item').attr('data-label')); $this.closest('.form-item').find('.error').detach().insertAfter($this.closest('.form-item .form-managed-file')); } }); $(el).closest('.form-item').attr('data-label', $(el).closest('.form-item').find('label').text()); }); } else if (fileWrapper.length) { fileWrapper.find('input[type="file"]').on('change', function (event) { var $that = $(this); if ($that[0].files.length) { fileWrapper.find('.help-block').text($that[0].files[0].name); } else { fileWrapper.find('.help-block').text(Drupal.t('No file chosen')); } }); } });  };  })(jQuery, Drupal);
