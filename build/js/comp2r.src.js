
// This file is an automatically generated and should not be edited

'use strict';

const options = [{"name":"r1","title":"Coeficiente de Correlação 1 (r₁)","type":"Number","min":-1,"max":1},{"name":"n1","title":"Dim. Amostra 1 (n₁)","type":"Number"},{"name":"r2","title":"Coeficiente de Correlação 1 (r₂)","type":"Number","min":-1,"max":1},{"name":"n2","title":"Dim. Amostra 1 (n₂)","type":"Number"},{"name":"alt","title":"H₁:","type":"List","options":[{"title":"ρ₁ ≠ ρ₂","name":"bilateral"},{"title":"ρ₁ > ρ₂","name":"tud"},{"title":"ρ₁ < ρ₂","name":"tue"}],"default":"bilateral"}];

const view = function() {
    
    this.handlers = { }

    View.extend({
        jus: "3.0",

        events: [

	]

    }).call(this);
}

view.layout = ui.extend({

    label: "Comparação de duas Correlações",
    jus: "3.0",
    type: "root",
    stage: 0, //0 - release, 1 - development, 2 - proposed
    controls: [
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			cell: {"column":0,"row":0},
			stretchFactor: 1,
			controls: [
				{
					type: DefaultControls.Label,
					typeName: 'Label',
					label: "Amostra 1",
					controls: [
						{
							type: DefaultControls.TextBox,
							typeName: 'TextBox',
							name: "r1",
							format: FormatDef.number
						},
						{
							type: DefaultControls.TextBox,
							typeName: 'TextBox',
							name: "n1",
							format: FormatDef.number
						}
					]
				}
			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			cell: {"column":1,"row":0},
			stretchFactor: 1,
			controls: [
				{
					type: DefaultControls.Label,
					typeName: 'Label',
					label: "Amostra 2",
					controls: [
						{
							type: DefaultControls.TextBox,
							typeName: 'TextBox',
							name: "r2",
							format: FormatDef.number
						},
						{
							type: DefaultControls.TextBox,
							typeName: 'TextBox',
							name: "n2",
							format: FormatDef.number
						}
					]
				}
			]
		},
		{
			type: DefaultControls.LayoutBox,
			typeName: 'LayoutBox',
			margin: "large",
			controls: [
				{
					type: DefaultControls.Label,
					typeName: 'Label',
					label: "Hipótese Alternativa"
				},
				{
					type: DefaultControls.ComboBox,
					typeName: 'ComboBox',
					name: "alt"
				}
			]
		}
	]
});

module.exports = { view : view, options: options };
