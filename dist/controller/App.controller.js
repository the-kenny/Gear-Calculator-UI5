sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/base/util/UriParameters"],function(e,t,a,i){"use strict";var s;var n;return e.extend("dirk.gears.controller.App",{onInit:function(){var e=this.getOwnerComponent().getModel("gears");e.setSizeLimit(200);e.attachRequestCompleted(function(e){this.onAllDataIsReady()}.bind(this))},onDisplayHelp:function(e){var t=this.getView();var a=t.byId("helpDialog");if(!a){a=sap.ui.xmlfragment(t.getId(),"dirk.gears.view.HelpDialog",this);t.addDependent(a)}a.open()},onCloseDisplayHelp:function(){this.getView().byId("helpDialog").close()},onSettingsDialog:function(e){var t=this.getView();var a=t.byId("settingsDialog");if(!a){a=sap.ui.xmlfragment(t.getId(),"dirk.gears.view.SettingsDialog",this);t.addDependent(a)}a.open()},onCloseSettingsDialog:function(){if(s.oData.displayData.minCadence>10&&s.oData.displayData.maxCadence<200&&s.oData.displayData.maxCadence>s.oData.displayData.minCadence&&s.oData.displayData.minTeethCogs>0&&s.oData.displayData.maxTeethCogs>s.oData.displayData.minTeethCogs&&s.oData.displayData.maxTeethCogs<100&&s.oData.displayData.minTeethChainrings>0&&s.oData.displayData.maxTeethChainrings>s.oData.displayData.minTeethChainrings&&s.oData.displayData.maxTeethChainrings<100&&s.oData.displayData.maxNumberChainrings<6&&s.oData.displayData.maxNumberChainrings>0&&s.oData.displayData.maxNumberCogs<21&&s.oData.displayData.maxNumberCogs>0){this.getView().byId("settingsDialog").close();this.getView().byId("selectCadence").setMin(Number(s.oData.displayData.minCadence));this.getView().byId("selectCadence").setMax(Number(s.oData.displayData.maxCadence));this.getView().byId("cogControls").setMinteeth(Number(s.oData.displayData.minTeethCogs));this.getView().byId("cogControls").setMaxteeth(Number(s.oData.displayData.maxTeethCogs));this.getView().byId("cogControls").setNsprockets(Number(s.oData.displayData.maxNumberCogs));this.getView().byId("chainringControls").setMinteeth(Number(s.oData.displayData.minTeethChainrings));this.getView().byId("chainringControls").setMaxteeth(Number(s.oData.displayData.maxTeethChainrings));this.getView().byId("chainringControls").setNsprockets(Number(s.oData.displayData.maxNumberChainrings))}},onCancelSettingsDialog:function(){this.getView().byId("settingsDialog").close()},onAllDataIsReady:function(){var e=new i(window.location.href);var t=e.get("GR");var r=e.get("KB");var g=e.get("RZ");var o=e.get("UF");var c=e.get("GR2");var h=e.get("KB2");var l=e.get("RZ2");var d=e.get("UF2");var D=e.get("TF");var m=e.get("SL");var y=e.get("UN");var u=e.get("DV");this.getView().byId("selectCogSet").setCogs=function(e,t){var a=1;var i=t.getView().getModel("gears").getProperty("/CogSets");t.getView().byId("selectCogSet").setSelectedKey(i[0].name);for(var s in i){if(JSON.stringify(e.sort())===JSON.stringify(i[s].set.sort())){t.getView().byId("selectCogSet").setSelectedKey(i[s].name)}}};this.getView().byId("selectChainringSet").setChainrings=function(e,t){var a=t.getView().getModel("gears").getProperty("/ChainringSets");t.getView().byId("selectChainringSet").setSelectedKey(a[0].name);for(var i in a){if(JSON.stringify(e.sort())===JSON.stringify(a[i].set.sort())){t.getView().byId("selectChainringSet").setSelectedKey(a[i].name)}}};var b=this.getView().getModel("gears").getProperty("/HubData");this.getView().getModel("gears").getProperty("/HubData")[0].name="XXX";for(var C in b){if(b[C].id==t){var p=b[C].ratios;var w=b[C].name}if(b[C].id==c){var I=b[C].ratios;var V=b[C].name}}var f=this.getView().getModel("gears").getProperty("/TireSizes");for(C in f){if(f[C].size.toString()==o){var x=f[C].inch+"/"+f[C].ETRTO}if(f[C].size.toString()==d){var S=f[C].inch+"/"+f[C].ETRTO}}var v=this.getView().getModel("i18n").getResourceBundle();this.getView().byId("selectGears").getItemAt(0).setText(v.getText("derailleurs"));var R={gearData:{chainrings:r!==null?r.split(",").map(Number):[22,36],cogs:g!==null?g.split(",").map(Number):[11,12,14,16,18,21,24,28,32,36],hubId:t!==null?t:"DERS",name:t!==null?w:"",minRatio:0,ratios:t!==null?p:[1],tireName:x?x:"27,5/2215",circumference:o!==null?Number(o):2215,cadence:D!==null?Number(D):90},gearData2:{chainrings:h!==null?h.split(",").map(Number):[30],cogs:l!==null?l.split(",").map(Number):[10,12,14,16,18,21,24,28,32,36,42],hubId:c!==null?c:"DERS",name:c!==null?V:"",minRatio:0,ratios:c!==null?I:[1],tireName:S?S:"27,5/2215",circumference:d!==null?Number(d):2215,cadence:D!==null?Number(D):90},displayData:{maxChainAngle:m!==null?Number(m):2.6,displayValueId:u!==null?u:"teeth",displayValues:[{id:"teeth",name:v.getText("teeth")},{id:"cogs",name:v.getText("cogs")},{id:"development",name:v.getText("development")},{id:"gearInches",name:v.getText("gearInches")},{id:"ratio",name:v.getText("ratio")},{id:"speed",name:v.getText("speed")}],unitsIndex:y=="MPH"?1:0,compare:c!==null,maxCadence:120,minCadence:60,minTeethChainrings:20,maxTeethChainrings:64,minTeethCogs:9,maxTeethCogs:52,maxNumberChainrings:3,maxNumberCogs:13}};s=new a(R);s.getURL=function(){var e=window.location.pathname+"?GR="+s.oData.gearData.hubId+"&KB="+s.oData.gearData.chainrings+"&RZ="+s.oData.gearData.cogs+"&UF="+s.oData.gearData.circumference+"&TF="+s.oData.gearData.cadence+"&SL="+s.oData.displayData.maxChainAngle+"&UN="+(s.oData.displayData.unitsIndex==1?"MPH":"KMH")+"&DV="+s.oData.displayData.displayValueId;if(s.oData.displayData.compare){e=e+"&GR2="+s.oData.gearData2.hubId+"&KB2="+s.oData.gearData2.chainrings+"&RZ2="+s.oData.gearData2.cogs+"&UF2="+s.oData.gearData2.circumference}return e};this.getView().setModel(s);this.context=s.createBindingContext("/gearData");this.getView().byId("gearCalculatorPage").setBindingContext(this.context);this.getView().byId("selectTires").setSelectedKey(s.oData.gearData.circumference);n=this.getView().byId("gearGraphics");var N=function(e){var t=e.control;t.repaint()};sap.ui.core.ResizeHandler.register(this.getView().byId("gearGraphics"),N);sap.ui.core.ResizeHandler.register(this.getView().byId("gearGraphics2"),N);sap.ui.core.ResizeHandler.register(this.getView().byId("chainringControls"),N);sap.ui.core.ResizeHandler.register(this.getView().byId("cogControls"),N);this.getView().byId("selectChainringSet").setChainrings(s.oData.gearData.chainrings,this);this.getView().byId("selectCogSet").setCogs(s.oData.gearData.cogs,this);this.getView().byId("showURL").setHref(s.getURL())},onGearSelected:function(e){var t=e.getParameter("selectedItem").getBindingContext("gears").getObject();s.getObject("",this.context).ratios=t.ratios;s.getObject("",this.context).name=t.name;s.getObject("",this.context).minRatio=t.minRatio;s.getObject("",this.context).chainrings=[t.defCr];s.getObject("",this.context).cogs=[t.defCog];this.getView().byId("showURL").setHref(s.getURL())},onTireSizeSelected:function(e){var t=e.getParameter("selectedItem").getBindingContext("gears").getObject();s.getObject("",this.context).circumference=t.size;s.getObject("",this.context).tireName=t.inch+"/"+t.ETRTO+" "+t.description;this.getView().byId("showURL").setHref(s.getURL())},onChainringSetSelected:function(e){var t=e.getParameter("selectedItem").getBindingContext("gears").getObject();s.getObject("",this.context).chainrings=t.set;this.getView().byId("showURL").setHref(s.getURL())},onCogSetSelected:function(e){var t=e.getParameter("selectedItem").getBindingContext("gears").getObject();s.getObject("",this.context).cogs=t.set;this.getView().byId("showURL").setHref(s.getURL())},onCadenceSelected:function(e){s.getObject("",this.context).cadence=e.getParameter("value");this.getView().byId("showURL").setHref(s.getURL())},onChangeCircumference:function(e){var t=e.getParameter("value");var a=t.charCodeAt(t.length-1);if(a>57||a<48){t=t.slice(0,t.length-1);this.getView().byId("inpCircumference").setValue(t)}if(t.length===4){s.getObject("",this.context).circumference=parseInt(t);s.getObject("",this.context).tireSize=parseInt(t);s.getObject("",this.context).tireName=t;this.getView().byId("showURL").setHref(s.getURL());n.setCircumference(parseInt(t));this.getView().byId("selectTires").setSelectedKey(null)}},onMaxChainAngleSelected:function(e){s.getObject("/displayData").maxChainAngle=e.getParameter("value");this.getView().byId("showURL").setHref(s.getURL())},onChainringChange:function(e){this.getView().byId("selectChainringSet").setChainrings(e.getSource().getSprockets(),this);this.getView().byId("showURL").setHref(s.getURL())},onCogChange:function(e){this.getView().byId("selectCogSet").setCogs(e.getSource().getSprockets(),this);this.getView().byId("showURL").setHref(s.getURL())},ondisplayValueSelected:function(e){this.getView().byId("showURL").setHref(s.getURL())},onSelectUnits:function(e){this.getView().byId("showURL").setHref(s.getURL())},onGraphicsSelected:function(e){if(s.oData.displayData.compare){var t=e.getSource().getId();if(t.search("gearGraphics2")>0){n=this.getView().byId("gearGraphics2");this.context=this.getView().getModel().createBindingContext("/gearData2");this.getView().byId("gearGraphics").removeStyleClass("selectedGraphics");this.getView().byId("gearGraphics2").addStyleClass("selectedGraphics");this.getView().byId("gearCalculatorPage").setBindingContext(this.context);this.getView().byId("selectChainringSet").setChainrings(s.oData.gearData2.chainrings,this);this.getView().byId("selectCogSet").setCogs(s.oData.gearData2.cogs,this);this.getView().byId("selectTires").setSelectedKey(s.oData.gearData2.circumference,this)}else{n=this.getView().byId("gearGraphics");this.context=this.getView().getModel().createBindingContext("/gearData");this.getView().byId("gearGraphics").addStyleClass("selectedGraphics");this.getView().byId("gearGraphics2").removeStyleClass("selectedGraphics");this.getView().byId("gearCalculatorPage").setBindingContext(this.context);this.getView().byId("selectChainringSet").setChainrings(s.oData.gearData.chainrings,this);this.getView().byId("selectCogSet").setCogs(s.oData.gearData.cogs,this);this.getView().byId("selectTires").setSelectedKey(s.oData.gearData.circumference,this)}this.getView().byId("showURL").setHref(s.getURL())}},onPress:function(e){if(s.oData.displayData.compare){s.oData.gearData2.hubId=s.oData.gearData.hubId;s.oData.gearData2.ratios=s.oData.gearData.ratios;s.oData.gearData2.minRatio=s.oData.gearData.minRatio;s.oData.gearData2.chainrings=s.oData.gearData.chainrings;s.oData.gearData2.cogs=s.oData.gearData.cogs;s.oData.gearData2.circumference=s.oData.gearData.circumference;s.oData.gearData2.tireName=s.oData.gearData.tireName;this.getView().byId("gearGraphics2").addStyleClass("selectedGraphics");this.context=this.getView().getModel().createBindingContext("/gearData2");this.getView().byId("gearCalculatorPage").setBindingContext(this.context);this.getView().byId("selectChainringSet").setChainrings(s.oData.gearData2.chainrings,this);this.getView().byId("selectCogSet").setCogs(s.oData.gearData2.cogs,this);this.getView().byId("selectTires").setSelectedKey(s.oData.gearData2.circumference,this)}else{this.getView().byId("gearGraphics").removeStyleClass("selectedGraphics");this.context=this.getView().getModel().createBindingContext("/gearData");this.getView().byId("gearCalculatorPage").setBindingContext(this.context)}this.getView().byId("showURL").setHref(s.getURL())},onCloseBanner:function(e){this.getView().byId("banner").setVisible(false)}})});