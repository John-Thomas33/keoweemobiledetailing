/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});
	
	document.addEventListener("DOMContentLoaded", function() {
    // Show the pop-up when the page loads
    setTimeout(() => {
        document.getElementById("discountModal").style.display = "flex";
    }, 1000); // Delay pop-up by 1 second

    // Close button functionality
    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("discountModal").style.display = "none";
    });

    // Handle form submission
    document.getElementById("discountForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent page reload

        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            alert("Thank you! Your discount code will be sent to your email.");
            document.getElementById("discountModal").style.display = "none";
            this.reset();
        } else {
            alert("Oops! Something went wrong. Please try again.");
        }
    });
});

$(document).ready(function() {
    let testimonials = $(".testimonial");
    let index = 0;

    function showTestimonial() {
        testimonials.hide();
        $(testimonials[index]).fadeIn();
        index = (index + 1) % testimonials.length;
    }

    showTestimonial(); // Show first testimonial
    setInterval(showTestimonial, 10000); // Change every 4 seconds
});

$(document).ready(function() {
    let scrollableSection = $(".scrollable-details");

    function autoScroll() {
        let maxScroll = scrollableSection[0].scrollHeight - scrollableSection.height();
        let currentScroll = scrollableSection.scrollTop();

        if (currentScroll >= maxScroll) {
            scrollableSection.animate({ scrollTop: 0 }, 1000); // Reset to top
        } else {
            scrollableSection.animate({ scrollTop: currentScroll + 200 }, 1000);
        }
    }
});
	
})(jQuery);
