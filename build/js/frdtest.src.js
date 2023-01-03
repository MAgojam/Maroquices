
// This file is an automatically generated and should not be edited

'use strict';

const options = [{"name":"data","type":"Data"},{"name":"vars","title":"Medidas Repetidas","type":"Variables","required":true,"suggested":["continuous","ordinal"],"permitted":["numeric"],"description":{"ui":"As medidas repetidas. Têm que ser pelo menos ordinal.\n","R":"As medidas repetidas. Têm que ser pelo menos ordinal.\n"}},{"name":"posts","title":"Testes Post-hoc","type":"List","options":["Nenhum","Dunn","Durbin-Conover"],"default":"Nenhum","description":{"ui":"Faz testes post-hoc.\n","R":"Teste de Dunn sem correção e com correção a escolher (Bonferroni-Dunn é a mais usual)\n"}},{"name":"method","title":"Correção p-value","type":"List","options":[{"title":"Bonferroni","name":"bonferroni"},{"title":"Holm","name":"holm"},{"title":"Benjamini e Hochberg","name":"BH"}],"default":"bonferroni"}];

const view = function() {
    
    this.handlers = { }

    View.extend({
        jus: "3.0",

        events: [

	]

    }).call(this);
}

view.layout = ui.extend({

    label: "Teste de Friedman com Post-Hocs",
    jus: "3.0",
    type: "root",
    stage: 0, //0 - release, 1 - development, 2 - proposed
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
					label: "Medidas Repetidas",
					controls: [
						{
							type: DefaultControls.VariablesListBox,
							typeName: 'VariablesListBox',
							name: "vars",
							isTarget: true
						}
					]
				}
			]
		},
		{
			type: DefaultControls.CollapseBox,
			typeName: 'CollapseBox',
			label: "Testes Post-Hoc",
			collapsed: true,
			stretchFactor: 1,
			controls: [
				{
					type: DefaultControls.LayoutBox,
					typeName: 'LayoutBox',
					margin: "large",
					stretchFactor: 1,
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
									label: "Testes Post-Hoc",
									controls: [
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "nenhum",
											optionName: "posts",
											optionPart: "Nenhum",
											label: "Nenhum"
										},
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "dunn",
											optionName: "posts",
											optionPart: "Dunn",
											label: "Dunn"
										},
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "durbin",
											optionName: "posts",
											optionPart: "Durbin-Conover",
											label: "Durbin-Conover"
										}
									]
								}
							]
						}
					]
				},
				{
					type: DefaultControls.LayoutBox,
					typeName: 'LayoutBox',
					margin: "large",
					stretchFactor: 1,
					controls: [
						{
							type: DefaultControls.LayoutBox,
							typeName: 'LayoutBox',
							cell: {"column":0,"row":0},
							stretchFactor: 1,
							controls: [
								{
									type: DefaultControls.ComboBox,
									typeName: 'ComboBox',
									name: "method"
								}
							]
						}
					]
				}
			]
		}
	]
});

module.exports = { view : view, options: options };
