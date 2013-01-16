(function() {
	"use strict";
	
	var MapTooltip = function (hikeData, marker) {
		this.hikeData = hikeData;
		this.marker = marker;
		this.setMap(this.marker.getMap());
	};

	MapTooltip.prototype = new google.maps.OverlayView();
	
	MapTooltip.prototype.onAdd = function() {
		this.div = $(".tooltip").clone();
		this.getPanes().floatShadow.appendChild(this.div[0]);
	};

	MapTooltip.prototype.draw = function() {
		this.div.text(this.hikeData.name);
		var buffer = 10;
		var width = this.div.outerWidth();
		var height = this.div.outerHeight();

		var overlayProjection = this.getProjection();
		var markerPosition = overlayProjection.fromLatLngToContainerPixel(this.marker.getPosition());
		
		// The default location of the tooltip is anchored to the bottom-right of the marker. If that
		// location would render the tooltip off the screen, relocate it.
		var containerOffset = $(this.marker.getMap().getDiv()).offset();
		var tooltipOffset = {
			top: containerOffset.top + markerPosition.y + buffer,
			left: containerOffset.left + markerPosition.x + buffer
		};

		if (tooltipOffset.top + height + buffer > $(document).height()) {
			tooltipOffset.top = tooltipOffset.top - height - buffer * 2;
		}

		if (tooltipOffset.left + width + buffer > $(document).width()) {
			tooltipOffset.left = markerPosition.x - width - buffer;
		}
		this.div.css("display", "block");
		this.div.offset(tooltipOffset);
	};

	MapTooltip.prototype.onRemove = function() {
		this.div.remove();
		this.div = null;
	};

	MapTooltip.prototype.destroy = function() {
		this.setMap(null);
	};

	// Export
	window.hikeio.MapTooltip = MapTooltip;
}
)();