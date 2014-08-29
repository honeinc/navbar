## Sidebar

This is a navbar that controls differnt sets of content. It is very simple by nature. 
[![Build Status](https://travis-ci.org/honeinc/navbar.svg?branch=master)](https://travis-ci.org/honeinc/navbar)

### Install

    $ component install honeinc/navbar

### Usage

__coming soon__

### Api

__coming soon__

### Development

The development process is a little rough right now, but essentially you will need [`component`](https://github.com/component/component) & [`less`](https://github.com/less/less.js).

##### Download Files

    $ git clone https://github.com/honeinc/navbar.git
    $ cd navbar

Next if your making a css change and have `less`.

    $ lessc style.less > style.css

Then you need to test you can do this by using the example directory but you will need to symlink the directory into you components to see the changes. Some of this info may differ due to `component` version and `os`.

    $ cd example
    $ component install
    $ rm -r components/honeinc-navbar 
    $ ln -s ~/path-to/sidebar ~/path-to/sidebar/example/components/honeinc-navbar
    $ component build
    $ open index.html

Now to see changes all you need to do is rebuild

    $ component build

and refresh!

#### Testing

To run the test you will need to install all dependecies, you will need [`nodejs`](http://nodejs.org) as well as [`npm`](http://npmjs.org). Then in the root of the directory run.

    $ npm install

Next you will need a built version to run in the `runner.html` to do this run.

    $ component install
    $ component build

This should install everything and then open up the runner file. This command may differ from system to system.

    $ open tests/runner.html

Once you change the files you will need to run `component build` again to see the changes in the test.

##### Have a issue? report it in the issues tab.
