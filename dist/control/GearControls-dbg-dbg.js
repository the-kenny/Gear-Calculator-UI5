sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Label"
], function (Control, Label) {
	"use strict";
	return Control.extend("dirk.gears.control.GearControls", {
		metadata : {
			properties : {
				"value": 	{type : "float", defaultValue : 0},
				"nsprockets": {type: "int", defaultValue : 0},
				"minteeth": {type: "int", defaultValue : 0},
				"maxteeth": {type: "int", defaultValue : 0},
				"image": {type: "string", defaultValue : ""},
            	"width" : {type: "sap.ui.core.CSSSize", defaultValue: "1000px"},
            	"height" : {type: "sap.ui.core.CSSSize", defaultValue: "100px"},
            	"sprocketType" : {type: "string", defaultValue : ""},
            	"sprockets" : {type: "float[]",defaultValue : [] },
				"widthPixels" : {type : "int", defaultValue : 0},
			},
			aggregations : {
				_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_label2 : {type : "sap.m.Label", multiple: false, visibility : "hidden"}
			},
			events : {
				change : {
					parameters : {
						value : {type : "int"},
						sprockets : {type : "float[]"}
					}
				}
			}
		},
		init : function () {
			this.setAggregation("_label", new Label({
				text: this.getValue()
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_label2", new Label({
				text: this.getNsprockets()
			}).addStyleClass("sapUiSmallMargin"));
		},
		
		onThemeChanged :  function() {
			this.invalidate();	
			//console.log("onThemeChanged");
		},

		repaint :  function() {
			this.invalidate();
			//console.log("repaint");
		},

		setValue: function (fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_label").setText(fValue);
		},
		
		reset: function () {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			this.setValue(0);
			this.getAggregation("_label").setDesign("Standard");
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
			this.setNsprockets(0);
			this.getAggregation("_label2").setDesign("Standard");
			this.getAggregation("_label2").setText(oResourceBundle.getText("productRatingLabelInitial"));
		},

		onBeforeRendering : function () {
			if (this.getDomRef()){

				// get all sprocket divs from the document
				var sprockets = document.getElementById(this.getId()).getElementsByClassName(this.getSprocketType());
				for (var i=0; i < sprockets.length; i++){
					sprockets[i].removeEventListener('touchstart', this.fMouseDown);
					sprockets[i].removeEventListener('mousedown', this.fMouseDown);
				}
				window.removeEventListener('touchstart', this.fMouseUp);
				window.removeEventListener('touchend', this.fMouseUp);

			}
		},

		onAfterRendering : function () {  // add draggable sprockets here

			var x0 = 100;
			var nWidth = this.getDomRef().clientWidth - x0;
			//var nWidth = this.$().width() - x0;
			this.setWidthPixels(this.getDomRef().clientWidth - x0);
			//this.setWidthPixels(this.$().width() - x0);
			var dragSprocket;
			var dx;
			//var st = this.getSprocketType();
			var minTeeth = this.getMinteeth();
			var maxTeeth = this.getMaxteeth();
			var nTickMarks = maxTeeth - minTeeth + 1;
			var bDrag = false;
			var oControl = this;
			var iSprocket = 0;
			var oldTick = 0;
			var nearestTick = 0;

			// get all sprocket divs from the document
			var sprockets = document.getElementById(this.getId()).getElementsByClassName(this.getSprocketType());
			// get all scaleTicks of this control
			var aTicks = document.getElementById(this.getId()).getElementsByClassName("scaleTick");
			var offSet = document.getElementById(this.getId()).offsetLeft;
			
			// position ticks
			for (var i=0; i < aTicks.length; i++){
				aTicks[i].style.left = x0 + Math.round(i*oControl.getWidthPixels()/(nTickMarks-1)) - 1 + "px";
			}
			// position sprockets
			var aSprockets = this.getSprockets();
			for (i=0 ; i < aSprockets.length; i++){
				sprockets[i].innerHTML = aSprockets[i];
				sprockets[i].innerText = aSprockets[i];
				//position sprockets
				sprockets[i].style.left = x0+ Math.round( (this.getSprockets()[i]-minTeeth )*oControl.getWidthPixels()/(nTickMarks-1) - sprockets[i].clientWidth/2) + "px";
			}


			//if ( sprockets.length === this.getNsprockets() && sprockets.length > 0 && aTicks.length > 0 ){
			
			function mouseMove(e){
				if (bDrag){
					//e.preventDefault();
					if (e.type === "mousemove"){
						// nPosition = center of Sprocket based on mouse move
						var nPosition = e.clientX - offSet - dx + dragSprocket.clientWidth/2;
					}else if (e.type === "touchmove"){
						nPosition = e.touches[0].clientX - offSet - dx + dragSprocket.clientWidth/2;
					}
					dragSprocket.style.left = Math.max( 0 ,Math.min(x0 + nWidth - dragSprocket.clientWidth/2, nPosition - dragSprocket.clientWidth/2)) + 'px';

					// calculate nearest tick mark on scale
					var nearestTick = Math.round((nPosition - x0)/nWidth*(nTickMarks-1) + minTeeth);
					if ( nearestTick > maxTeeth ){
						nearestTick = maxTeeth;
						oldTick = maxTeeth;
					} else if ( nearestTick < minTeeth && oldTick > 0 ) {
						if (dragSprocket.innerText !== ""){
							var aSprockets = oControl.getSprockets();
						    aSprockets.splice(iSprocket,1);
							oControl.setProperty("sprockets", aSprockets, true);
						}
						dragSprocket.innerText = "";
					    dragSprocket.innerHTML = "";
					    nearestTick = 0;
					    oldTick = 0;
					} else if (nearestTick !== oldTick && nearestTick >= minTeeth){
						oldTick = nearestTick;
					
						aSprockets = oControl.getSprockets();
						if (dragSprocket.innerText !== ""){
							aSprockets[iSprocket] = nearestTick;
						} else {
							aSprockets.splice(iSprocket,0,minTeeth);
						}
						dragSprocket.innerText = nearestTick;
						dragSprocket.innerHTML = nearestTick;
						oControl.setProperty("sprockets", aSprockets, true);
						oControl.fireChange();
					}
				}
			}
			

			function mouseDown(e){
				bDrag = true;
				dragSprocket = e.currentTarget;
				if (e.type === "mousedown"){
					dx = e.clientX - offSet - dragSprocket.offsetLeft;
					window.addEventListener('mousemove', mouseMove, true);
				}else if (e.type === "touchstart"){
					dx = e.touches[0].clientX - offSet - dragSprocket.offsetLeft;
					window.addEventListener('touchmove', mouseMove, true);
				}
				// which sprocked has bee clicked?
				for ( i=0; i < oControl.getSprockets().length; i++){
					if (oControl.getSprockets()[i] === Number(dragSprocket.innerText)){
						iSprocket = i;	
					}
				}
			}
			
			function mouseUp(e){
				if (bDrag){ 
					//position sprocket at nearest tick
    				window.removeEventListener('mousemove', mouseMove, true);
    				window.removeEventListener('touchmove', mouseMove, true);
    				var nPosition = e.clientX - offSet - dx + dragSprocket.clientWidth/2;
					var nearestTick = Math.round((nPosition - x0)/oControl.getWidthPixels()*(nTickMarks-1) + minTeeth);
					if ( nearestTick < minTeeth ){
						dragSprocket.style.left = 0;
					} else {
    					dragSprocket.style.left = 
    					Math.round(Math.min(x0 + oControl.getWidthPixels() - dragSprocket.clientWidth/2, x0 + (nearestTick - minTeeth)*oControl.getWidthPixels()/(nTickMarks-1) - dragSprocket.clientWidth/2)) + "px";
					}
    				bDrag = false;
				}
			}

			//var sprockets = document.getElementById(this.getId()).getElementsByClassName(this.getSprocketType());
			for (i=0; i < sprockets.length; i++){
				sprockets[i].addEventListener('touchstart', mouseDown);
				sprockets[i].addEventListener('mousedown', mouseDown);
			}
			this.fMouseDown = mouseDown;
			
    		window.addEventListener('touchend', mouseUp, true);
			window.addEventListener('mouseup', mouseUp, true);
			this.fMouseUp = mouseUp;
			//this.invalidate();

			//}
		},

		renderer : { 
			apiVersion : 2,
			render : function (oRM, oControl) {
			
				oRM.openStart("div", oControl);
				oRM.class("gearControl");
				oRM.style("width",oControl.getWidth());
				oRM.style("height", oControl.getHeight());
				var nSelectableChainrings = oControl.getMaxteeth() - oControl.getMinteeth() + 1;
				var sClass = oControl.getSprocketType();
				oRM.openEnd();

				for ( var it=0; it< nSelectableChainrings; it++) {
					oRM.openStart("div");
					oRM.class("scaleTick");
					oRM.openEnd();
					oRM.close("div");
				}
				for ( var is=0; is< oControl.getNsprockets(); is++) {
					oRM.openStart("div");
					oRM.class(sClass);
					oRM.openEnd();
					oRM.close("div");
				}
				oRM.close("div");

				/*oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addStyle("width", oControl.getWidth());  // write the Control property size; the Control has validated it 
				oRM.addStyle("height", oControl.getHeight());
				oRM.writeStyles();
				oRM.addClass("gearControl");
				oRM.writeClasses();
				oRM.write(">");
				var nSelectableChainrings = oControl.getMaxteeth() - oControl.getMinteeth() + 1;
				var sClass = oControl.getSprocketType();

				for ( var it=0; it< nSelectableChainrings; it++) {
					var sDiv = "<div class=\"scaleTick\"></div>";
					oRM.write(sDiv);
				}
				for ( var is=0; is< oControl.getNsprockets(); is++) {
					sDiv = "<div class=\"" + sClass + "\">" + "</div>";
					oRM.write(sDiv);
				}
				oRM.write("</div>");*/
			}
		}
	});
});