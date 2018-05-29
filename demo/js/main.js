/*global $, google*/
/* Loading Animation */
var $window = $(window),
		$nav = $('nav'),
		$filter = $('.simplefilter li'),
		$maxHeight = $('#home').height(),
		$response = $("#response_brought"),
		$loading = $('.loading'),
		$body = $('body'),
		$portfolio = $('#portfolio');

$window.on('load', function () {
    "use strict";
    $loading.fadeOut(500);
    $body.css({overflow: 'visible'});
});
/* End loading Animation */
/* doc ready */
$(function () {
	"use strict";	
	/* tooltip */
	$('[data-toggle="tooltip"]').tooltip();
	/* End tool tip */
	/* Smooth Scroll */
	$(document).on('click', 'a.smooth', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});
	/* End Smooth scroll */

	/* filter */
	$portfolio.imagesLoaded(function () {
		$('.filtr-container').filterizr();
		//Simple filter controls
		$filter.click(function () {
			$filter.removeClass('active');
			$(this).addClass('active');
		});
	/* End Filter */
	});
	/* Wow */
    new WOW().init();
    /* End WoW */
	
    /* nav toggle button */
    $('.nav-controller').on("click", function () {
        $nav.toggleClass('close');
    });
    /* nav toggle button */
	
	/* Nav color scroll */
    $window.on("scroll", function () {
        if ($window.scrollTop() >= $maxHeight) {
            $nav.addClass("scroll");
        } else {
            //remove the background property
            $nav.removeClass("scroll");
        }
    });
	/* End color Nav Scroll */
	
	/* Magnefic Popup */
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });
    /* End Magnefic Pop Up */
	
    /* Active Toggle */
    $window.on("scroll", function (event) {
        var $scrollPos = $(document).scrollTop(),
            $links = $('nav li a');
        $links.each(function () {
            var $currLink = $(this),
                $refElement = $($currLink.attr("href"));
            if ($refElement.position().top <= $scrollPos + 100 && $refElement.position().top + $refElement.height() > $scrollPos) {
                $links.removeClass("active").blur();
                $currLink.addClass("active");
            } else {
                $currLink.removeClass("active");
            }
        });
       /* close nav for mobile */
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$nav.addClass('close');
		}
		/* End */
    });
    /* End Active Toggle */
	
});
/* End doc ready */
 /* Map */
function initMap() {
    "use strict";
    var uluru = {lat: 40.730610, lng: -73.935242},
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: uluru,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
            scrollwheel: false,
            navigationControl: false,
            scaleControl: false,
            draggable: false
        }),
        marker = new google.maps.Marker({
            position: uluru,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
}
/* End Map */
/* Contact Form */
function submit_form() {
	"use strict";
//Variable declaration and assignment
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
		fullname = $("#fullname").val(),
		email = $("#email").val(),
		message = $("#message").val(),
		dataString = {'fullname': fullname, 'email': email,   'message': message, 'submitted': '1'};

	if (fullname === "") { //Validation against empty field for fullname
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your fullname in the required field to proceed. Thanks.</div>');
		$("#fullname").focus();
	} else if (email === "") { //Validation against empty field for email address
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your email address in the required email field to proceed. Thanks.</div>');
		$("#email").focus();
	} else if (reg.test(email) === false) { //Validation for working email address
		$("#response_brought").html('<br clear="all"><div class="form_info" align="left">Sorry, your email address is invalid. Please enter a valid email address to proceed. Thanks.</div>');
		$("#email").focus();
	} else if (message === "") { //Validation against empty field for email message
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your message in the required message field to proceed. Thanks.</div>');
		$("#message").focus();
	} else {
		//Show loading image
		$response.html('<br clear="all"><div align="left" style=" padding-top:6px; margin-left:100px; margin-top:15px;"><font style="font-family:Verdana, Geneva, sans-serif; font-size:12px; color:black;">Please wait</font> <img src="img/loading.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div>');

		$.post('contact_form.php', dataString,  function (response) {
		  //Check to see if the message is sent or not
			var response_brought = response.indexOf('Congrats');
			if (response_brought !== -1) {
				//Clear all form fields on success
				$(".contact-form").slideUp(500);


				//Display success message if the message is sent
				$response.html(response);


				//Remove the success message also after a while of displaying the message to the user
				setTimeout(function () {
					$response.html('');
				}, 10000);
			} else {
				//Display error message is the message is not sent
				$(".contact-form").slideUp(500);
				$response.html(response);
			}
		});
	}
}
/* End Contact Form */