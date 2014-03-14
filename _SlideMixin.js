define([
    "dojo/_base/declare",
    "dojo/_base/fx",
    "dijit/_Widget",
    "dojo/dom-style"
], function(declare, fx, _Widget, domStyle) {
    return declare('slideshow._SlideMixin', [ _Widget ], {

        postCreate: function () {
            try {
                domStyle.set(this.domNode, {'opacity': '0',
                                            'display':'none',
                                            'top': '0px',
                                            'position': 'absolute'});
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        onShow: function(){},
        onLoad: function(){},
        
        hide: function () {
            try {
                var node = this.domNode;
                fx.animateProperty({
                    node: node, duration: 1000,
                    properties: {
                      opacity: { start: "1", end: "0" }
                    }, 
                    onEnd: function(){
                        domStyle.set(node, 'display', 'none');
                    },
                    rate: 5
                  }).play();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        show: function () {
            try {
                var node = this.domNode;
                domStyle.set(node, 'display', '');
                
                fx.animateProperty({
                    node: node, duration: 2000,
                    properties: {
                        opacity: { start: "0", end: "1" }
                    },
                    rate: 5
                }).play();

                this.onShow();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        isShowing: function () {
            try {
                return !!domStyle.get(this.domNode, 'opacity');
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});
