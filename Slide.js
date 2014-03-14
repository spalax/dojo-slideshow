define([
    "dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "./_SlideMixin",
    "dojo/text!./templates/Slide.html"
], function(declare,  _TemplatedMixin, _SlideMixin, template) {
    return declare('slideshow.Slide', [ _SlideMixin, _TemplatedMixin ], {
        templateString: template
    });
});