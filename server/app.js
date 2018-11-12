import express from 'express' ; 
import session from 'express-session' ; 
import mysql from 'mysql' ; 
import ejs from 'ejs' ; 
import fs from 'fs' ; 
import { PATH } from '../dir' ; 

const [ app , DIR ] = [ express() , PATH.DIR ] ; 

app.set( 'views' , __dirname + '/../html_build/' ) ; 
app.set( 'view engine' , 'ejs' ) ; 
app.engine( 'html' , require( 'ejs' ).renderFile ) ;  
app.use( '/' , express.static( __dirname + '/../html_build' )) ; 

/**
@기본 : 
app.get( '/' , ( req , res ) => {
	res.render( 'index' , {}) ; 
}) ; 
*/

/* Routing List ( get ) */
app.get( '/' , ( req , res ) => res.render( 'index' , {}) ) ; 

/* Server */
const server = app.listen( DIR.PORT , () => {
	console.log( 'Express listening on port : ' +  server.address().port) ;
}) ; 