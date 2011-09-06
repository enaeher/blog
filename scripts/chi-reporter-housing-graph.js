$(document).ready(function() {
    var pleasantSeasonalColors = [ 
	"rgb(65,97,1)", "rgb(94,75,43)", "rgb(43,94,90)",
	"rgb(234,44,0)", "rgb(229,157,17)", "rgb(177,149,17)",
	"rgb(32,117,112)", "rgb(37,77,25)", "rgb(203,202,151)" 
    ];

    var incomeLevelsURI = "/scripts/income-levels.json";

    var datasets = [ 
	{
	    title : "Race and Ethnicity by Income",
	    uri : "/scripts/housing-data.json",
	    graphOptions : getDefaultGraphOptions(),
	    placeholder : $("#race-income-placeholder")
	    
	},
	{
	    title : "Gender by Income",
	    uri : "/scripts/gender-income.json",
	    graphOptions : getDefaultGraphOptions(),
	    placeholder : $("#gender-income-placeholder")
	}
    ];

    function getDefaultGraphOptions () {
	return {
	    lines : { show : true },
	    points : {
		show : true,
		fillColor : "#1a1a17"
	    },
	    legend : {
		labelBoxBorderColor : "inherit",
		noColumns : 5,
		backgroundColor : "transparent"
	    },
	    grid : {
		borderWidth : 0,
		tickColor : "#1a1a17",
		color : "white" 
	    }
	}
    };
    
    // I knew mapcar. mapcar was a friend of mine. And you, jQuery's .map,
    // are no mapcar -- thus this post-increment unpleasantness merely to iterate
    // over multiple arrays simultaneously.

    function absoluteSeriesGroupToSeries (seriesGroup, color, dataset) {
	dataset.graphOptions.yaxis = {};
	return [ 
	    { 
		label : seriesGroup.label,
		lines : { fill : .05 }, 
		color : color,
		data : function () {
		    var j = 0;
		    return seriesGroup.all.map ( function (dataPoint) { return [ dataset.incomeLevels[j++][0], dataPoint ]; } );
		}()
	    },
	    { 
		color : color,
		data : function () {
		    var j = 0;
		    return seriesGroup.highCost.map ( function (dataPoint) { return [ dataset.incomeLevels[j++][0], dataPoint ]; } );
		}()
	    } 
	];
    }

    function percentageSeriesGroupToSeries (seriesGroup, color, dataset) {
	dataset.graphOptions.yaxis = { tickFormatter : function (number) { return number + '%'; } };
	return [ 
	    {
		color : color,
		label : seriesGroup.label, data : function () {
		    var j = 0;
		    return seriesGroup.all.map (
			function (dataPoint) {
			    return [ dataset.incomeLevels[j][0], (seriesGroup.highCost[j++] / dataPoint) * 100 ];
			}
		    );
		}()
	    }
	];
    }

    // Draw a graph in placeholder for the series selected using the inputs, using data
    // from seriesGroups and incomeLevels. If absoluteValuestoggle is false, each
    // series group contains one series showing the percent of high-cost loans. If
    // true, each series group contains two series, one showing all loans and one
    // high-cost loans.

    function redrawGraph (dataset) {
	var data = [];
	dataset.seriesGroupCheckboxes.each (
	    function (index) {
		if (this.checked) {
		    var seriesGroup = dataset.seriesGroups[index];
		    var color = pleasantSeasonalColors[index];
		    data = data.concat (
			(dataset.absoluteValuesToggle ? absoluteSeriesGroupToSeries : percentageSeriesGroupToSeries).call (null, seriesGroup, color, dataset)
		    );
		}
	    }
	);

	if (data.length > 0) {
	    $.plot (dataset.placeholder, data, dataset.graphOptions);
	}
    }

    // Initiate pulling the data and drawing the graphs.

    $.getJSON(incomeLevelsURI,
	      function (incomeLevels) {
		  $.each(datasets,
			 function (index) {
			     // Calibrate graph ticks to income levels
			     var dataset = this;
			     dataset.graphOptions.xaxis = { ticks : incomeLevels };

			     // set up graph-manipulation form
			     
			     var form = $(document.createElement ("form"))
			     dataset.placeholder.after (form);

			     $.getJSON(this.uri,
				       function (seriesGroups) {
					   $.each(seriesGroups,
						  function (seriesGroup) {

						      // Verbose, yes, but I retain a certain distrust of
						      // innerHTML -- few can resist the fatal allure of
						      // string-munging passing for programming -- fewer
						      // still among old Perl hackers like me.
						      
						      var seriesGroup = seriesGroups[seriesGroup];
						      var seriesGroupCheckbox = document.createElement ("input");
						      var seriesGroupCheckboxLabel = document.createElement ("label");
						      seriesGroupCheckbox.name = seriesGroup.label;
						      seriesGroupCheckbox.id = seriesGroup.label;
						      seriesGroupCheckbox.type = "checkbox";
						      seriesGroupCheckbox.checked = "checked";
						      seriesGroupCheckboxLabel.appendChild (document.createTextNode (seriesGroup.label));
						      seriesGroupCheckboxLabel.htmlFor = seriesGroupCheckbox.id;
						      form.append (document.createElement("br"));
						      form.append (seriesGroupCheckbox);
						      form.append (seriesGroupCheckboxLabel);
						  }
						 );
					   
					   $.each(
					       [
						   { label : "Number of High-Cost and Total Loans", value : true },
						   { label : "% High-Cost Loans", value : false, checked : true  }
					       ],
					       function (index) {
						   var radioButton = document.createElement ("input");
						   var radioButtonLabel = document.createElement ("label");
						   radioButton.type = "radio";
						   radioButton.name = dataset.placeholder[0].id + '-absolute-selector';
						   radioButton.id = radioButton.name + '-' + this.value;
						   radioButton.value = this.value;
						   radioButton.checked = this.checked;
						   
						   radioButtonLabel.htmlFor = radioButton.id;
						   radioButtonLabel.appendChild (document.createTextNode (this.label));
						   form.prepend (radioButtonLabel);
						   form.prepend (radioButton);
					       }
					   );

					   // Dataset properties

					   dataset.seriesGroups = seriesGroups;
					   dataset.incomeLevels = incomeLevels;
					   dataset.displayAbsoluteValues = false;
					   dataset.seriesGroupCheckboxes = form.find ("input[type='checkbox']");
					   dataset.displayModeRadioButtons = form.find ("input[type='radio']");

					   // Form events

					   dataset.seriesGroupCheckboxes.click (function () { redrawGraph (dataset); });
					   dataset.displayModeRadioButtons.click (function () {
					       dataset.absoluteValuesToggle = (this.value == "true" ? true : false)
					       redrawGraph(dataset);
					   });

					   // and we're off

					   redrawGraph(dataset);
				       }
				      );
			 }
			);
	      }
	     );
});