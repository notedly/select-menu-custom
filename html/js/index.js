import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { Common } from './ui/common' ;

/*
class A {
    constructor () {
        this.B = class {
            echo () {
                console.log('I am B class');
            }
        }
    }
    echo () {
        this.b = new this.B;
        this.b.echo();
    }
}

var a = new A;

a.echo();
*/



const SelectMenuCustomModule = ( opts ) => {

	class SelectMenuCustom {
		constructor( selectTarget ){

			this._elem = {}, this._obj = {}, this._opt = {} ;

			this._elem.originSelect = selectTarget ,
			this._elem.newWrapper, this._elem.newBox, this._elem.newBth  ;
			this._obj.itemArr = [], this._obj.crntSelect ,
			this._obj.sltOpt = this._elem.originSelect.querySelectorAll('option') ,
			this._opt.prevIdx = 0, this._opt.activeClass = 'active' ;

			console.log( 'this._elem.originSelect :', this._elem.originSelect ) ;

			this._elem.originSelect.style.display = 'none' ;
			this.init() ;

		}
		init(){

			let _this = this ;

			for( let i=0; i<this._obj.sltOpt.length; i++ ) {
				if( this._obj.sltOpt[i].selected ) {
					this._opt.prevIdx = i ;
				}
				this._obj.itemArr[i] = {
					title : this._obj.sltOpt[i].firstChild.textContent ,
					value : this._obj.sltOpt[i].value ,
					selected : this._obj.sltOpt[i].selected ,
				}
			}

			let newSelectBox = this.makeNewSelectBox( this._obj.itemArr ) ;
			this._elem.originSelect.parentNode.insertBefore( newSelectBox , this._elem.originSelect.nextSibling ) ;

			this._elem.originSelect.addEventListener('change', function() {
				_this.selectItem( this.selectedIndex ) ;
			}) ;

		}

		makeNewSelectBox( items ) {
			console.log( 'makeNewSelectBox in', items ) ;
			this._elem.newWrapper = document.createElement('div') ;
			this._elem.newWrapper.classList.add('custom_select_box') ;

			this._elem.newBox = document.createElement('div') ;
			this._elem.newBtn = document.createElement('button') ;
			this._elem.newBtn.classList.add('btn_select_box') ;

			let crntSelected = items.filter( item => item.selected ) ;
			this._elem.newBtn.textContent = crntSelected.length > 0 ? crntSelected[0].title : '선택' ;

			this._elem.newBtn.addEventListener( 'click', () => this.selectToggle() ) ;

			items.forEach(( item, idx ) => {
				let subItem = document.createElement('button') ;
				subItem.textContent = item.title ;
				subItem.setAttribute('data-value', item.value ) ;
				this._elem.newBox.appendChild( subItem ) ;

				subItem.addEventListener('click', () => this.selectItem( idx ) ) ;
			}) ;

			this._elem.newWrapper.appendChild( this._elem.newBtn ) ;
			this._elem.newWrapper.appendChild( this._elem.newBox ) ;

			return this._elem.newWrapper ;

		}

		selectToggle(){

			this._elem.newWrapper.classList.contains( this._opt.activeClass ) ? this._elem.newWrapper.classList.remove( this._opt.activeClass ) : this._elem.newWrapper.classList.add( this._opt.activeClass ) ;

		}

		selectItem( crntIdx ){

			this._obj.crntSelect = this._obj.itemArr[crntIdx] ;
			this._elem.originSelect.selectedIndex = crntIdx ;
			this._obj.itemArr[this._opt.prevIdx].selected = false ;
			this._obj.itemArr[crntIdx].selected = true ;
			this._elem.newBtn.textContent = this._obj.itemArr[crntIdx].title ;
			this._opt.prevIdx = crntIdx ;
			if( this._elem.newWrapper.classList.contains( this._opt.activeClass ) ) this.selectToggle() ;

		}

	}

	(() => {
		let slctBoxs = null ;
		if ( opts ) {

			console.log( 'sure' ) ;
			new SelectMenuCustom( opts ) ;

		} else {

			console.log( 'not' ) ;
			slctBoxs = document.querySelectorAll( 'select' ) ;
			[].forEach.call( slctBoxs , slctBox => {
				new SelectMenuCustom( slctBox ) ;
			}) ;

		}
	})() ;
} ;


window.addEventListener('load', function(){
	// let slt01 = new SelectMenuCustom( document.querySelector('.wrap_slt > select') ) ;
	// let slt02 = new SelectMenuCustom( document.querySelector('.select02 > select') ) ;

	// let slt02 = new SelectMenuCustom( document.querySelectorAll('.custom_select') ) ;

	// SelectMenuCustomModule( document.querySelector('.wrap_slt > select') ) ;
	SelectMenuCustomModule() ;


	// { 옵션 넘긴다 }


}) ;