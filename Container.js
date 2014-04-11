define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/fx',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/DeferredList',
    'dojo/Deferred',
    'dojo/on',
    'dijit/_Widget',
    'dijit/_Container',
    './Slide',
    './SlideLink',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/Container.html'
], function(_require, declare, array, lang, fx, domStyle, domConstruct, query,
            DeferredList, Deferred, on, _Widget,
            _Container, Slide, SlideLink, _TemplatedMixin,
            template) {
    return declare('slideshow.Container', [ _Widget, _Container, _TemplatedMixin ], {
        templateString: template,
        height: 795,
        width: 1122,
        interval: 3000,
        controls: 'Buttons',
        autoHeight: false,
        controlsParams: {},
        _currentSlideIndex: -1,
        
        postMixInProperties: function () {
            try {
                if (!this.images) {
                    throw 'Images must be defined';
                }
            } catch (e) {
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        buildRendering: function () {
            try {
                this.inherited(arguments);
                this.loadingNode = query('.loader', this.domNode)[0];

                if (this.loadingNode) {
                    domStyle.set(this.loadingNode, 'display', '');
                    domConstruct.place(this.loadingNode, this.domNode, 'first');
                }

                var params = {'display': 'none',
                              'position': 'relative'};

                if (parseFloat(params['width']) > 0) {
                    params['width'] = this.width+'px';
                }

                if (parseFloat(params['height']) > 0) {
                    params['height'] = this.height+'px';
                }

                domStyle.set(this.containerNode, params);
            } catch (e) {
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        postCreate: function () {
            try {
                var _defArray = [];

                array.forEach(this.images, function (image) {
                    var child = null;
                    if (typeof image['href'] != 'undefined') {
                        child = new SlideLink(image);
                    } else {
                        child = new Slide(image);
                    }

                    if (this.autoHeight) {
                        child.on('resize', lang.hitch(this, function (evt) {
                            domStyle.set(this.containerNode, 'height', evt.height+'px');
                        }));
                    }

                    var _def = new Deferred();
                    child.on('load', lang.hitch(_def, 'resolve'));

                    _defArray.push(_def);
                    this.addChild(child);
                }, this);

                if (this.controls) {
                    var _controlsDef = new Deferred();
                    _defArray.push(_controlsDef);

                    _require(['./controls/'+this.controls], lang.hitch(this, function (Controls){
                        var controls = new Controls(lang.mixin(this.controlsParams, {slideshowContainer: this}));
                        controls.placeAt(this.domNode, 'last');
                        this.own(controls);
                        _controlsDef.resolve();
                    }));
                }

                var deferredList = new DeferredList(_defArray);
                deferredList.then(lang.hitch(this, '_startSlideshow'));
            } catch (e) {
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        },


        
        _runTimer: function () {
            try {
                this._timerHandle = this.defer(function (){
                    this.nextSlide();
                }, this.interval || 3000);
            } catch (e) {
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        _startSlideshow: function () {
            try {
                domStyle.set(this.containerNode, 'display', '');
                this.nextSlide();
                this.loadingNode && domStyle.set(this.loadingNode, 'display', 'none');
            } catch (e) {
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        selectSlide: function (slide) {
            try {
                var children = this.getChildren();
                array.forEach(children, function (child, index) {
                    try {
                        if (child.get('id') != slide.get('id') || index == this._currentSlideIndex) {
                            return;
                        }

                        this._timerHandle.remove();
                        children[this._currentSlideIndex].hide();
                        children[index].show();
                        this._currentSlideIndex = index;
                        this._runTimer();
                    } catch (e) {
                         console.error(this.declaredClass, arguments, e);
                         throw e;
                    }
                }, this);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },
        
        nextSlide: function () {
            try {
                var children = this.getChildren();
                
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
                console.error(this.declaredClass+' '+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});
