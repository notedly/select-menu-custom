import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { Common } from './ui/common' ;

window.addEventListener('load', function(){

	let customSelect01 = Common.SelectMenuCustomModule(
		document.querySelector('.select_rel_site') ,
	) ;

	let customSelect02 = Common.SelectMenuCustomModule( document.querySelector('.select_board_search') , {
			dir : 'down' ,
			scroll : true ,
			viewNum : 3 ,
		}) ;


	document.querySelector('.btn_set_select').addEventListener('click', () => {
		customSelect01.selectIdx = 0 ;
	}) ;
	document.querySelector('.btn_get_value').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.value ) ;
	}) ;
	document.querySelector('.btn_get_idx').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.idx ) ;
	}) ;
	document.querySelector('.btn_get_title').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.title ) ;
	}) ;



}) ;