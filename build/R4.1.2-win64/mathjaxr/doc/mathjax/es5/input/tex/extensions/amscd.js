!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=11)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isObject=MathJax._.components.global.isObject,exports.combineConfig=MathJax._.components.global.combineConfig,exports.combineDefaults=MathJax._.components.global.combineDefaults,exports.combineWithMathJax=MathJax._.components.global.combineWithMathJax,exports.MathJax=MathJax._.components.global.MathJax},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var TexParser_js_1=__webpack_require__(7),BaseConfiguration_js_1=__webpack_require__(8),MmlNode_js_1=__webpack_require__(9),NodeUtil_js_1=__webpack_require__(10),AmsCdMethods={};AmsCdMethods.CD=function(parser,begin){parser.Push(begin);var item=parser.itemFactory.create("array"),options=parser.configuration.options.amscd;return item.setProperties({minw:parser.stack.env.CD_minw||options.harrowsize,minh:parser.stack.env.CD_minh||options.varrowsize}),item.arraydef={columnalign:"center",columnspacing:options.colspace,rowspacing:options.rowspace,displaystyle:!0},item},AmsCdMethods.arrow=function(parser,name){var c=parser.string.charAt(parser.i);if(!c.match(/[><VA.|=]/))return BaseConfiguration_js_1.Other(parser,name);parser.i++;var first=parser.stack.Top();(!first.isKind("array")||first.Size())&&(AmsCdMethods.cell(parser,name),first=parser.stack.Top());for(var top=first,arrowRow=top.table.length%2===1,n=(top.row.length+(arrowRow?0:1))%2;n;)AmsCdMethods.cell(parser,name),n--;var mml,hdef={minsize:top.getProperty("minw"),stretchy:!0},vdef={minsize:top.getProperty("minh"),stretchy:!0,symmetric:!0,lspace:0,rspace:0};if("."===c);else if("|"===c)mml=parser.create("token","mo",vdef,"∥");else if("="===c)mml=parser.create("token","mo",hdef,"=");else{var arrow={">":"→","<":"←",V:"↓",A:"↑"}[c],a=parser.GetUpTo(name+c,c),b=parser.GetUpTo(name+c,c);if(">"===c||"<"===c){if(mml=parser.create("token","mo",hdef,arrow),a||(a="\\kern "+top.getProperty("minw")),a||b){var pad={width:".67em",lspace:".33em"};if(mml=parser.create("node","munderover",[mml]),a){var nodeA=new TexParser_js_1["default"](a,parser.stack.env,parser.configuration).mml(),mpadded=parser.create("node","mpadded",[nodeA],pad);NodeUtil_js_1["default"].setAttribute(mpadded,"voffset",".1em"),NodeUtil_js_1["default"].setChild(mml,mml.over,mpadded)}if(b){var nodeB=new TexParser_js_1["default"](b,parser.stack.env,parser.configuration).mml();NodeUtil_js_1["default"].setChild(mml,mml.under,parser.create("node","mpadded",[nodeB],pad))}parser.configuration.options.amscd.hideHorizontalLabels&&(mml=parser.create("node","mpadded",mml,{depth:0,height:".67em"}))}}else{var arrowNode=parser.create("token","mo",vdef,arrow);mml=arrowNode,(a||b)&&(mml=parser.create("node","mrow"),a&&NodeUtil_js_1["default"].appendChildren(mml,[new TexParser_js_1["default"]("\\scriptstyle\\llap{"+a+"}",parser.stack.env,parser.configuration).mml()]),arrowNode.texClass=MmlNode_js_1.TEXCLASS.ORD,NodeUtil_js_1["default"].appendChildren(mml,[arrowNode]),b&&NodeUtil_js_1["default"].appendChildren(mml,[new TexParser_js_1["default"]("\\scriptstyle\\rlap{"+b+"}",parser.stack.env,parser.configuration).mml()]))}}mml&&parser.Push(mml),AmsCdMethods.cell(parser,name)},AmsCdMethods.cell=function(parser,name){var top=parser.stack.Top();(top.table||[]).length%2===0&&0===(top.row||[]).length&&parser.Push(parser.create("node","mpadded",[],{height:"8.5pt",depth:"2pt"})),parser.Push(parser.itemFactory.create("cell").setProperties({isEntry:!0,name:name}))},AmsCdMethods.minCDarrowwidth=function(parser,name){parser.stack.env.CD_minw=parser.GetDimen(name)},AmsCdMethods.minCDarrowheight=function(parser,name){parser.stack.env.CD_minh=parser.GetDimen(name)},exports["default"]=AmsCdMethods},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AmsCdConfiguration=void 0;var Configuration_js_1=__webpack_require__(3);__webpack_require__(4),exports.AmsCdConfiguration=Configuration_js_1.Configuration.create("amscd",{handler:{character:["amscd_special"],macro:["amscd_macros"],environment:["amscd_environment"]},options:{amscd:{colspace:"5pt",rowspace:"5pt",harrowsize:"2.75em",varrowsize:"1.75em",hideHorizontalLabels:!1}}})},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Configuration=MathJax._.input.tex.Configuration.Configuration,exports.ConfigurationHandler=MathJax._.input.tex.Configuration.ConfigurationHandler,exports.ParserConfiguration=MathJax._.input.tex.Configuration.ParserConfiguration},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var sm=__webpack_require__(5),ParseMethods_js_1=__webpack_require__(6),AmsCdMethods_js_1=__webpack_require__(1);new sm.EnvironmentMap("amscd_environment",ParseMethods_js_1["default"].environment,{CD:"CD"},AmsCdMethods_js_1["default"]),new sm.CommandMap("amscd_macros",{minCDarrowwidth:"minCDarrowwidth",minCDarrowheight:"minCDarrowheight"},AmsCdMethods_js_1["default"]),new sm.MacroMap("amscd_special",{"@":"arrow"},AmsCdMethods_js_1["default"])},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbstractSymbolMap=MathJax._.input.tex.SymbolMap.AbstractSymbolMap,exports.RegExpMap=MathJax._.input.tex.SymbolMap.RegExpMap,exports.AbstractParseMap=MathJax._.input.tex.SymbolMap.AbstractParseMap,exports.CharacterMap=MathJax._.input.tex.SymbolMap.CharacterMap,exports.DelimiterMap=MathJax._.input.tex.SymbolMap.DelimiterMap,exports.MacroMap=MathJax._.input.tex.SymbolMap.MacroMap,exports.CommandMap=MathJax._.input.tex.SymbolMap.CommandMap,exports.EnvironmentMap=MathJax._.input.tex.SymbolMap.EnvironmentMap},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.ParseMethods["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.TexParser["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Other=MathJax._.input.tex.base.BaseConfiguration.Other,exports.BaseTags=MathJax._.input.tex.base.BaseConfiguration.BaseTags,exports.BaseConfiguration=MathJax._.input.tex.base.BaseConfiguration.BaseConfiguration},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TEXCLASS=MathJax._.core.MmlTree.MmlNode.TEXCLASS,exports.TEXCLASSNAMES=MathJax._.core.MmlTree.MmlNode.TEXCLASSNAMES,exports.indentAttributes=MathJax._.core.MmlTree.MmlNode.indentAttributes,exports.AbstractMmlNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlNode,exports.AbstractMmlTokenNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlTokenNode,exports.AbstractMmlLayoutNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlLayoutNode,exports.AbstractMmlBaseNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlBaseNode,exports.AbstractMmlEmptyNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlEmptyNode,exports.TextNode=MathJax._.core.MmlTree.MmlNode.TextNode,exports.XMLNode=MathJax._.core.MmlTree.MmlNode.XMLNode},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.NodeUtil["default"]},function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function rename(oname,nname,options){var tex=MathJax.config.tex;if(tex&&tex.packages){var packages=tex.packages,n=packages.indexOf(oname);n>=0&&(packages[n]=nname),options&&tex[oname]&&(Object(global.combineConfig)(tex,_defineProperty({},nname,tex[oname])),delete tex[oname])}}__webpack_require__.r(__webpack_exports__);var global=__webpack_require__(0),AmsCdConfiguration=__webpack_require__(2),AmsCdMethods=__webpack_require__(1);Object(global.combineWithMathJax)({_:{input:{tex:{amscd:{AmsCdConfiguration:AmsCdConfiguration,AmsCdMethods:AmsCdMethods}}}}}),rename("amsCd","amscd",!0)}]);
