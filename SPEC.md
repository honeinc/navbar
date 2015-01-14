/* 
        this is an api spec for our new topbar, I feel it should be pretty 
        configurable. I also feel that if done correctly we can use it to 
        replace the sidebar nav bar, main navbar, and navbar for the dashboard.
*/
 
var NavBar = require( './navbar' ); // returns a constructor.
 
/*
        Navbar constructor will take two parameters, options ( Object ) and 
        a container ( <dom node> ), container is optional in case the navbar
        needs to be appended in other then tradition methods.
        
*/
 
var nav = new NavBar( options [, container] );
 
/*
        options
                className ( String ) classes to add to main container
                contents ( Array ) array of contents objects
                        id ( String ) identifies  content for easy removal
                        content ( String | <dom node > ) the content to be added, or appended to content
                        className ( String ) class to add to content container
        returns NavBar object
                
*/
 
nav.open();
 
/*
        pretty much just adds a show class to nav and trigger open event
*/
 
nav.close();
 
/*
        removes show class and triggers close event
*/
 
nav.addContent( content, addBefore );
 
/*
        content ( Object ) is the same as above in contructor ^^^
        addBefore ( Boolean ) default is false meaning it will append the content if true it will prepend.
        returns <dom node> to content container.
*/
 
nav.removeContent( id );
 
/*
        id ( String ) is the id of the content passed from addContent, this will remove content from cache as well
        returns true if successful;
*/
 
/*
        Notes:
        we will expose a render fucntion, if we overwrite it instead of taking html in the content sections we can
        pass it template names so that dust will automatically compile templates for content.
*/
 
nav.render = templating.render.bind( templating );
 
/* 
        render function will get to params content and callback 
        the default should be super simple
*/
 
/*

Events
--------------------------------------------
opened - when nav is shown
closed - when nav is hidden
rendered - when content is rendered
rendered.{id} - when specific content is rendered
removed - when a piece of content is removed
removed.{id} - when a specific piece of content is removed

*/
 
 
 
nav.render = function( content, callback ) {
        callback( null, content );
};
 
/*
        callback expects up to two params first the error, then the output. If an error is given
        then the output is not expected to be populated. Error should allways be an Error object
        eg. new Error( 'error message' );
*/
}
