
// This file is an automatically generated and should not be edited

'use strict';

const options = [{"name":"data","type":"Data"},{"name":"dep","title":"Variável Dependente","type":"Variable","required":true,"suggested":["continuous","ordinal"],"permitted":["numeric"],"description":{"ui":"A variável dependente. Tem que ser pelo menos ordinal.\n","R":"A variável dependente. Tem que ser pelo menos ordinal.\n"}},{"name":"group","title":"Variável de Agrupamento","type":"Variable","required":true,"suggested":["nominal","ordinal"],"description":{"ui":"A variável independente. Nominal ou ordinal.\n","R":"A variável independente. Nominal ou ordinal..\n"}},{"name":"posts","title":"Testes Post-hoc","type":"List","options":["Nenhum","Dunn","Iman-Conover","DSCF"],"default":"Nenhum","description":{"ui":"Faz testes post-hoc.\n","R":"Teste de Dunn sem correção e com correção a escolher (Bonferroni-Dunn é a mais usual)\n"}},{"name":"method","title":"Correção p-value de Dunn/Iman","type":"List","options":[{"title":"Bonferroni","name":"bonferroni"},{"title":"Sidak","name":"sidak"},{"title":"Holm","name":"holm"}],"default":"bonferroni"}];

const view = function() {
    
    this.handlers = { }

    View.extend({
        jus: "3.0",

        events: [

	]

    }).call(this);
}

view.layout = ui.extend({

    label: "ANOVA em Ordens de Kruskal-Wallis com testes Post-hoc",
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
					label: "Variável Dependente",
					controls: [
						{
							type: DefaultControls.VariablesListBox,
							typeName: 'VariablesListBox',
							name: "dep",
							maxItemCount: 1,
							isTarget: true
						}
					]
				},
				{
					type: DefaultControls.TargetLayoutBox,
					typeName: 'TargetLayoutBox',
					label: "Variável de Agrupamento",
					controls: [
						{
							type: DefaultControls.VariablesListBox,
							typeName: 'VariablesListBox',
							name: "group",
							maxItemCount: 1,
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
											name: "postsNenhum",
											optionName: "posts",
											optionPart: "Nenhum",
											label: "Nenhum"
										},
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "postsDunn",
											optionName: "posts",
											optionPart: "Dunn",
											label: "Dunn"
										},
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "postsImanConover",
											optionName: "posts",
											optionPart: "Iman-Conover",
											label: "Iman-Conover"
										},
										{
											type: DefaultControls.RadioButton,
											typeName: 'RadioButton',
											name: "postsDSCF",
											optionName: "posts",
											optionPart: "DSCF",
											label: "DSCF"
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
