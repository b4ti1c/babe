angular.module('sampleApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/example/example.html',
    "<input type=\"text\" ng-model=\"name\" ng-init=\"name = 'Anonymous User'\"/>\n" +
    "<p>Hello {{name}}</p>\n" +
    "<p>Reversed: {{reversedName}}</p>\n" +
    "<button ng-click='playSound()'>Play Sound</button>\n" +
    "<p>Example with parameterize module<br>Parameterized: {{parameterizedName}}</p>\n" +
    "<p>Another example with nodejs' http module:</p>\n" +
    "<button ng-click='lookup()'>Get Your IP</button>\n" +
    "<span>IP: {{ip}}</span>\n"
  );

}]);
