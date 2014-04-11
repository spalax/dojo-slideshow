define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dijit/_TemplatedMixin",
    "./_SlideMixin",
    "dojo/text!./templates/Slide.html"
], function(declare, lang, domStyle,  _TemplatedMixin, _SlideMixin, template) {
    return declare('slideshow.Slide', [ _SlideMixin, _TemplatedMixin ], {
        templateString: template,

        startup: function () {
            try {
                var height = domStyle.get(this.imageNode, 'height');
                lang.hitch(this, function watchHeight (){
                    var _height = domStyle.get(this.imageNode, 'height');
                    if (_height < 1) return this.defer(watchHeight, 1);

                    if (height != _height) {
                        height = _height;
                        this.emit('resize', {height: height});
                    }
                    this.defer(watchHeight, 1);
                })();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
