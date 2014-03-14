dojo-slideshow
==============

Simple slideshow with fading effect

Put project files to directory which could be accessed
thru web server  http://your.domain/js/modules/front

Usage Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
      dojoConfig = {
          parseOnLoad: true,
          async: true
      };
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.2/dojo/dojo.js"></script>
</head>
<body>
  <div data-dojo-type="dojo-slideshow/Container"
           data-dojo-props='images:[{"src":"/images/slideshow/1.svg","label":"Cherry"},
                                    {"src":"/images/slideshow/2.svg","label":"Apple"},
                                    {"src":"/images/slideshow/3.svg","label":"Banana"},
                                    {"src":"/images/slideshow/4.svg","label":"Strawberry"}],
                            controlsParams: {"class": "buttons-control"},
                            controls: "Buttons"'></div>
</body>
</html>
```
