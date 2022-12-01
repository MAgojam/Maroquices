
// This file is an automatically generated and should not be edited

'use strict';

const options = [{"name":"switch","title":"Raw vs Summary","type":"List","options":[{"name":"fromraw","title":"Analyze raw data"},{"name":"fromsummary","title":"Enter summary data"}],"default":"fromraw"},{"name":"data","type":"Data"},{"name":"dep","title":"Poisson Data Variable","type":"Variable"},{"name":"intervalValue","title":"Time/Space interval","type":"Integer"},{"name":"testValue","title":"Test Value","type":"Number"},{"name":"alt","title":"Alternative hypothesis","type":"List","options":[{"name":"two.sided","title":"Not equal"},{"name":"greater","title":"greater"},{"name":"less","title":"Lesser"}],"default":"two.sided"},{"name":"ci","title":"Confidence Intervals","type":"List","options":[{"title":"Exact","name":"exact"},{"title":"Wilson","name":"score"},{"title":"Wald","name":"wald"}],"default":"exact"},{"name":"conf","title":"Confidence level","type":"Number","min":0,"max":1,"default":0.95},{"name":"lambda","title":"Lambda","type":"Number"}];

const view = function() {
    
    this.handlers = { }

    View.extend({
        jus: "3.0",

        events: [

	]

    }).call(this);
}

view.layout = ui.extend({

    label: "Test and Confidence Intervals for Poisson",
    jus: "3.0",
    type: "root",
    stage: 0, //0 - release, 1 - development, 2 - proposed
    controls: [
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			style: "inline",
			controls: [
				{
					type: DefaultControls.RadioButton,
					typeName: 'RadioButton',
					name: "switchr",
					optionName: "switch",
					optionPart: "fromraw"
				},
				{
					type: DefaultControls.RadioButton,
					typeName: 'RadioButton',
					name: "switchs",
					optionName: "switch",
					optionPart: "fromsummary",
					events: [
						{ execute: require('./poisstest.events').onChange_switch }
					]
				}
			]
		},
		{
			type: DefaultControls.CollapseBox,
			typeName: 'CollapseBox',
			label: "Work With Raw Data",
			name: "rpanel",
			collapsed: false,
			controls: [
				{
					type: DefaultControls.VariableSupplier,
					typeName: 'VariableSupplier',
					persistentItems: false,
					stretchFactor: 1,
					controls: [
						{
							type: DefaultControls.TargetLayoutBox,
							typeName: 'TargetLayoutBox',
							label: "Poisson Data Variable",
							controls: [
								{
									type: DefaultControls.VariablesListBox,
									typeName: 'VariablesListBox',
									name: "dep",
									maxItemCount: 1,
									isTarget: true
								}
							]
						}
					]
				}
			]
		},
		{
			type: DefaultControls.CollapseBox,
			typeName: 'CollapseBox',
			label: "Work With Summary Data",
			name: "spanel",
			collapsed: true,
			controls: [
				{
					type: DefaultControls.Label,
					typeName: 'Label',
					label: "Data",
					controls: [
						{
							type: DefaultControls.LayoutBox,
							typeName: 'LayoutBox',
							style: "inline",
							controls: [
								{
									type: DefaultControls.TextBox,
									typeName: 'TextBox',
									name: "lambda",
									format: FormatDef.number,
									enable: "(switch:fromsummary)"
								},
								{
									type: DefaultControls.TextBox,
									typeName: 'TextBox',
									name: "intervalValue",
									format: FormatDef.number,
									enable: "(switch:fromsummary)"
								}
							]
						}
					]
				}
			]
		},
		{
			type: DefaultControls.Label,
			typeName: 'Label',
			label: "Analysis Options",
			controls: [

			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			controls: [
				{
					type: DefaultControls.TextBox,
					typeName: 'TextBox',
					name: "conf",
					format: FormatDef.number
				}
			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			controls: [
				{
					type: DefaultControls.TextBox,
					typeName: 'TextBox',
					name: "testValue",
					format: FormatDef.number
				}
			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			controls: [
				{
					type: DefaultControls.ComboBox,
					typeName: 'ComboBox',
					name: "alt"
				}
			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			controls: [
				{
					type: DefaultControls.ComboBox,
					typeName: 'ComboBox',
					name: "ci"
				}
			]
		}
	]
});

module.exports = { view : view, options: options };
