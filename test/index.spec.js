var Navbar = require( '..' ),
    expect = require( 'expect.js' );

describe('Navbar', function() {
    
    it( 'should export a function', function(){
        expect( typeof Navbar ).to.be( 'function' );
    } );
    

    describe( ' instance', function() {
        it( 'should return a object', function() {
            var navbar = new Navbar();
            expect( typeof navbar ).to.be( 'object' );
        } );
        it ( 'should have the key el which will be a dom node', function( ) {
            var navbar = new Navbar();
            expect( typeof navbar.el ).to.be( 'object' );
            expect( typeof navbar.el.tagName ).to.be( 'string' );
        } );
        it ( 'should apply a className to `this.el` when a key className is provided', function() {
            var navbar = new Navbar( {
                className: 'hello-world'
            } );
            expect( navbar.el.classList.contains( 'hello-world' ) ).to.be( true );
        } );
        it ( 'should append `this.el` to a container when a key container in the options object is given a dom node', function() {
            var div = document.createElement( 'div' );
            var navbar = new Navbar( {
                container: div
            } );
            expect( div.childNodes.length ).to.be( 1 );
        } );

    } );


    describe( 'open', function() {
        it ( 'should add a class "show" to `this.el`', function() {
            var navbar = new Navbar();
            navbar.open();
            expect( navbar.el.classList.contains( 'show' ) ).to.be( true );
        } );

        it ( 'should emit an event "opened"', function( done ) {
            var navbar = new Navbar();
            navbar.on( 'opened', function() {
                done();
            } );
            navbar.open();
        } );
    } );

    describe( 'close', function() {
        it ( 'should remove a class "show" from `this.el`', function() {
            var navbar = new Navbar();
            navbar.open();
            navbar.close();
            expect( navbar.el.classList.contains( 'show' ) ).to.be( false );
        } );

        it ( 'should emit an event "closed"', function( done ) {
            var navbar = new Navbar();
            navbar.on( 'closed', function() {
                done();
            } );
            navbar.close();
        } );
    } );

    describe( 'addContent', function() {
        it ( 'should add an element to the `this.contentsById` object based off the id passed in content', function() {
            var navbar = new Navbar();
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            })
            expect( typeof navbar.contentsById.coolstuff ).to.be( 'object' );
        } );

        it ( 'should emit a rendered event when new content is rendered', function( done ) {
            var navbar = new Navbar();
            navbar.on( 'rendered', function( content, el ) {
                expect( typeof content ).to.be( 'object' );
                expect( typeof el ).to.be( 'object' );
                expect( el.childNodes.length ).to.be( 1 );
                expect( content.id ).to.be( 'coolstuff' );
                done();
            } );
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            } );
        } );

        it ( 'should run a render method when a string is passed in to `content.content`', function( done ) {
            var navbar = new Navbar();
            navbar.render = function(){
                done();
            }
            navbar.addContent({
                id: 'coolstuff',
                content: 'hello'
            } );
        } );
    } );

    describe( 'removeContent', function() {
        it ( 'should remove an element to the `this.contentsById` object based off the id passed in', function() {
            var navbar = new Navbar();
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            });
            navbar.removeContent( 'coolstuff' );
            expect( typeof navbar.contentsById.coolstuff ).to.be( 'undefined' );
        } );

        it ( 'should remove the ref element from `this.el` ', function() {
            var navbar = new Navbar();
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            });
            navbar.removeContent( 'coolstuff' );
            expect( navbar.el.childNodes.length ).to.be( 0 );
        } );

        it ( 'should return true if successful', function( ) {
            var navbar = new Navbar();
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            } );
            var isSuccessful = navbar.removeContent( 'coolstuff' );
            expect( isSuccessful ).to.be( true );
        } );

        it ( 'should return false if unsuccessful', function( ) {
            var navbar = new Navbar();
            var isSuccessful = navbar.removeContent( 'coolstuff' );
            expect( isSuccessful ).to.be( false );
        } );
        it ( 'should emit a removed event when content is removed', function( done ) {
            var navbar = new Navbar();
            navbar.on( 'removed', function( content, el ) {
                expect( typeof content ).to.be( 'object' );
                expect( typeof el ).to.be( 'object' );
                expect( el.tagName.toLowerCase() ).to.be( 'div' );
                expect( content.id ).to.be( 'coolstuff' );
                done();
            } );
            navbar.addContent({
                id: 'coolstuff',
                content: document.createElement( 'div' )
            } );
            navbar.removeContent( 'coolstuff' );
        } );
    } );

});
