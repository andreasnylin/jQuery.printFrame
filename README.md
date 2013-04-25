jQuery.printFrame
=================

Plugin for printing content from a web page without leaving the page.
Uses an iframe to load the content that should be printed and prints the frame.

- Basic usage:
	Asume that you are on page a.html and you have a button that should print 
	page b.html without leaving a.html. By default the href attribute of the 
	element will be used to load the content. 

	````<a id="my-element" href="b.html">Print Page B</a>````

	Alternatively you can use a "data-print-url" attribute to specify the content url.

	````<button id="my-element" data-print-url="b.html">Print Page B</button>````

	Enable the plugin like this:

	````
	<script>
		jQuery('#my-element').printFrame();
	</script>
	````

- Options: 

	- urlAttributes: 	Key value object that will be passed along to the target page.

	Example usage: This would add querystring "a=1&hideUI=true" to the url loaded in the frame.

		<script>
			jQuery('#print-button').printFrame({
				urlAttributes: { a: 1, hideUI: true }
			});
		</script>

	- frameId:			The id of the frame element
