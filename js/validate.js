/*global alert, console, $, _gaq */

/**
 * Definition of the Validate object which controlls all functionality
 * related to client-side form validation.  Validation methods include
 * names, email addresses, phone numbers, non-empty fields, numbers,
 * canadian postal codes, and empty fields (captcha).
 *
 * @version 1.0
 *
 * @require jquery.js
 */
var Validate = {

	/**
	 * Initialization Function - Let's Get Everything Started!
	 *
	 * @since: Validate 1.0
	 */
	init: function() {

		// Do Nothing

	},

	/**
	 * Function to remove previously displayed error messages on
	 * a specified form element.
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element selector
	 */
	removeErrorMessage: function(el) {

		el.parent().find('.error-message').remove();

	},

	/**
	 * Function to display error messages on a specified form
	 * element if not valid.  (A <span> element is appended to
	 * the <label> of the input field being validated assuming
	 * both the form field and label and siblings under the
	 * same node element.)
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element selector
	 * @param: error message (string)
	 */
	displayErrorMessage: function(el, message) {

		if(message) {
			el.parent().find('label:first-child').append(' <span class="error-message">' + message + '</span>');
		}

	},

	/**
	 * Validate Name
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	name: function(el) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'name',
			format = /^[A-Za-z .'\-]+$/,
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Required field';
		} else if(value === placeholder) {
			error = 'Invalid name';
		} else if(!value.match(format)) {
			error = 'Invalid characters';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Email Address
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	email: function(el) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'email',
			format = /^[A-Za-z0-9._%\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/,
			error = '';
			
		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Required field';
		} else if(value === placeholder) {
			error = 'Invalid Email Address';
		} else if(!value.match(format)) {
			error = 'Invalid Email Address';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Phone Number
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	phone: function(el) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'phone',
			format = /^((((\(\d{3}\))|(\d{3}-))\d{3}-\d{4})|(\+?\d{2}((-| )\d{1,8}){1,5}))(( x| ext)\d{1,5}){0,1}$/,
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Required field';
		} else if(value === placeholder) {
			error = 'Invalid phone number';
		} else if(!value.match(format)) {
			error = 'Invalid phone format: 000-000-0000';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Required Field (not empty)
	 *
	 * @since: Validate 1.0
	 *
	 * @param form element to validate
	 * @param number of required characters (optional, default = 2)
	 * @return: error message
	 */
	required: function(el, charCount) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'null',
			format = (charCount) ? charCount : '2',
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Required field';
		} else if(value === placeholder) {
			error = 'Invalid input value';
		} else if(value.length < format) {
			error = 'Invalid length';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Number / Zip Code
	 *
	 * @since Validate 1.0
	 *
	 * @param: form element to validate
	 * @param: number of allowed characters (optional)
	 * @param: toggle between zipcode specific messaging or generic numbers (optional: true/false)
	 * @return: error message
	 */
	number: function(el, charCount, zipcode) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'Zipcode',
			format = /^[0-9]/,
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = (zipcode) ? 'Zipcode required' : 'Required field';
		} else if(value === placeholder) {
			error = (zipcode) ? 'Invalid zipcode' : 'Invalid number';
		} else if(!value.match(format)) {
			error = (zipcode) ? 'Invalid zipcode' : 'Invalid characters';
		} else {
			if(charCount) {
				if(value.length > charCount) {
					error = 'Invalid length: only ' + charCount.toString() + ' characters';
				} else if(value.length < charCount) {
					error = 'Invalid length: ' + charCount.toString() + ' characters required';
				}
			}
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Canadian Postal Code
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	postalCode: function(el) {

		// Define variables
		var value = el.val(),
			placeholder = (el.attr('placeholder')) ? el.attr('placeholder') : 'Postal Code',
			format = /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/,
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Postal code required';
		} else if(value === placeholder) {
			error = 'Invalid postal code';
		} else if(!value.match(format)) {
			error = 'Invalid postal code';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Dropdown Menus
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	dropdown: function(el) {

		// Define variables
		var value = el.find(':selected').val(),
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(!value) {
			error = 'Please select an option';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	},

	/**
	 * Validate Captcha
	 *
	 * @since: Validate 1.0
	 *
	 * @param: form element to validate
	 * @return: error message
	 */
	captcha: function(el) {

		// Define variables
		var value = el.val(),
			error = '';

		// Remove previous error message
		Validate.removeErrorMessage(el);

		// Set error message if invalid
		if(value) {
			error = 'Invalid - Leave empty';
		}

		// Display and return error message if invalid
		Validate.displayErrorMessage(el, error);
		return error;

	}

// END - Validate object
};

(function($) {
	Validate.init();
})(jQuery);