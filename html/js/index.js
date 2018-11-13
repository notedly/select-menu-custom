import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { Common } from './ui/common' ;

const SelectMenuCustomModule = ( target, opts ) => {

	class SelectMenuCustom {
		constructor( target, opts ){

			this._opts = opts || {} ;

			this.originSelect = target, this.newWrapper, this.newElem, this.newBox, this.newBth, this.itemArr = [],	this.crntSelect ,
			this.prevIdx = 0,	this.activeClass = 'active' ,
			this.sltOpt = this.originSelect.querySelectorAll('option') ;
			this._opts.dir = this._opts.dir || 'down' ;

			this.originSelect.style.display = 'none' ;
			this.init() ;

		}
		init(){

			let _this = this ;

			for( let i=0; i<this.sltOpt.length; i++ ) {

				if( this.sltOpt[i].selected ) {
					this.prevIdx = i ;
				}

				this.itemArr[i] = {
					title : this.sltOpt[i].firstChild.textContent ,
					value : this.sltOpt[i].value ,
					selected : this.sltOpt[i].selected ,
				}

			}

			let newSelectBox = this.makeNewSelectBox( this.itemArr ) ;
			// this.originSelect.parentNode.insertBefore( newSelectBox , this.originSelect.nextSibling ) ;
			this.originSelect.parentNode.insertAdjacentHTML( 'beforeend', newSelectBox ) ;

			[].forEach.call( this.newBox.querySelectorAll('button'), (item, idx) =>{
				item.addEventListener('click', () => this.selectItem( idx ) )
			}) ;


			this.originSelect.addEventListener('change', function() {
				_this.selectItem( this.selectedIndex ) ;
			}) ;

		}

		makeNewSelectBox( items ) {

			this.newWrapper = document.createElement('div') ;
			this.newBox = document.createElement('div') ;
			// this.newBox = document.createElement('div') ;

			let wrapClass = this._opts.dir == 'up' ? ['custom_select_box', 'upShow'] : ['custom_select_box'] ;
			let crntSelected = items.filter( item => item.selected ) ;

			this.newWrapper.classList.add( ...wrapClass ) ;


			this.newBtn = document.createElement('button') ;
			this.newBtn.classList.add('btn_select_box') ;
			this.newBtn.textContent = crntSelected.length > 0 ? crntSelected[0].title : '선택' ;

			// this.newBtn = `<button type="button" class="btn_select_box">${crntSelected.length > 0 ? crntSelected[0].title : '선택'}</button>` ;

			// this.newBtn.addEventListener( 'click', () => this.selectToggle() ) ;

			items.forEach(( item, idx ) => {
				let subItem = `<button type="button" data-value="${item.value}">${item.title}</button>` ;
				this.newBox.innerHTML += subItem ;
			}) ;

			this.newWrapper.appendChild( this.newBtn ) ;
			this.newWrapper.appendChild( this.newBox ) ;
			// this.newWrapper.insertAdjacentHTML( 'afterbegin', this.newBtn ) ;
			// this.newWrapper.insertAdjacentHTML( 'beforeend', this.newBox ) ;

			this.newElem =
			`<div class="custom_select_box upShow">
				<button class="btn_select_box">${crntSelected.length > 0 ? crntSelected[0].title : '선택'}</button>
					<div>
						${this.makeOptionList( items )}
					</div>
			</div>` ;

			console.log( 'this.newElem :', this.newElem );

			return this.newElem ;
			// return this.newWrapper ;
		}

		makeOptionList( items ){
			let optionList = '' ;
			items.forEach(( item, idx ) => {
				optionList += `<button type="button" data-value="${item.value}">${item.title}</button>` ;
			}) ;
			return optionList;
		}

		selectToggle(){

			this.newWrapper.classList.contains( this.activeClass ) ? this.newWrapper.classList.remove( this.activeClass ) : this.newWrapper.classList.add( this.activeClass ) ;

		}

		selectItem( crntIdx ){

			this.crntSelect = this.itemArr[crntIdx] ;
			this.originSelect.selectedIndex = crntIdx ;
			this.itemArr[this.prevIdx].selected = false ;
			this.itemArr[crntIdx].selected = true ;
			this.newBtn.textContent = this.itemArr[crntIdx].title ;
			this.prevIdx = crntIdx ;
			if( this.newWrapper.classList.contains( this.activeClass ) ) this.selectToggle() ;

		}

	}

	(() => {

		/*
			select.length 로 체크 해서 하나일 경우 여러개 일경우 구분해줄려고 했는데
			select 요소가 하나일 경우 length 사용 시 option 갯수를 가져오기 때문에 항상 1보다 크게 나온다.
		 */
		if ( target[0].nodeName == 'OPTION' ) {

			new SelectMenuCustom( target, opts ) ;

		} else {

			[].forEach.call( target , slctBox => {
				console.log('ininini');
				new SelectMenuCustom( slctBox, opts ) ;
			}) ;

		}

		// console.log( 'option :', option ) ;
		// console.log( 'opts type :', typeof opts ) ;

		// new SelectMenuCustom( slctBoxs ) ;


		/*for( let i=0; i<opts.length; i+=1 ){
			console.log(i, opts[i]);
			if( /HTML/.test( {}.toString.call( opts[i] ) ) ){
				slctBoxs = opts[i] ;
			}else{
				option = opts[i] ;
			}
		}

		console.log( 'slctBoxs :', slctBoxs )
		console.log( 'option :', option )


		if ( opts ) {

			console.log( 'sure!!!!!!!!!!!!!!!!!' ) ;
			new SelectMenuCustom( opts ) ;

		} else {

			console.log( 'not!!!!!!!!!!!!!!!!!' ) ;
			slctBoxs = document.querySelectorAll( 'select' ) ;
			[].forEach.call( slctBoxs , slctBox => {
				new SelectMenuCustom( slctBox ) ;
			}) ;

		}*/

	})() ;

} ;


window.addEventListener('load', function(){
	// let slt01 = new SelectMenuCustom( document.querySelector('.wrap_slt > select') ) ;
	// let slt02 = new SelectMenuCustom( document.querySelector('.select02 > select') ) ;


	// SelectMenuCustomModule( document.querySelector('.select02 > select') ) ;
	// SelectMenuCustomModule() ;


	// SelectMenuCustomModule( document.querySelectorAll('.custom_select') ) ;
	let sltBoxAll = document.querySelectorAll('select') ;
	let sltBox01 = document.querySelector('select') ;
	let sltBox02 = document.querySelectorAll('.select02 > select') ;

	// console.log( 'sltBox01 :', sltBox01, isArrayLike( sltBox01 )) ;
	// SelectMenuCustomModule( sltBox ) ;
	// SelectMenuCustomModule({
	// 	dir : 'up' ,
	// }) ;
	// SelectMenuCustomModule( sltBox01 ) ;
	// SelectMenuCustomModule( sltBoxAll ) ;
	SelectMenuCustomModule( sltBox01, { dir : 'up' } ) ;
	SelectMenuCustomModule( sltBox02, { dir : 'down' } ) ;


	/*

		두가지 인자를 넘길 수 있다.
		1. DOM
		2. 옵션 객체

		인자 경우의 수
		1. DOM만 넘길경우
		2. DOM, 옵션 모두 넘길경우
		3. 옵션만 넘길경우


		DOM을 넘기지 않으면 모든 select박스에 적용한다.
		DOM을 넘기면 해당 select박스들만 찾아서 적용한다.
		두번째 인자로 옵션을 넘길수 있다.
	*/


	// { 옵션 넘긴다 }


}) ;


