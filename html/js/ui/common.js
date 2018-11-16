const Common = {} ;

Common.SelectMenuCustomModule = ( target, opts ) => {

	class SelectMenuCustom {
		constructor( target, opts ){

			// 옵션
			this._opts = opts || {} ;
			this._opts.dir = this._opts.dir || 'down' ;
			this._opts.scroll = this._opts.scroll || false ;
			this._opts.viewNum = this._opts.viewNum || 5 ;

			console.log( this._opts ) ;

			// 전역으로 사용하기 위해 선언함
			this.originSelect = target,
			this.newWrapper,
			this.newElem,
			this.newBox,
			this.newBth,
			this.newOptBtn,
			this.itemArr = [],
			this.crntSelect ,
			this.prevIdx = 0,
			this.activeClass = 'active' ,
			this.sltOpt = this.originSelect.querySelectorAll('option') ;

			this.init() ;
			this.setStyleOption() ;
			this.eventHandler();

		}
		init(){

			// select option 정보들을 itemArr 배열에 저장한다.
			this.itemArr = Array.from({ length : this.sltOpt.length }).map( (item, i) => {
				if( this.sltOpt[i].selected ) { this.prevIdx = i }
				return {
					title : this.sltOpt[i].firstChild.textContent ,
					value : this.sltOpt[i].value ,
					selected : this.sltOpt[i].selected ,
				}
			}) ;

			let newSelectBox = this.makeSelectWrapper( this.itemArr ) ;
			this.originSelect.parentNode.insertBefore( newSelectBox, this.originSelect ) ;
			this.originSelect.style.display = 'none' ;

		}

		// custom 마크업 생성
		makeSelectWrapper( items ) {

			this.newWrapper = document.createElement('div') ;

			let wrapClass = this._opts.dir == 'up' ? ['custom_select_wrapper', 'dirUp'] : ['custom_select_wrapper'] ;	// dir 옵션이 up 이라면 dirUp 클래스 추가

			this.newWrapper.classList.add( ...wrapClass ) ;

			this.newElem =
			`<button class="btn_select_box">
				${this.makeOptionTitle( items )}
			</button>
			<div class="bx_option">
				${this.makeOptionList( items )}
			</div>`
			;

			this.newWrapper.innerHTML = this.newElem;

			this.newBtn = this.newWrapper.querySelector('.btn_select_box') ;
			this.newBox = this.newWrapper.querySelector('.bx_option') ;
			this.newOptBtn = this.newBox.querySelectorAll('button') ;

			return this.newWrapper ;

		}

		makeOptionTitle( items ) {
			let crntSelected = items.filter( item => item.selected ) ;
			return crntSelected.length > 0 ? crntSelected[0].title : '선택' ;
		}

		makeOptionList( items ){
			let optionList = '' ;
			items.forEach(( item, idx ) => {
				if( item.selected ) this.crntSelect = idx ;
				optionList += `<button type="button" data-value="${item.value}" class="${item.selected ? 'active' : ''}">${item.title}</button>` ;
			}) ;
			return optionList;
		}

		setStyleOption() {

			console.log( 'setStyleOption in' ) ;
			if( this._opts.scroll ) {
				this.newBox.style.overflowY = 'scroll' ;
				this.newBox.style.height = 150 + 'px' ;
			}

		}

		eventHandler(){

			let _this = this ;

			// 셀렉트 타이틀 버튼 클릭시 이벤트
			this.newBtn.addEventListener('click', () => this.showHideToggle() ) ;

			// 셀렉트 옵션 버튼 클릭시 이벤트
			[].forEach.call( this.newOptBtn, (item, idx) =>{
				item.addEventListener('click', () => {
					_this.optionClickHandler( idx ) ;
					_this.showHideToggle();
				})
			}) ;

			// 오리지널 셀렉트 박스 클릭시 이벤트
			this.originSelect.addEventListener('click', function(e) {
				_this.optionClickHandler( this.selectedIndex ) ;
				_this.showHideToggle();
			}) ;

			// 셀렉트 박스를 제외한 다른 곳 클릭시 박스 닫힘
			document.body.addEventListener('click', ( e ) => {
				if( !e.target.closest('.custom_select_wrapper') && this.newWrapper.classList.contains( this.activeClass ) ){
					this.newWrapper.classList.remove( this.activeClass ) ;
				}
			}) ;

		}

		// 셀렉트 박스 토글
		showHideToggle(){

			this.newWrapper.classList.contains( this.activeClass ) ? this.newWrapper.classList.remove( this.activeClass ) : this.newWrapper.classList.add( this.activeClass ) ;

		}

		// 셀렉트 박스 옵션 클릭
		optionClickHandler( crntIdx ){

			this.originSelect.selectedIndex = crntIdx ;
			this.itemArr[this.prevIdx].selected = false ;
			this.newOptBtn[this.prevIdx].classList.remove('active') ;
			this.newOptBtn[crntIdx].classList.add('active') ;
			this.itemArr[crntIdx].selected = true ;
			this.newBtn.textContent = this.itemArr[crntIdx].title ;
			this.prevIdx = crntIdx ;

		}

		set selectIdx( idx ) {
			this.optionClickHandler( idx ) ;
		}

		get crntSelectInfo(){
			return {
				idx : this.prevIdx ,
				title : this.itemArr[this.prevIdx].title ,
				value : this.itemArr[this.prevIdx].value ,
			}
		}

	}


	return (() => {
		/*
			select.length 로 체크 해서 하나일 경우 여러개 일경우 구분해줄려고 했는데
			select 요소가 하나일 경우 length 사용 시 option 갯수를 가져오기 때문에 항상 1보다 크게 나온다.
		*/

		if( !target && !opts ) {

			var slctBoxs = document.body.querySelectorAll('select') ;
			[].forEach.call( slctBoxs , slctBox => new SelectMenuCustom( slctBox, opts ) ) ;

		} else if ( target[0].nodeName == 'OPTION' ) {

			return new SelectMenuCustom( target, opts ) ;

		} else {

			[].forEach.call( target , slctBox => new SelectMenuCustom( slctBox, opts )) ;

		}

	})() ;

} ;

class Test {
	constructor( name ){
		this.name = name;
		console.log( this.name ) ;
	}
}

Test.prototype = {
	getName : function(){
		console.log( this.name ) ;
		return this.name ;
	}
}

var a = new Test( 'megaton' ) ;
a.getName() ;
var b = new Test( 'leekeunho' ) ;


export { Common } ;