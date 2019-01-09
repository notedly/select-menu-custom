import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { SelectBox } from './ui/common' ;

let sltMenus = {
	data : [
		{ value : 'title' , title : '제목' } ,
		{ value : 'number' , title : '번호' } ,
		{ value : 'writer' , title : '작성자' } ,
		{ value : 'date' , title : '날짜' } ,
		{ value : 'text' , title : '내용' } ,
	]
}

localStorage.setItem('sltData', JSON.stringify(sltMenus.data));

window.addEventListener('load', function(){

	let data = JSON.parse(localStorage.getItem('sltData')) ;

	render( <SelectBox
		initSltNum='1'
		opts={ {dir : 'down' , scroll : false ,	viewNum : 3} }
		options={ data }
		/> ,
		document.querySelector('.wrap')
	) ;

}) ;







