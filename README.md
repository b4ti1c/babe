# babe
##babe - Browserify + Angularjs + Babel + Ecmascript 6
As the name suggests, babe is a boilerplate for writing ES6 code with AngularJS framework. Browserify lets you `require` npm packages in your angularjs modules.

Babe provides a simple and practical folder hierarchy for your angularjs project, and a gruntfile to build it. 

##Installation

    git clone https://github.com/batilc1/babe.git
    npm install

And there you have a working Babe project! You should rename the page title in index.html and angularjs module name 'sampleApp' to your desired project name. You should also rename the babe folder and check it out in your own repo.

##Testing 

When you are ready for testing, type:

```grunt build```

If you like grunt watchers, Babe provides one. 

```grunt build watch```

or simply

```grunt```

Grunt creates temporary files while transpiling and browserifying. If you ever need those files, type:

```grunt build-noclean```

The temporary files will be located in `dist/temp` folder.

You need to serve index.html with a basic http-server. If not installed, do:

```npm install http-server -g```

Then,

    cd babe/dist
    http-server

Navigate to localhost with your browser and you should be seeing babe in action!

##Notes

SampleApp includes two basic `require` examples for demonstration purposes. Http-get and parameterize libraries are safe to remove (as well as the parameterize dependency in package.json).

In ES6 syntax, import statements change. If you are importing a basic function such as `parameterize` you should import it as:

```import parameterize from 'parameterize'```

If you are `require`ing an object such http module in npm, then go with:

```import * as http from 'http'```

Browserify does not support many of the native nodejs modules such as the most commonly used node library fs. You should look at [browserify-fs](https://github.com/mafintosh/browserify-fs) library to have fs work in your browser.

##To-do

If you wish grunt to watch, you need to forgo -noclean option for now.

Moreover, babe does not include a debug building option yet. You can look inside source-maps for babel and browserify, but they are not natively supported. And arguably the most important of all, there's not a symlink process for insta testing. You should build every time you change a file (or let watch do its magic)...