define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/_base/fx",
    "dojo/dom-style",
    "dojo/query",
    "dijit/_Widget",
    "dijit/_Container",
    "./Slide",
    "./SlideLink",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, array, lang, fx, domStyle, query, _Widget,
            _Container, Slide, SlideLink, _TemplatedMixin,
            template) {
    return declare('slideshow.Container', [ _Widget, _Container, _TemplatedMixin ], {
        templateString: template,
        height: 795,
        width: 1122,
        loading: true,
        _currentSlideIndex: -1,
        
        postMixInProperties: function () {
            try {
                if (!this.images) {
                    throw "Images must be defined";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        buildRendering: function () {
            try {
                this.inherited(arguments);
                this.loadingNode = query('.loader', this.domNode)[0];

                if (this.loadingNode) {
                    domStyle.set(this.loadingNode, 'display', '');
                }

                domStyle.set(this.containerNode, {'display': 'none',
                                                  'height': this.height+'px',
                                                  'width': this.width+'px',
                                                  'position': 'relative'});
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        postCreate: function () {
            try {
                array.forEach(this.images, function (image) {
                    var child = null;
                    if (typeof image['href'] != 'undefined') {
                        child = new SlideLink(image);
                    } else {
                        child = new Slide(image);
                    }

                    child.on('load', lang.hitch(this, '_loaded'));
                    this.addChild(child);
                }, this);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        _runTimer: function () {
            try {
                this.__timeout = setTimeout(lang.hitch(this, function (){
                   this.nextSlide();
                }), 3000);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        _loaded: function () {
            try {
                if (!this.__imagesLoaded) this.__imagesLoaded = 0;
                if (++this.__imagesLoaded >= this.getChildren().length) {
                    this._startSlideshow();
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        _startSlideshow: function () {
            try {
                this.loadingNode && domStyle.set(this.loadingNode, 'display', 'none');
                domStyle.set(this.containerNode, 'display', '');
                this.nextSlide();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        nextSlide: function () {
            try {
                var children = this.getChildren();
                var hideIndex = 0;
                
                if (this._currentSlideIndex != -1) {
                    children[this._currentSlideIndex].hide();
                    if (this._currentSlideIndex+1 >= children.length) {
                        this._currentSlideIndex = 0;
                    } else {
                        this._currentSlideIndex++;
                    }
                } else {
                    this._currentSlideIndex = 0;
                }
                
                children[this._currentSlideIndex].show();
                this._runTimer();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});