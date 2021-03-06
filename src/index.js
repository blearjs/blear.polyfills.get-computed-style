// IE9 支持
// 'use strict';
//
//
// if (typeof CLASSICAL !== 'undefined' && CLASSICAL === true) {
//     /**
//      * A polyfill to support computed styles in IE < 9
//      *
//      * NOTE this is taken directly from https://github.com/jonathantneal/polyfill
//      */
//     var getComputedStylePixel = function getComputedStylePixel(element, property, fontSize) {
//         element.document; // Internet Explorer sometimes struggles to read currentStyle until the element's document is accessed.
//
//         var
//             value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
//             size = value[1],
//             suffix = value[2],
//             rootSize;
//
//         fontSize = !fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
//         rootSize = property === 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;
//
//         return suffix === '%' ? size / 100 * rootSize :
//             suffix === 'cm' ? size * 0.3937 * 96 :
//                 suffix === 'em' ? size * fontSize :
//                     suffix === 'in' ? size * 96 :
//                         suffix === 'mm' ? size * 0.3937 * 96 / 10 :
//                             suffix === 'pc' ? size * 12 * 96 / 72 :
//                                 suffix === 'pt' ? size * 96 / 72 :
//                                     size;
//     };
//
//     var setShortStyleProperty = function setShortStyleProperty(style, property) {
//         var
//             borderSuffix = property === 'border' ? 'Width' : '',
//             t = property + 'Top' + borderSuffix,
//             r = property + 'Right' + borderSuffix,
//             b = property + 'Bottom' + borderSuffix,
//             l = property + 'Left' + borderSuffix;
//
//         style[property] = (style[t] === style[r] && style[t] === style[b] && style[t] === style[l] ? [style[t]] :
//             style[t] === style[b] && style[l] === style[r] ? [style[t], style[r]] :
//                 style[l] === style[r] ? [style[t], style[r], style[b]] :
//                     [style[t], style[r], style[b], style[l]]).join(' ');
//     }
//
//     // <CSSStyleDeclaration>
//     var CSSStyleDeclaration = function CSSStyleDeclaration(element) {
//         var
//             style = this,
//             currentStyle = element.currentStyle,
//             fontSize = getComputedStylePixel(element, 'fontSize'),
//             unCamelCase = function (match) {
//                 return '-' + match.toLowerCase();
//             },
//             property;
//
//         for (property in currentStyle) {
//             Array.prototype.push.call(style, property === 'styleFloat' ? 'float' : property.replace(/[A-Z]/, unCamelCase));
//
//             // 不需要重写 css width
//             //if (property === 'width') {
//             //    style[property] = element.offsetWidth + 'px';
//             //} else if (property === 'height') {
//             //    style[property] = element.offsetHeight + 'px';
//             //} else
//
//             if (property === 'styleFloat') {
//                 style.float = currentStyle[property];
//             } else if (/margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
//                 style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
//             } else if (/^outline/.test(property)) {
//                 // errors on checking outline
//                 try {
//                     style[property] = currentStyle[property];
//                 } catch (error) {
//                     style.outlineColor = currentStyle.color;
//                     style.outlineStyle = style.outlineStyle || 'none';
//                     style.outlineWidth = style.outlineWidth || '0px';
//                     style.outline = [style.outlineColor, style.outlineWidth, style.outlineStyle].join(' ');
//                 }
//             } else {
//                 style[property] = currentStyle[property];
//             }
//         }
//
//         setShortStyleProperty(style, 'margin');
//         setShortStyleProperty(style, 'padding');
//         setShortStyleProperty(style, 'border');
//
//         style.fontSize = Math.round(fontSize) + 'px';
//     };
//
//     CSSStyleDeclaration.prototype = {
//         constructor: CSSStyleDeclaration,
//         //// <CSSStyleDeclaration>.getPropertyPriority
//         //getPropertyPriority: function () {
//         //    throw new Error('NotSupportedError: DOM Exception 9');
//         //},
//         // <CSSStyleDeclaration>.getPropertyValue
//         getPropertyValue: function (property) {
//             switch (property) {
//                 // opacity: alpha(opacity=50);
//                 case 'opacity':
//                     property = 'filter';
//                     break;
//             }
//
//             property = property.replace(/-\w/g, function (match) {
//                 return match[1].toUpperCase();
//             });
//
//             var value = this[property];
//
//             switch (property) {
//                 // filter: alpha(opacity=50);
//                 case 'filter':
//                     value.replace(/opacity=([\d.]+)/, function (source, opacity) {
//                         value = String(opacity / 100);
//                     });
//                     break;
//             }
//
//             return value;
//         }
//         //// <CSSStyleDeclaration>.item
//         //item: function (index) {
//         //    return this[index];
//         //},
//         //// <CSSStyleDeclaration>.removeProperty
//         //removeProperty: function () {
//         //    throw new Error('NoModificationAllowedError: DOM Exception 7');
//         //},
//         //// <CSSStyleDeclaration>.setProperty
//         //setProperty: function () {
//         //    throw new Error('NoModificationAllowedError: DOM Exception 7');
//         //},
//         //// <CSSStyleDeclaration>.getPropertyCSSValue
//         //getPropertyCSSValue: function () {
//         //    throw new Error('NotSupportedError: DOM Exception 9');
//         //}
//     };
//
//     if (!window.getComputedStyle) {
//         // <window>.getComputedStyle
//         window.getComputedStyle = function (element) {
//             return new CSSStyleDeclaration(element);
//         };
//     }
// }