define([
    "dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "./_SlideMixin",
    "dojo/text!./templates/SlideLink.html"
], function(declare,  _TemplatedMixin, _SlideMixin, template) {
    return declare('slideshow.SlideLink', [ _SlideMixin, _TemplatedMixin ], {
        templateString: template
    });
});