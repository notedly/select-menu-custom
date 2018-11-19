const Common = {} ;

/*
* target :
*
*/
Common.SelectMenuCustomModule = ( target, opts ) => {

	class SelectMenuCustom {
		constructor( target, opts ){

			// 옵션
			this._opts = opts || {} ;
			this._opts.dir = this._opts.dir || 'down' ;
			this._opts.scroll = this._opts.scroll || false ;
			this._opts.viewNum = this._opts.viewNum || 5 ;

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

		// custom 마크업 생성
		makeSelectWrapper( items ) {

			this.newWrapper = document.createElement('div') ;
			this.newWrapper.classList.add( 'custom_select_wrapper' ) ;

			this.newElem =
			`<button class="btn_select">
				${this.makeOptionTitle( items )}
			</button>
			<ul class="bx_option">
				${this.makeOptionList( items )}
			</ul>`
			;

			this.newWrapper.innerHTML = this.newElem;

			this.newBtn = this.newWrapper.querySelector('.btn_select') ;
			this.newBox = this.newWrapper.querySelector('.bx_option') ;
			this.newOptBtn = this.newBox.querySelectorAll('.item') ;

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
				optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
			}) ;
			return optionList;
		}

		// 스타일, 기능 옵션 적용
		setStyleOption() {

			// 열리는 방향
			if( this._opts.dir == 'up' ) {
				this.newWrapper.classList.add('dirUp') ;
			}

			// 스크롤 유,무
			if( this._opts.scroll ) {
				let _height = this.newOptBtn[0].offsetHeight ;
				this.newBox.style.overflowY = 'scroll' ;
				this.newBox.style.height = _height * this._opts.viewNum + 'px' ;
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

			let newSelectBoxMarkup = this.makeSelectWrapper( this.itemArr ) ;
			this.originSelect.parentNode.insertBefore( newSelectBoxMarkup, this.originSelect ) ;

			this.originSelect.style.cssText = "position:absolute;left:-99999em;visibility:hidden;opacity:0;" ;

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

		let _selectBoxOption = opts || {} ;

		// target 이 없을 경우 에러로 처리한다.
		// 타겟이 null 일 경우 나 전달하지 않았을 경우( target instanceof NodeList or Element 가 아닐 경우 ) 에러처리
		if( target == null ) {
			console.log('Error : 올바른 target을 설정하세요', 'target : ', target ) ;
		} else if ( target instanceof NodeList == false && target instanceof Element == false ) {
			console.log('Error : 올바른 target을 설정하세요. ( opts만 존재 ) ', 'target : ', target ) ;
		} else if( target instanceof NodeList ) {	 	// DOM이 여러개일 경우 ( Nodelist로 저장되어져서 가져온다 )
			console.log('여러개 target이 존재합니다') ;
			[].forEach.call( target , slctBox => new SelectMenuCustom( slctBox, _selectBoxOption ) ) ;
		} else {	// DOM이 하나일 경우
			console.log('하나의 target이 존재합니다') ;
			return new SelectMenuCustom( target, _selectBoxOption ) ;
		}



	})() ;


	/*return (() => {

		if( !target && !opts ) {

			var slctBoxs = document.body.querySelectorAll('select') ;
			[].forEach.call( slctBoxs , slctBox => new SelectMenuCustom( slctBox, opts ) ) ;

		} else if ( target[0].nodeName == 'OPTION' ) {

			return new SelectMenuCustom( target, opts ) ;

		} else {

			[].forEach.call( target , slctBox => new SelectMenuCustom( slctBox, opts )) ;

		}

	})() ;*/

} ;

export { Common } ;