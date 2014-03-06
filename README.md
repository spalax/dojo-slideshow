dojo-slideshow
==============

Simple slideshow with fading effect

Put project files to directory which could be accessed
thru web server  http://your.domain/js/modules/front

# Installation

## Automatic Download with Bower

dojo-slideshow can be installed via [Bower](https://github.com/bower/bower)
using the following command:

    bower install dojo-slideshow

## Usage Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
      dojoConfig = {
          parseOnLoad: true,
          packages: [
              {
                  name: "front",
                  location: "/js/modules/front"
              }
          ]
      };
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.2/dojo/dojo.js"></script>
</head>
<body>
  <div data-dojo-type="front/slideshow/Container" 
       data-dojo-props='images:[{"src":"/images/slideshow/1.png","label":"Cherry"},
                                {"src":"/images/slideshow/2.png","label":"Apple"}]'></div>
</body>
</html>
```
