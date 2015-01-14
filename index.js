
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

module.exports = Navbar;

/*
    Navbar constructor will take one parameter, the options ( Object );
    options are 
        options.className ( String ) to add class name to admin element
        options.container ( <dom node> ) optional a node to append main element to
        
*/

function Navbar( options ) {

    options = options || {};
    this.contentsById = {};

    EventEmitter.call( this ); // inheriting component
    this.el = document.createElement( 'div' );
    this.el.className = options.className;
    this.el.setAttribute( 'data-navbar', '' );

    if ( options.container ) {
        options.container.appendChild( this.el );
    }
}

Navbar.prototype = Object.create( EventEmitter.prototype ) 

/*
    pretty much just adds a show class to nav and trigger open event
*/

Navbar.prototype.open =  function() {
    this.state = 1;
    this.el.classList.add( 'show' );
    this.emit( 'opened' );
};

/*
    removes show class and triggers close event
*/

Navbar.prototype.close = function() {
    this.state = 0;
    this.el.classList.remove( 'show' );
    this.emit( 'closed' );
};

/*
    this method is here to be overwritten but will allow for programs not to break when passing in html
    expects to get a new Error( '...' ) in first param of callback if there is an error and then
    output ( String ) in the second param, if error is present no output is expected
*/

Navbar.prototype.render = function( content, callback ) {
    callback( null, content );
};

/*
    content ( Object ) is the same as above in contructor ^^^
    addBefore ( Boolean ) default is false meaning it will append the content if true it will prepend.
    returns <dom node> to content container.
*/

Navbar.prototype.addContent = function( content, addBefore ) {

    if ( !content ) {
        this.emit( 'error', new Error( 'Navbar::addContent require an content' ) );
        return;
    }

    var el = document.createElement( 'div' ),
        container = this.el,
        emit = this.emit.bind( this );

    function addNode ( _el, _container ) {
        _container.appendChild( _el )
    }

    function emitRendered( ) {
        emit( 'rendered', content, el );
        emit( 'rendered.' + content.id, content, el );
    }


    function handleRender( error, output ) {
        if ( error ) {
            this.emit( 'error', error );
            return;
        }
        el.innerHTML = output;
        addNode( el, container );
        emitRendered( );
    }

    if( this.contentsById[ content.id ] ) {
        this.el.removeChild( this.contentsById[ content.id ] );
    }

    this.contentsById[ content.id ] = el;

    if ( typeof content.content === 'string' ) {
        this.render( content, handleRender );
        return;
    } 

    el.appendChild( content.content );
    addNode( el, container );
    emitRendered( );
};

/*
    id ( String ) is the id of the content passed from addContent, this will remove content from cache as well
    returns true if successful;
*/

Navbar.prototype.removeContent = function( id ) {
    var el = this.contentsById[ id ],
        container = this.el,
        content = {};

    if ( !el ) {
        return false;
    }

    this.el.removeChild( el );
    delete this.contentsById[ id ];
    content.id = id;

    this.emit( 'removed', content, el );
    this.emit( 'removed' + id, content, el );

    return true;
};
