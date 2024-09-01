$(document).ready(function() {
	// initialize Isotope
	var $grid = $('.grid').isotope({
			itemSelector: '.element-item',
			layoutMode: 'fitRows'
	});

	// filter items on button click
	$('.filter-button-group').on('click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
	});
});
