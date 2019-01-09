
import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

const Common = {} ;

const CustomSelectBox = (() => {

	const comn = {
		selectBoxAll : [] ,
		activeClass : 'active' ,
	} ;

	const SelectBoxWrap = ( dom, opts ) => {

		class SelectBox{

			static data = {};

			constructor( tg, opts ){

				// 옵션 저장
				let options = opts || {} ;
				this.opts = {
					dir : options.dir || 'down' ,
					scroll : options.scroll || false ,
					viewNum : options.viewNum || 5 ,
				}

				// 태그 저장
				this.tags = {
					orgSlt : tg ,
					newWrap : document.createElement('div') , // 최상위 태그
					newElem : null , // 셀렉트 버튼, 옵션 태그
					newBox : null , // 셀렉트 옵션 부모 태그
					newBtn : null , // 셀렉트 버튼 태그
					newOptBtn : null , // 셀렉트 옵션 태그
					sltOpt : null ,	// 오리지널 옵션
				}
				this.tags.sltOpt = this.tags.orgSlt.querySelectorAll( 'option' ) ;

				// 값 저장
				this.value = {
					items : [] , // 옵션 리스트 배열
					crtSltIdx : 0 , // 현재 선택된 옵션 인덱스
					prvSltIdx : 0, // 선택하기 전 옵션의 인덱스
				}

				this.value.items = Array.from({ length : this.tags.sltOpt.length }).map( (item, i) => {
					if( this.tags.sltOpt[i].selected ) {
						this.value.crtSltIdx = i
						this.value.prvSltIdx = i
					}
					return {
						title : this.tags.sltOpt[i].firstChild.textContent ,
						value : this.tags.sltOpt[i].value ,
						selected : this.tags.sltOpt[i].selected ,
					}
				}) ;

				this.init() ;

			}

			aa = () => {}

			/*
			기능을 넘길 때 하나의 모듈로 만들어서 관리하면 좋다.
			hander = {
				optsClickHandler : this.optsClickHandler ,
			}*/

			// 이벤트 핸들러
			setEvt = () => {
				let _this = this;

				// 셀렉트 타이틀 버튼 클릭 제어
				SelectBox.data.tags.newBtn.addEventListener('click', () => this.showHideToggle() ) ;

				// 셀렉트 옵션 리스트 클릭 제어
				[].forEach.call( SelectBox.data.tags.newOptBtn, (item, idx) =>{
					item.addEventListener('click', ( e ) => {
						this.optsClickHandler( idx );
						this.showHideToggle();
						e.preventDefault();
						e.stopPropagation();
					})
				}) ;

				// 오리지널 셀렉트 박스 클릭 제어
				SelectBox.data.tags.orgSlt.addEventListener('click', function(){
					_this.optsClickHandler( this.selectedIndex ) ;
					_this.showHideToggle();
				}) ;

			}

			// 옵션 클릭 핸들러
			optsClickHandler = ( crntIdx ) => {
				SelectBox.data.tags.orgSlt.selectedIndex = crntIdx ;
				SelectBox.data.value.items[SelectBox.data.value.prvSltIdx].selected = false ;
				SelectBox.data.tags.newOptBtn[SelectBox.data.value.prvSltIdx].classList.remove( comn.activeClass ) ;
				SelectBox.data.tags.newOptBtn[crntIdx].classList.add( comn.activeClass ) ;
				SelectBox.data.value.items[crntIdx].selected = true ;
				SelectBox.data.tags.newBtn.textContent = SelectBox.data.value.items[crntIdx].title ;
				SelectBox.data.value.prvSltIdx = crntIdx ;
			}

			// 옵션 show,hide 토글
			showHideToggle = () => {
				if( SelectBox.data.tags.newWrap.classList.contains( comn.activeClass ) ){	// close
					SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
				} else {	// open
					SelectBox.data.tags.newWrap.classList.add( comn.activeClass ) ;
				}
			}

			// 기능 옵션 적용
			setOptionApply = () => {

				// 열리는 방향 옵션
				if( SelectBox.data.opts.dir == 'up' ) {
					SelectBox.data.tags.newWrap.classList.add('dirUp') ;
				}

				// 스크롤 유,무 옵션
				if( SelectBox.data.opts.scroll ) {
					let _height = SelectBox.data.tags.newOptBtn[0].offsetHeight ;
					SelectBox.data.tags.newBox.style.overflowY = 'scroll' ;
					SelectBox.data.tags.newBox.style.height = _height * SelectBox.data.opts.viewNum + 'px' ;
				}
			}

			// 옵션 리스트 생성
			setOptionList = () => {
				let optionList = '' ;
				SelectBox.data.value.items.forEach(( item, idx ) => {
					optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
				}) ;
				return optionList ;
			}

			// 커스텀 셀렉트 박스 생성
			setCustomMarkUp = () => {
				let crntSelected = null ;
				SelectBox.data.tags.newWrap.classList.add( 'custom_select_wrapper' ) ;
				crntSelected = SelectBox.data.value.items.filter( item => item.selected ) ;
				SelectBox.data.tags.newElem =
					`<button class="btn_select">
						${ crntSelected[0].title }
					</button>
					<ul class="bx_option">
						${this.setOptionList()}
					</ul>`
				;

				SelectBox.data.tags.newWrap.innerHTML = SelectBox.data.tags.newElem;
				SelectBox.data.tags.newBtn = SelectBox.data.tags.newWrap.querySelector('.btn_select') ;
				SelectBox.data.tags.newBox = SelectBox.data.tags.newWrap.querySelector('.bx_option') ;
				SelectBox.data.tags.newOptBtn = SelectBox.data.tags.newBox.querySelectorAll('.item') ;
				SelectBox.data.tags.orgSlt.parentNode.insertBefore( SelectBox.data.tags.newWrap, SelectBox.data.tags.orgSlt ) ;
				SelectBox.data.tags.orgSlt.style.cssText = "position:absolute;visibility:hidden;" ;
				comn.selectBoxAll.push( SelectBox.data.tags.newWrap ) ;
			}

			init = () => {
				const { tags, opts, value } = this ;
				SelectBox.data = { tags, opts, value } ;

				this.setCustomMarkUp() ;
				this.setOptionApply() ;
				this.setEvt() ;
			}

		} // end of SelectBox

		return new SelectBox( dom, opts ) ;
	};

	return ( dom, opts ) => {
		if ( !window.CSBEventIsBln ) {	// 처음에 한 번만 실행시키기 위해 조건을 적용하여 실행합니다.
			window.CSBEventIsBln = true ;
			// 셀렉트 박스 영역 외 클릭 시 열려 있는 셀렉트박스 숨김처리
			window.addEventListener( 'click' , ( e ) => {
				comn.selectBoxAll.forEach( slct => {
					if ( !slct.contains( e.target ) ) {
						slct.classList.remove( comn.activeClass ) ;
					}
				}) ;
			}) ;
		}

		if( dom instanceof NodeList ) {
			[].forEach.call( dom, sltBox => {
				return SelectBoxWrap( sltBox, opts ) ;
			}) ;
		} else {
			return SelectBoxWrap( dom, opts ) ;
		}
	}

})() ;



window.addEventListener('load', function(){

	let customSelect01 = CustomSelectBox( document.querySelector('.select_rel_site') , { dir : 'down' } ) ;
	let customSelect02 = CustomSelectBox( document.querySelector('.select_board_search') , { dir : 'up', scroll : true , viewNum : 3 } ) ;
	// let customSelect03 = CustomSelectBox( document.querySelectorAll('.custom_select') ) ;
	// let customSelect03 = CustomSelectBox( document.querySelectorAll('.select_board_search2') ) ;



}) ;


export { CustomSelectBox , SelectBox} ;