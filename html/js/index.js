import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { SelectBox } from './ui/common' ;

let sltMenus = {
	data : [
		{ value : 'title' , title : 'Lorem ipsum' } ,
		{ value : 'number' , title : 'dolor sit amet' } ,
		{ value : 'writer' , title : 'consectetur' } ,
		{ value : 'date' , title : 'adipisicing' } ,
		{ value : 'text' , title : 'elit' } ,
	]
}

localStorage.setItem('sltData', JSON.stringify(sltMenus.data));

window.addEventListener('load', function(){

	let data = JSON.parse(localStorage.getItem('sltData')) ;

	render( <SelectBox
		initSltNum='1'
		opts={ {dir : 'down' , scroll : false ,	viewNum : 3} }
		menus={ data }
		/> ,
		document.querySelector('.wrap')
	) ;

}) ;







