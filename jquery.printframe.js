/* 
	jQuery Print Frame Plugin version 1.1
	Created by Andreas Nylin
	andreas.nylin@gmail.com / @andreasnylin / http://andreasnylin.com
	-------------------------------------------------
	
	Plugin for printing content from a web page without leaving the page.
	Uses an iframe to load the content that should be printed and prints the frame.

	+ Basic usage:
		Asume that you are on page a.html and you have a button that should print 
		page b.html without leaving a.html. By default the href attribute of the 
		element will be used to load the content. 

		<a id="my-element" href="b.html">Print Page B</a>

		Alternatively you can use a "data-print-url" attribute to specify the content url.

		<button id="my-element" data-print-url="b.html">Print Page B</button>

		Enable the plugin like this:

		<script>
			jQuery('#my-element').printFrame();
		</script>

	+ Options: 

		+ urlAttributes: 	Key value object that will be passed along to the target page.

		Example usage: This would add querystring "a=1&hideUI=true" to the url loaded in the frame.

			<script>
				jQuery('#print-button').printFrame({
					urlAttributes: { a: 1, hideUI: true }
				});
			</script>

		+ frameId:			The id of the frame element

*/
(function ($) {

	$.fn.printFrame = function (options) {
		var opts = $.extend({}, $.fn.printFrame.defaults, options),
			printingDataKey = 'printing',
			initialized = false,
			$printFrame;

		function init() {
			var $this = $(this);

			$printFrame = $('#' + opts.frameId);

			if ($this.data(printingDataKey) || $this.data('hasPrintFrame')) {
				return false;
			}

			if (!$printFrame.length) {
				$printFrame = $('<iframe>', {
					id: opts.frameId,
					css: {
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '1px',
						height: '1px'
					}
				});

				$('body').append($printFrame);
			}

			$printFrame.load(printFrameHandler);

			$this.data('hasPrintFrame', true);
			initialized = true;
		}

		function printClickHandler(e) {
			e.preventDefault();

			var $this = $(this),
				printUrl = $this.attr('data-print-url') || $this.attr('href'),
				separator = printUrl.indexOf('?') === -1 ? '?' : '&';

			if (!initialized) {
				init();
			}

			$printFrame.attr('src', printUrl + separator + $.param(opts.urlAttributes));

			$this.data(printingDataKey, true);

			setTimeout(function () { $this.data(printingDataKey, false); }, opts.delay);
		}

		function printFrameHandler() {
			var contentWindow = $printFrame.get(0).contentWindow;

			contentWindow.focus();
			contentWindow.print();
		}

		return this.each(function () {
			var $this = $(this);

			if(!$this.data('hasPrintFrame')) {
				$this.click(printClickHandler);
			}
		});
	};

	$.fn.printFrame.defaults = {
		delay: 5000, // makes sure we print only once when button is clicked multiple times
		urlAttributes: { print: true },
		frameId: 'printframe'
	};

})(jQuery);