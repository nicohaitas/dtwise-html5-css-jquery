// Hide Top Browser Menu on iPhone with iOS 6.x or older
(function( win ){
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){

		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );











$(document).ready(function() {
	// Add to Home Screen for Mobile
	var _ath = addToHomescreen;
	// This is the special custom message for stock android, it has to be customized to your needs
	var athMessages = {
		samsungAndroid: 'Custom message for Samsung Android. Click the menu hardware button and blah blah blah. This is an icon if needed: %icon',
		stockAndroid: 'Custom message for stock Android. Click the menu hardware button and blah blah blah. This is an icon if needed: %icon'
	};
	// Add stock browser compatibility
	var _ua = window.navigator.userAgent;
	
	_ath.isAndroidBrowser = _ua.indexOf('Android') > -1 && !(/Chrome\/[.0-9]*/).test(_ua);
	_ath.isCompatible = _ath.isCompatible || _ath.isAndroidBrowser;
	if ( _ath.OS == 'unsupported' && _ath.isAndroidBrowser ) {
		// additionally we check for some Samsung devices (not strictly needed)
		_ath.OS = (/ (GT-I9|GT-P7|SM-T2|GT-P5|GT-P3|SCH-I8)/).test(_ua) ? 'samsungAndroid' : 'stockAndroid';
	}
	_ath({
		message: _ath.OS in athMessages ? athMessages[_ath.OS] : '',
		// the followings are just for debug, customize the options to your needs
		skipFirstVisit: false,
		displayPace: false
	});
	// Measure Client Logo and subtract it's height from the total height and convert to a top margin
	var clientLogo = $('.client-logo img');
	var headerNav = $('.header-container-inner nav');
	$('.left-mainnav, .right-mainnav').css('margin-top', (clientLogo.height() * 1 - headerNav.height()) + 'px');
	// Make the left Tabs Area with the Graphs height = right Properties List Container height
	var mainContentLeftTabs = $('.properties-dashboard-container .tabs');
	$('.properties-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 28);
	// Make the left Tabs Area with the Graphs height = right Billing List Container height
	var mainContentLeftTabs2 = $('.properties-dashboard-container .tabs');
	$('.billing-list-outer-container').css('height', (mainContentLeftTabs2.height() * 1));
	// Make the left Tabs Area with the Graphs height = right Billing History Container height
	var mainContentLeftTabs3 = $('.single-property-dashboard-billing-left .tabs');
	$('.single-property-dashboard-billing-right .properties-list-outer-container').css('height', (mainContentLeftTabs3.height() * 1) - 104);
	// Make the properties list search results only, scrollable
	$('.properties-list-search-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 120);
	// Adds the class to create the dropdown tab
	$('.icon-arrow-down').parent().parent().parent().addClass('dropdown-active');
	// Mobile Outer Tabs content
	$('.mobile-outer-tabs .mobile-outer-tab-links h5 a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.mobile-outer-tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('mobile-outer-active').siblings().removeClass('mobile-outer-active');
		//Prevent Properties list from collapsing on resize of screen
		$('.mobile-outer-tab .properties-list-outer-container').css({ minHeight:399 });
		// Make the doughnut the same width as the height of the chart to the left
		var singlePropertyGraphHeight = $('.current').parent().find('.single-property-graph-control-left');
		$('.single-property-graph-control-right .single-property-content-inner .doughnut-outer-chart').css('width', (singlePropertyGraphHeight.height() * 1) - 28);
		updateWindow();
		e.preventDefault();
	});
	// Tabs
	$('.tabs .tab-links h5 a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('active').siblings().removeClass('active');
		updateWindow();
	$('.properties-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 28);
		e.preventDefault();
	});
	// Electricity Sub Navigation Tabs
	$('.electricity-sub-navigation-tab-links h5 a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('active').siblings().removeClass('active');
		updateWindow();
		e.preventDefault();
	});
	// Interim Tabs in tabbed content
	$('.interim-inner-tabs .interim-tab-links h5 a').on('click', function(e)  {
		$('.interim-tab-in-tab').removeAttr("style");
		$('.interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
		});
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.interim-inner-tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('interim-active').siblings().removeClass('interim-active');
		updateDonut();
		e.preventDefault();
	});
	// Billing Interim Tabs in tabbed content
	$('.billing-interim-inner-tabs .billing-interim-tab-links h5 a').on('click', function(e)  {
		$('.billing-interim-tab-in-tab').removeAttr("style");
		$('.billing-interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("billing-interim-active");
		});
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.billing-interim-inner-tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('billing-interim-active').siblings().removeClass('billing-interim-active');
		updateDonut();
		e.preventDefault();
	});
	// Mobile Tabs in tabbed content
	$('.mobile-inner-tabs .mobile-tab-links h5 a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		// Show/Hide Tabs. To speed up or slow down the animation of the panels edit the following .fadeIn(400)
		$('.mobile-inner-tabs ' + currentAttrValue).fadeIn(800).siblings().hide();
		// Change/remove current tab to active
		$(this).parent().parent('li').addClass('mobile-active').siblings().removeClass('mobile-active');
		updateWindow();
		e.preventDefault();
	});
	// D3 Doughnut Pie Chart
	$('body').on('click', function()  {
		updateDonut();
	});
	window.onresize = updateDonut;
	updateDonut();
	function updateDonut(){
		var addDoughnut = 0;
		$('.doughnut-outer-chart').each(function() {
			addDoughnut++;
			var data = {
				"This Month":0.67,
				"Last Month":0.32
			}
			var vals=[0.32,0.67]
			var radius = document.getElementById("div-"+addDoughnut).offsetWidth/2;
			var diameter = radius*2;
			var thickness = 6+radius/10; 
			var legendCenteringRatio = 0.32;
			if (radius<=180) legendCenteringRatio = 0.35;
			if (radius<=130) legendCenteringRatio = 0.38;
			if (radius<=90) legendCenteringRatio = 0.4;
			if (radius<=70) legendCenteringRatio = 0.42;
			if (radius<=55) legendCenteringRatio = 0.44;
			var element = document.getElementById("div-"+addDoughnut);
			while (element.firstChild) {
			  element.removeChild(element.firstChild);
			}
			var vis = d3.select("#div-"+addDoughnut).append("svg").attr("class", "firstdonut");
			var pi = Math.PI;
			var arc = d3.svg.arc()
				.innerRadius(radius-thickness*2-2)
				.outerRadius(radius-thickness-2)
				.startAngle(0)
				.endAngle(pi*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#f4f4f4")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness*2-2)
				.outerRadius(radius-thickness-2)
				.startAngle(0)
				.endAngle(pi*vals[0]*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#ff8500")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness-2)
				.outerRadius(radius-2)
				.startAngle(0)
				.endAngle(pi*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#e7e5e1")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness-2)
				.outerRadius(radius-2)
				.startAngle(pi*2)
				.endAngle(pi*2-pi*vals[1]*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#25b0e5")
				.attr("transform", "translate("+radius+","+radius+")");
			//The percentages
			vis.append("text")
				.attr("x", radius+radius*0.1)
				.attr("y", radius*0.82)
				.text(Math.round(vals[0]*100)+"%")
				.attr("class", "inner-label-orange")
				.attr("font-size",(thickness*1.1)+"px");
			vis.append("text")
				.attr("x", radius)
				.attr("y", radius*0.82)
				.text("|")
				.attr("class", "inner-label-grey")
				.attr("font-size",(thickness*1.6)+"px");
			vis.append("text")
				.attr("x", radius-radius*0.1)
				.attr("y", radius*0.82)
				.text(Math.round(vals[1]*100)+"%")
				.attr("class", "inner-label-blue")
				.attr("font-size",(thickness*1.1)+"px");
			//The legend
			var squareEdge = thickness-6;      
			vis.append("rect")
				.attr("x", radius-radius*legendCenteringRatio)
				.attr("y", radius*1.2-thickness+6)
				.attr("width", thickness-4)
				.attr("height", thickness-4)
				.attr("class", "inner-square-blue");
			vis.append("text")
				.attr("x", radius-radius*legendCenteringRatio+thickness+1)
				.attr("y", radius*1.2)
				.text(Object.keys(data)[0])
				.attr("class", "inner-labelkey-orange")
				.attr("font-size",(thickness*0.7)+"px");
			vis.append("rect")
				.attr("x", radius-radius*legendCenteringRatio)
				.attr("y", radius*(0.86+legendCenteringRatio)-thickness+3+2*squareEdge)
				.attr("width", thickness-4)
				.attr("height", thickness-4)
				.attr("class", "inner-square-orange");
			vis.append("text")
				.attr("x", radius-radius*legendCenteringRatio+thickness+1)
				.attr("y", radius*(0.84+legendCenteringRatio)+2*squareEdge)
				.text(Object.keys(data)[1])
				.attr("class", "inner-labelkey-blue")
				.attr("font-size",(thickness*0.7)+"px");
		});
	}
	// D3 Bar Chart with toolip
	window.onresize = updateWindow;
	updateWindow();
	function updateWindow(){
		var addChart = 0;
		$('.graph-outer-chart').each(function() {
			addChart++;
			jQuery("div#chart-"+addChart+" svg").remove();
			jQuery(".d3-tip"+addChart).remove();
			x = jQuery("div#chart-"+addChart).width() ;
			y = jQuery("div#chart-"+addChart).height() ;
			var margin = {top:0, right:0, bottom:20, left:40}, width = x - margin.left - margin.right, height = y || 200;
			var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
			var y = d3.scale.linear().range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom");
			var yAxis = d3.svg.axis().scale(y).orient("left");
			var tip = d3.tip().attr('class', 'd3-tip d3-tip'+addChart).offset([0, 0]).html(function(d) {
					return "<div class='d3-tip-top'>" + d.kWh + " kWh</div><div class='d3-tip-bottom'>" + d.letter + "</div>";
			});
			var svg = d3.select("div#chart-"+addChart).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			svg.call(tip);
			d3.tsv("data.tsv", type, function(error, data) {
				if (error) throw error;
				x.domain(data.map(function(d) {
						return d.letter;
				}));
				y.domain([0, d3.max(data, function(d) {
						return d.kWh;
				})]);
				svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
				svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("kWh");
				svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
						return x(d.letter);
				}).attr("width", x.rangeBand()).attr("y", function(d) {
						return y(d.kWh);
				}).attr("height", function(d) {
						return height - y(d.kWh);
				}).on('mouseenter', tip.show).on('mouseleave', function() {
						setTimeout(tip.hide,300);
				});
			});
			function type(d) {
				d.kWh = +d.kWh;
				return d;
			}
		});
	}
	// Global Accordian
	// Whatever ID number you choose below remember to also use the identical ID in the JS.
	//$('#nt-content-1').parent().find('.accordian-tabs').addClass('current');
	$('.accordian-tabs').removeClass('current');
	var NTcontent = 0;
	$('div.accordian-tabs-content').each(function() {
		NTcontent++;
		$(this).attr('id', 'nt-content-'+NTcontent);
	});
	$(function () {
    	$('.accordian-tabs-activate-button').click(function () {
			var self = $(this).parent().parent().parent();
        	self.toggleClass('current');
  			self.parent().siblings().children().removeClass('current');
			// Reset the Interim Tabs on Accordian Tabs Alternate
			$('.interim-tab-in-tab').removeAttr("style");
			$('.interim-tab-links li').each(function() {
				$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
			});
			self.next('div').slideToggle();
			self.parent().siblings().children().next().hide();
			// Make the doughnut the same width as the height of the chart to the left
			var singlePropertyGraphHeight = $('.current').parent().find('.single-property-graph-control-left');
			$('.single-property-graph-control-right .single-property-content-inner .doughnut-outer-chart').css('width', (singlePropertyGraphHeight.height() * 1) - 28);
			updateDonut();
			return false;
		});
	});
	// Search Open
	$('.search-tab a').click(function(e){
		$(this).parents().find('.properties-list').hide();
		$(this).parents().find('.search-list').fadeIn(500);
		$(this).parent().parent().addClass('open');
		$('.interim-tab-in-tab').removeAttr("style");
		$('.interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
		});
		updateDonut();
		e.preventDefault();
	});
	// Search Close
	$('.search-list-close a').click(function(e){
		$(this).parents().find('.search-list').hide();
		$(this).parents().find('.open').removeClass('open');
		$(this).parents().find('.properties-list').fadeIn(500);
		$('.interim-tab-in-tab').removeAttr("style");
		$('.interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
		});
		updateDonut();
		e.preventDefault();
	});
	
	// Global interface Switches from Mobile to PC and back that cannot be acheived via CSS due to lack of backward compatibility
	// !IMPORTANT The Window widths below must be the same as the media querie steps in the CSS
	if ($(window).width() <= 768) {
		// Calculate PC Search button
		//var searchAreaPC = $('.properties-dashboard-and-list-title-and-controls');
		//$('.search-tab').css('width', (searchAreaPC.width() * 1) - 106);
		
		// Mobile Search Open
		$('.search-tab input.search-submit').click(function(e){
			$(this).parents().find('.properties-list').hide();
			$(this).parents().find('.search-list').fadeIn(500);
			$(this).parent().parent().parent().parent().parent().addClass('open');
			//$(this).parent().parent().parent().parent().addClass('open').queue(function() {
			//	var searchAreaMob = $('.search-tab.open');
			//	$('.search-field').css('width', (searchAreaMob.width() * 1) - 45);
			//	$(this).dequeue();
			//});
			$('.interim-tab-in-tab').removeAttr("style");
			$('.interim-tab-links li').each(function() {
				$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
			});
			updateDonut();
			e.preventDefault();
		});
		// Search Close
		$('.search-list-close a').click(function(e){
			$(this).parents().find('.search-list').hide();
			$(this).parents().find('.open').removeClass('open');
			//$(this).parents().find('.open').removeClass('open').queue(function() {
			//	var searchAreaPCClose = $('.properties-dashboard-and-list-title-and-controls');
			//	$('.search-tab').css('width', (searchAreaPCClose.width() * 1) - 106);
			//	$(this).dequeue();
			//});
			$(this).parents().find('.properties-list').fadeIn(500);
			$('.interim-tab-in-tab').removeAttr("style");
			$('.interim-tab-links li').each(function() {
				$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
			});
			updateDonut();
			e.preventDefault();
		});
	}
	/*
	else if ($(window).width() <= 550) {
		// Calculate PC Search button
		var searchAreaPC = $('.properties-dashboard-and-list-title-and-controls');
		$('.search-tab.open .search-field').css('width', (searchAreaMob.width() * 1) - 244);
	}
	else if ($(window).width() <= 400) {
		// Calculate PC Search button
		var searchAreaPC = $('.properties-dashboard-and-list-title-and-controls');
		$('.search-tab.open .search-field').css('width', (searchAreaMob.width() * 1) - 240);
	}
	else if ($(window).width() <= 315) {
		// Calculate PC Search button
		var searchAreaPC = $('.properties-dashboard-and-list-title-and-controls');
		$('.search-tab.open .search-field').css('width', (searchAreaMob.width() * 1) - 241);
	}
	*/
	
	// Map Overlay Area
	$('.global-overlay-button a').click(function(e){
		$('body').find('.global-overlay-background-button').addClass('shown');
		$('body').find('.global-overlay-content-container').addClass('shown');
		// Initialise the Custom Scroll where needed
		$(function(){
			$('.custom-scroll').slimScroll({
				height:'auto',
				width:'auto',
				size:'12px',
				color:'#545251',
				alwaysVisible:true,
				opacity:1,
				allowPageScroll:true,
				wheelStep:10
			});
		});
		// Google Map iframe
		var googleMapContainer = $('.google-map-overlay-container');
		$('#map_canvas').css('height', (googleMapContainer.height() * 1) - 60).css('width', (googleMapContainer.width() * 1));
		// Path to the clients custom pin image. The image must be of type PNG
		var image = 'images/handmade-solutions-google-pin.png';
        var mapOptions = {
			// Increase or decrease the maps zoom here
			zoom: 17,
			center: new google.maps.LatLng(37.969834, 23.712263), 
			mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var myPos = new google.maps.LatLng(37.969834, 23.712263); 
        var myMarker = new google.maps.Marker({
            position: myPos,
			// Map pin link to take the visitor to that specific pins page
            url: 'http://www.handmadesolutions.net/',
			// A nice semantically correct title for accessibility telling the user where they will be taken to, title tags should not have more than 50 chars
            title: 'This link takes you to the Handmade Solutions home page',
            map: map,
            icon: image
        });
		// Show and center the map on click
        google.maps.event.addListener(myMarker, 'click', function() {
          window.location.href = myMarker.url;
        });
		// Get the map center on window resize
		var getCen = map.getCenter();
		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter(getCen);
		});
		e.preventDefault();
	});
	$('.global-overlay-background-button, .global-overlay-content-container-close-button').click(function(e){
		$('body').find('.shown').removeClass('shown');
		e.preventDefault();
	});
	// Custom Scroll
	$(function(){
		$('.custom-scroll').slimScroll({
			height:'auto',
			width:'auto',
			size:'12px',
			color:'#545251',
      		alwaysVisible:true,
      		opacity:1,
			allowPageScroll:true,
			wheelStep:10
		});
	});
	// Click Dropdown - Title Info Container Open
	$('.title-icon-dropdown-toggle-button a .icon-properties').click(function(e){
		$('.title-info-dropdown-content-container').slideDown(300);
		$(this).parent().parent().addClass('title-show');
		e.preventDefault();
	});
	// Click Dropdown - Title Info Container Close
	$('.title-icon-dropdown-toggle-button a .icon-close').click(function(e){
		$('.title-info-dropdown-content-container').slideUp(300);
		$(this).parent().parent().removeClass('title-show');
		e.preventDefault();
	});
	// Click Dropdown - Info Container
	$('.info-dropdown-content-container').hide();
	$('.info-dropdown-toggle-button a').click(function(e){
		$(this).parent().next('.info-dropdown-content-container').slideToggle(300);
		$(this).parent().delay(300).queue(function() {
			$(this).toggleClass('show');
			$(this).dequeue();
		});
		$(this).parent().parent().siblings().children().next().hide();
		$(this).parent().parent().siblings().children().removeClass('show');
		e.preventDefault();
	});
	// Profile Edit Slide Down
	// Click to close all other Edit Profile Modules and show this Edit Profile module
	$('.profile-data-inline-title a').click(function(e){
		$(this).parentsUntil('.profile-data-outer-container').siblings().children().find('.profile-data-inline-form').slideUp(300);
		$(this).parentsUntil('.profile-data-outer-container').siblings().children().find('.show-edit').removeClass('show-edit');
		$(this).parent().next('.profile-data-inline-form').slideDown(300);
		$(this).parent().addClass('show-edit');
		e.preventDefault();
	});
	// Click to close Edit Profile module
	$('.profile-data-inline-close a').click(function(e){
		$(this).parent().parent().parent('.profile-data-inline-form').slideUp(300);
		$('body').find('.show-edit').removeClass('show-edit');
		e.preventDefault();
	});
	
	
});

// Duplicate of some of the doc ready functions, used for responsive measurements to work on window resize or click of browser full screen button
$(window).on('load, resize', function(){
	// Measure Client Logo and subtract it's height from the total height and convert to a top margin
	var clientLogo = $('.client-logo img');
	var headerNav = $('.header-container-inner nav');
	$('.left-mainnav, .right-mainnav').css('margin-top', (clientLogo.height() * 1 - headerNav.height()) + 'px');
	// Make the left Tabs Area with the Graphs height = right Properties List Container height
	var mainContentLeftTabs = $('.properties-dashboard-container .tabs');
	$('.properties-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 28);
	// Make the left Tabs Area with the Graphs height = right Billing List Container height
	var mainContentLeftTabs2 = $('.properties-dashboard-container .tabs');
	$('.billing-list-outer-container').css('height', (mainContentLeftTabs2.height() * 1));
	// Make the left Tabs Area with the Graphs height = right Billing History Container height
	var mainContentLeftTabs = $('.single-property-dashboard-billing-left .tabs');
	$('.single-property-dashboard-billing-right .properties-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 104);
	// Make the properties list search results only, scrollable
	$('.properties-list-search-list-outer-container').css('height', (mainContentLeftTabs.height() * 1) - 120);
	// Google Map iframe
	var googleMapContainer = $('.google-map-overlay-container');
	$('#map_canvas').css('height', (googleMapContainer.height() * 1) - 60).css('width', (googleMapContainer.width() * 1));
	// Custom Scroll retained on resize
	$(function(){
		$('.custom-scroll').slimScroll({
			height:'auto',
			width:'auto',
			size:'12px',
			color:'#545251',
      		alwaysVisible:true,
      		opacity:1,
			allowPageScroll:true,
			wheelStep:10
		});
	});
	// Make the doughnut the same width as the height of the chart to the left
	var singlePropertyGraphHeight = $('.current').parent().find('.single-property-graph-control-left');
	$('.single-property-graph-control-right .single-property-content-inner .doughnut-outer-chart').css('width', (singlePropertyGraphHeight.height() * 1) - 28);
	// D3 Doughnut Pie Chart
	$('body').on('click', function()  {
		updateDonut();
	});
	window.onresize = updateDonut;
	updateDonut();
	function updateDonut(){
		var addDoughnut = 0;
		$('.doughnut-outer-chart').each(function() {
			addDoughnut++;
			var data = {
				"This Month":0.67,
				"Last Month":0.32
			}
			var vals=[0.32,0.67]
			var radius = document.getElementById("div-"+addDoughnut).offsetWidth/2;
			var diameter = radius*2;
			var thickness = 6+radius/10; 
			var legendCenteringRatio = 0.32;
			if (radius<=180) legendCenteringRatio = 0.35;
			if (radius<=130) legendCenteringRatio = 0.38;
			if (radius<=90) legendCenteringRatio = 0.4;
			if (radius<=70) legendCenteringRatio = 0.42;
			if (radius<=55) legendCenteringRatio = 0.44;
			var element = document.getElementById("div-"+addDoughnut);
			while (element.firstChild) {
			  element.removeChild(element.firstChild);
			}
			var vis = d3.select("#div-"+addDoughnut).append("svg").attr("class", "firstdonut");
			var pi = Math.PI;
			var arc = d3.svg.arc()
				.innerRadius(radius-thickness*2-2)
				.outerRadius(radius-thickness-2)
				.startAngle(0)
				.endAngle(pi*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#f4f4f4")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness*2-2)
				.outerRadius(radius-thickness-2)
				.startAngle(0)
				.endAngle(pi*vals[0]*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#ff8500")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness-2)
				.outerRadius(radius-2)
				.startAngle(0)
				.endAngle(pi*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#e7e5e1")
				.attr("transform", "translate("+radius+","+radius+")");
			arc = d3.svg.arc()
				.innerRadius(radius-thickness-2)
				.outerRadius(radius-2)
				.startAngle(pi*2)
				.endAngle(pi*2-pi*vals[1]*2) // to radians
			vis.attr("width", diameter).attr("height", diameter) // Added height and width so arc is visible
				.append("path")
				.attr("d", arc)
				.attr("fill", "#25b0e5")
				.attr("transform", "translate("+radius+","+radius+")");
			//The percentages
			vis.append("text")
				.attr("x", radius+radius*0.1)
				.attr("y", radius*0.82)
				.text(Math.round(vals[0]*100)+"%")
				.attr("class", "inner-label-orange")
				.attr("font-size",(thickness*1.1)+"px");
			vis.append("text")
				.attr("x", radius)
				.attr("y", radius*0.82)
				.text("|")
				.attr("class", "inner-label-grey")
				.attr("font-size",(thickness*1.6)+"px");
			vis.append("text")
				.attr("x", radius-radius*0.1)
				.attr("y", radius*0.82)
				.text(Math.round(vals[1]*100)+"%")
				.attr("class", "inner-label-blue")
				.attr("font-size",(thickness*1.1)+"px");
			//The legend
			var squareEdge = thickness-6;      
			vis.append("rect")
				.attr("x", radius-radius*legendCenteringRatio)
				.attr("y", radius*1.2-thickness+6)
				.attr("width", thickness-4)
				.attr("height", thickness-4)
				.attr("class", "inner-square-blue");
			vis.append("text")
				.attr("x", radius-radius*legendCenteringRatio+thickness+1)
				.attr("y", radius*1.2)
				.text(Object.keys(data)[0])
				.attr("class", "inner-labelkey-orange")
				.attr("font-size",(thickness*0.7)+"px");
			vis.append("rect")
				.attr("x", radius-radius*legendCenteringRatio)
				.attr("y", radius*(0.86+legendCenteringRatio)-thickness+3+2*squareEdge)
				.attr("width", thickness-4)
				.attr("height", thickness-4)
				.attr("class", "inner-square-orange");
			vis.append("text")
				.attr("x", radius-radius*legendCenteringRatio+thickness+1)
				.attr("y", radius*(0.84+legendCenteringRatio)+2*squareEdge)
				.text(Object.keys(data)[1])
				.attr("class", "inner-labelkey-blue")
				.attr("font-size",(thickness*0.7)+"px");
		});
	}
	// D3 Bar Chart with toolip
	window.onresize = updateWindow;
	updateWindow();
	function updateWindow(){
		var addChart = 0;
		$('.graph-outer-chart').each(function() {
			addChart++;
			jQuery("div#chart-"+addChart+" svg").remove();
			jQuery(".d3-tip"+addChart).remove();
			x = jQuery("div#chart-"+addChart).width() ;
			y = jQuery("div#chart-"+addChart).height() ;
			var margin = {top: 20, right: 20, bottom: 30, left: 40}, width = x - margin.left - margin.right, height = y || 200;
			var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
			var y = d3.scale.linear().range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom");
			var yAxis = d3.svg.axis().scale(y).orient("left");
			var tip = d3.tip().attr('class', 'd3-tip d3-tip'+addChart).offset([0, 0]).html(function(d) {
					return "<div class='d3-tip-top'>" + d.kWh + " kWh</div><div class='d3-tip-bottom'>" + d.letter + "</div>";
			});
			var svg = d3.select("div#chart-"+addChart).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			svg.call(tip);
			d3.tsv("data.tsv", type, function(error, data) {
				if (error) throw error;
				x.domain(data.map(function(d) {
						return d.letter;
				}));
				y.domain([0, d3.max(data, function(d) {
						return d.kWh;
				})]);
				svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
				svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("kWh");
				svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
						return x(d.letter);
				}).attr("width", x.rangeBand()).attr("y", function(d) {
						return y(d.kWh);
				}).attr("height", function(d) {
						return height - y(d.kWh);
				}).on('mouseenter', tip.show).on('mouseleave', function() {
						setTimeout(tip.hide,300);
				});
			});
			function type(d) {
				d.kWh = +d.kWh;
				return d;
			}
		});
	}
	// Global interface Switches from Mobile to PC and back
	// !IMPORTANT The Window widths below must be the same as the media querie steps in the CSS
	if ($(window).width() >= 1200) {
		$('.mobile-outer-tab').removeAttr("style");
		$('.mobile-outer-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("mobile-outer-active" );
		});
		$('.mobile-tab-in-tab').removeAttr("style");
		$('.mobile-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("mobile-active");
		});
		$('.interim-tab-in-tab').removeAttr("style");
		$('.interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
		});
		$('.title-info-dropdown-content-container').hide();
		$('.title-icon-dropdown-toggle-button').removeClass('title-show');
		updateDonut();
	}
	else if ($(window).width() >= 768) {
		$('.mobile-outer-tab').removeAttr("style");
		$('.mobile-outer-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("mobile-outer-active");
		});
		$('.mobile-tab-in-tab').removeAttr("style");
		$('.mobile-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("mobile-active");
		});
		$('.title-info-dropdown-content-container').hide();
		$('.title-icon-dropdown-toggle-button').removeClass('title-show');
		updateDonut();
	}
	else if ($(window).width() >= 650) {
		$('.interim-tab-in-tab').removeAttr("style");
		$('.interim-tab-links li').each(function() {
			$(this).removeAttr("class").parent().children('li:first-child').addClass("interim-active");
		});
		updateDonut();
	}
	
		
});



















