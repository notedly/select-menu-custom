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
			this._opts.dir = this._opts.dir || 'down' ; // 셀렉트가 열리는 방향
			this._opts.scroll = this._opts.scroll || false ; // 셀렉트 리스트의 스크롤 여부
			this._opts.viewNum = this._opts.viewNum || 5 ; // 스크롤이 있을 경우 보여지는 리스트 갯수

			this.originSelect = target, // 오리지널 셀렉트 태그
			this.newWrapper,	// 커스텀 셀렉트 최상위 태그
			this.newElem, // 커스텀 셀렉트 버튼, 옵션 태그
			this.newBox, // 커스텀 셀렉트 옵션 부모 태그
			this.newBth, // 커스텀 셀렉트 버튼 태그
			this.newOptBtn, // 커스텀 셀렉트 옵션 태그
			this.itemArr = [], // 셀렉트 리스트를 담아놓는 배열
			this.crntSelectIdx , // 현재 선택된 셀렉트 인덱스
			this.prevIdx = 0, // 새로 선택되기 전 옵션의 인덱스
			this.activeClass = 'active' , // 활성화 클래스

			this.sltOpt = this.originSelect.querySelectorAll('option') ; // 셀렉트 옵션

			this.init() ;
			this.optSet() ;
			this.evtSet();

		}

		// 옵션 리스트 마크업 생성
		listTagSet( items ){
			let optionList = '' ;
			items.forEach(( item, idx ) => {
				if( item.selected ) this.crntSelectIdx = idx ;
				optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
			}) ;
			return optionList;
		}

		// 셀렉트 옵션 제어
		optSet() {

			// 열리는 방향 옵션
			if( this._opts.dir == 'up' ) {
				this.newWrapper.classList.add('dirUp') ;
			}

			// 스크롤 유,무 옵션
			if( this._opts.scroll ) {
				let _height = this.newOptBtn[0].offsetHeight ;
				this.newBox.style.overflowY = 'scroll' ;
				this.newBox.style.height = _height * this._opts.viewNum + 'px' ;
			}

		}

		// 이벤트 제어
		evtSet(){

			let _this = this ;

			// 셀렉트 타이틀 버튼 클릭시 이벤트
			this.newBtn.addEventListener('click', () => this.showHideToggle() ) ;

			// 셀렉트 옵션 버튼 클릭시 이벤트
			[].forEach.call( this.newOptBtn, (item, idx) =>{
				item.addEventListener('click', () => {
					_this.listClickHandler( idx ) ;
					_this.showHideToggle();
				})
			}) ;

			// 오리지널 셀렉트 박스 클릭시 이벤트
			this.originSelect.addEventListener('click', function(e) {
				_this.listClickHandler( this.selectedIndex ) ;
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
		listClickHandler( crntIdx ){

			this.originSelect.selectedIndex = crntIdx ;
			this.itemArr[this.prevIdx].selected = false ;
			this.newOptBtn[this.prevIdx].classList.remove('active') ;
			this.newOptBtn[crntIdx].classList.add('active') ;
			this.itemArr[crntIdx].selected = true ;
			this.newBtn.textContent = this.itemArr[crntIdx].title ;
			this.prevIdx = crntIdx ;

		}

		init(){

			this.newWrapper = document.createElement('div') ;
			this.newWrapper.classList.add( 'custom_select_wrapper' ) ;

			// 오리지널 select option 정보들을 itemArr 배열에 저장한다.
			this.itemArr = Array.from({ length : this.sltOpt.length }).map( (item, i) => {
				if( this.sltOpt[i].selected ) { this.prevIdx = i }
				return {
					title : this.sltOpt[i].firstChild.textContent ,
					value : this.sltOpt[i].value ,
					selected : this.sltOpt[i].selected ,
				}
			}) ;

			let crntSelected = this.itemArr.filter( item => item.selected ) ;

			this.newElem =
			`<button class="btn_select">
			${ crntSelected.length > 0 ? crntSelected[0].title : '선택' }
			</button>
			<ul class="bx_option">
				${this.listTagSet( this.itemArr )}
			</ul>` ;

			this.newWrapper.innerHTML = this.newElem;

			this.newBtn = this.newWrapper.querySelector('.btn_select') ;
			this.newBox = this.newWrapper.querySelector('.bx_option') ;
			this.newOptBtn = this.newBox.querySelectorAll('.item') ;

			this.originSelect.parentNode.insertBefore( this.newWrapper, this.originSelect ) ;
			this.originSelect.style.cssText = "position:absolute;left:-99999em;visibility:hidden;opacity:0;" ;

		}

		set selectIdx( idx ) {
			this.listClickHandler( idx ) ;
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

		console.log( 'target :', target ) ;

		// target 이 없을 경우 에러로 처리한다.
		// 타겟이 null 일 경우 나 전달하지 않았을 경우( target instanceof NodeList or Element 가 아닐 경우 ) 에러처리
		if( target == null ) {
			console.log('Error : 올바른 target을 설정하세요', 'target : ', target ) ;
		} else if ( target instanceof NodeList == false && target instanceof Element == false ) {
			console.log('Error : 올바른 target을 설정하세요. ( opts만 존재 ) ', 'target : ', target ) ;
		} else if( target instanceof NodeList) {	 	// DOM이 여러개일 경우 ( Nodelist로 저장되어져서 가져온다 )

			console.log('target이 존재합니다') ;
			[].forEach.call( target , slctBox => new SelectMenuCustom( slctBox, _selectBoxOption ) ) ;

		} else {	// DOM이 하나일 경우

			console.log('target이 존재합니다') ;
			return new SelectMenuCustom( target, _selectBoxOption ) ;

		}



	})() ;


} ;

export { Common } ;