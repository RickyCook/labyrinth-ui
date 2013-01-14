/* -----------------------------------------------------------------------


 Labyrinth UI :: Common JavaScript
 https://github.com/RickyCook/panel-beater

   * Copyright (c) 2012-Present Ricky Cook.
   * Code by Ricky Cook <mail@thatpanda.com>

----------------------------------------------------------------------- */

var ThatPanda = {};

/**
 * Standard common utility functions used for a broad range of
 * applications and scripts.
 * 
 * @module ThatPanda.Common
 */
(function ($) {
	var
		c; // ThatPanda.Common not yet available
	/**
	 * @class Common
	 * @namespace ThatPanda
	 * @constructor
	 */
	ThatPanda.Common = function() {};
	c = ThatPanda.Common;
	$.extend(ThatPanda.Common, {
		/**
		 * Checks to see if a variable "contains a value". This means
		 * something that is both defined and not null, however the
		 * value can be zero or empty.
		 * 
		 * @method isValue
		 * @param val Value to test
		 * @return {Boolean}
		 */
		isValue: function (val) {
			switch ($.type(val)) {
				case 'undefined':
				case 'null':
					return false;
				default:
					return true;
			}
		},

		/**
		 * Makes sure that the return value "is a value" by substituting
		 * a default if the isValue test fails.
		 * 
		 * @method def
		 * @param val Value to test
		 * @param def Default if val is not a value
		 * @param do_eval Optional Evaluate def when def is a function
		 * (Default is true)
		 * @return val, def or def()
		 */
		def: function (val, def, do_eval) {
			if (!this.isValue(do_eval)) do_eval = true;

			if (this.isValue(val))
				return val;
			if (do_eval && $.type(def) === 'function')
				return def();
			return def;
		},

		/**
		 * If val is not an array, it is just returned. If val is an
		 * array with > 1 element, it is returned as is. If it is an
		 * array with exactly 1 element, the first element is returned.
		 * If there are no elements in the array, null is returned.
		 * 
		 * @method arrayFirstOrNull
		 * @param val Value to test
		 * @return See function description
		 */
		arrayFirstOrNull: function(val) {
			if (!($.type(val) === 'array'))
				return val;

			if (wrappers.length > 1)
				return val;
			if (wrappers.length === 1)
				return val[0];
			return null;
		}
	})

	/**
	 * @class Class
	 * @namespace ThatPanda.Common
	 * @constructor
	 */
	ThatPanda.Common.Class = function(config) {
		// Override elements if possible
		if (c.isValue(config) && c.isValue(config.elements))
			$.extend(this._ELEMENT_CACHE, config.elements);
	}
	$.extend(ThatPanda.Common.Class, {
		_IDS: {},
		_ELEMENT_CACHE: {},

		getElement: function(name) {
			return c.def(
				_ELEMENT_CACHE[name],
				function() { return $('#' + this._IDS[name]); }
			);
		}
	})
})(jQuery);

/**
 * Labyrinth UI specific functions and code.
 * @module ThatPanda.LabyrinthUI
 */
(function ($) {
	var
		c = ThatPanda.Common,
		pb;

	/**
	 * @class LabyrinthUI
	 * @namespace ThatPanda
	 * @constructor
	 */
	ThatPanda.LabyrinthUI = function(config) {
		$.proxy(ThatPanda.Common.Class, this, config)();
	}
	$.extend(ThatPanda.LabyrinthUI, ThatPanda.Common.Class, {
		_GRID_SIZE: 20,
		_IDS: $.merge(ThatPanda.Common.Class._IDS, {
		}),
	});

	$(document).ready(function() {
		pb = new ThatPanda.LabyrinthUI();
	});
})(jQuery);
