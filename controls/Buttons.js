define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/on",
    "dojo/text!./templates/Buttons.html"
], function(declare, lang, array, _Widget, _TemplatedMixin, domConstruct, domClass, on, template) {
    return declare('slideshow.controls.Buttons', [ _Widget, _TemplatedMixin ], {
        templateString: template,
        buttonClass: 'btn',
        activityClass: 'active',

        _buttons: [],

        postMixInProperties: function () {
            try {
                if (!this.slideshowContainer || !this.slideshowContainer.getChildren) {
                    throw "Slideshow container must be given";
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        postCreate: function () {
            try {
                var slides = this.slideshowContainer.getChildren();
                array.forEach(slides, function (slide) {
                    var span = domConstruct.create('span', {'class': this.buttonClass,
                                                            'innerHTML': slide.get('label')},
                                                   this.domNode);

                    this._buttons.push(span);

                    // When slide is show, activate attached button
                    this.own(on(slide, 'show', lang.hitch(this, function (span){
                        try {
                            array.forEach(this._buttons, function (button){
                                domClass.remove(button, this.activityClass);
                            }, this);
                            domClass.add(span, this.activityClass);
                        } catch (e) {
                            console.error(this.declaredClass, arguments, e);
                            throw e;
                        }
                    }, span)));

                    // When button is clicked select attached slide
                    this.own(on(span, 'click', lang.hitch(this, function (slide) {
                        try {
                            this.slideshowContainer.selectSlide(slide);
                        } catch (e) {
                             console.error(this.declaredClass, arguments, e);
                             throw e;
                        }
                    }, slide)));
                }, this);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
