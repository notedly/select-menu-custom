const Common = {} ;

Common.SelectMenuCustomModule = ( target, opts ) => {

	class SelectMenuCustom {
		constructor( target, opts ){

			// 옵션 목록
			this.opts = {
				dir : opts.dir || 'down' ,	// 셀렉트가 열리는 방향
				scroll : opts.scroll || false ,	// 셀렉트 리스트의 스크롤 여부
				viewNum : opts.viewNum || 5 ,	// 스크롤이 있을 경우 보여지는 리스트 갯수
			}

			// 태그 목록
			this.tag = {
				originSelect : target ,
				newWrapper : document.createElement('div') , // 커스텀 셀렉트 최상위 태그
				newElem : null , // 커스텀 셀렉트 버튼, 옵션 태그
				newBox : null , // 커스텀 셀렉트 옵션 부모 태그
				newBtn : null , // 커스텀 셀렉트 버튼 태그
				newOptBtn : null , // 커스텀 셀렉트 옵션 태그
				sltOpt : null ,
			}

			// 사용되는 값 목록
			this.value = {
				itemArr : [], // 셀렉트 리스트를 담아놓는 배열
				crntSelectIdx : null , // 현재 선택된 셀렉트 인덱스
				prevIdx : 0, // 새로 선택되기 전 옵션의 인덱스
				activeClass : 'active' , // 활성화 클래스
				chkOpen : false ,	// 셀렉트 박스 오픈 유무
			}

			// const { opts, tag, value } = this ;

			this.init() ;

			console.log( this ) ;


			// const { opts } = this ;
			// const value = { opts , tag , value } ;

			// console.log( opts ) ;

			/*

			this.opts = {
			dir : opts.dir || 'down' ,
			scroll : opts.scroll || false ,
			viewNum : opts.viewNum || 5
			}

			const { opts } = this ;

		// this로 선언한 opts가 있고 이름만 동일하면 { opts } 형식으로 넘겨주고 받을 수 있다.

			*/



		}

		// 옵션 리스트 마크업 생성
		listTagSet( items ){
			let optionList = '' ;
			items.forEach(( item, idx ) => {
				if( item.selected ) this.value.crntSelectIdx = idx ;
				optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
			}) ;
			return optionList;
		}

		// 셀렉트 옵션 제어
		optSet() {

			const { opts, tag, value } = this ;

			// 열리는 방향 옵션
			if( opts.dir == 'up' ) {
				tag.newWrapper.classList.add('dirUp') ;
			}

			// 스크롤 유,무 옵션
			if( opts.scroll ) {
				let _height = tag.newOptBtn[0].offsetHeight ;
				tag.newBox.style.overflowY = 'scroll' ;
				tag.newBox.style.height = _height * opts.viewNum + 'px' ;
			}

		}


		// 이벤트 제어k
		evtSet(){

			let _this = this ;

			// 셀렉트 타이틀 버튼 클릭 제어
			this.tag.newBtn.addEventListener('click', () => this.showHideToggle() ) ;

			// 셀렉트 옵션 리스트 클릭 제어
			[].forEach.call( this.tag.newOptBtn, (item, idx) =>{
				item.addEventListener('click', () => {
					_this.listClickHandler( idx ) ;
					_this.showHideToggle();
				})
			}) ;

			// 오리지널 셀렉트 박스 클릭 제어
			this.tag.originSelect.addEventListener('click', function(e) {
				_this.listClickHandler( this.selectedIndex ) ;
				_this.showHideToggle();
			}) ;

			// 셀렉트 박스를 제외한 영역 클릭 제어
			document.body.addEventListener('click', ( e ) => {

				if( e.target !== this.tag.newBtn && this.value.chkOpen ) {
					console.log('닫는다') ;
					this.tag.newWrapper.classList.remove( this.value.activeClass ) ;
					this.value.chkOpen = false ;
				}

			}) ;

		}

		// 셀렉트 박스 토글
		showHideToggle(){

			if( this.tag.newWrapper.classList.contains( this.value.activeClass ) ){
				this.tag.newWrapper.classList.remove( this.value.activeClass ) ;
				this.value.chkOpen = false ;
			} else {
				this.tag.newWrapper.classList.add( this.value.activeClass ) ;
				this.value.chkOpen = true ;
			}

		}

		// 셀렉트 박스 옵션 클릭
		listClickHandler( crntIdx ){

			this.tag.originSelect.selectedIndex = crntIdx ;
			this.value.itemArr[this.value.prevIdx].selected = false ;
			this.tag.newOptBtn[this.value.prevIdx].classList.remove('active') ;
			this.tag.newOptBtn[crntIdx].classList.add('active') ;
			this.value.itemArr[crntIdx].selected = true ;
			this.tag.newBtn.textContent = this.value.itemArr[crntIdx].title ;
			this.value.prevIdx = crntIdx ;

		}

		init(){

			const { opts, tag, value } = this ;

			// this.tag.newWrapper = document.createElement('div') ;
			this.tag.newWrapper.classList.add( 'custom_select_wrapper' ) ;
			this.tag.sltOpt = this.tag.originSelect.querySelectorAll('option') ; // 셀렉트 옵션

			// 오리지널 select option 정보들을 itemArr 배열에 저장한다.
			this.value.itemArr = Array.from({ length : this.tag.sltOpt.length }).map( (item, i) => {
				if( this.tag.sltOpt[i].selected ) { this.value.prevIdx = i }
				return {
					title : this.tag.sltOpt[i].firstChild.textContent ,
					value : this.tag.sltOpt[i].value ,
					selected : this.tag.sltOpt[i].selected ,
				}
			}) ;

			let crntSelected = this.value.itemArr.filter( item => item.selected ) ;

			this.tag.newElem =
			`<button class="btn_select">
			${ crntSelected.length > 0 ? crntSelected[0].title : '선택' }
			</button>
			<ul class="bx_option">
				${this.listTagSet( this.value.itemArr )}
			</ul>` ;

			this.tag.newWrapper.innerHTML = this.tag.newElem;

			this.tag.newBtn = this.tag.newWrapper.querySelector('.btn_select') ;
			this.tag.newBox = this.tag.newWrapper.querySelector('.bx_option') ;
			this.tag.newOptBtn = this.tag.newBox.querySelectorAll('.item') ;

			this.tag.originSelect.parentNode.insertBefore( this.tag.newWrapper, this.tag.originSelect ) ;
			this.tag.originSelect.style.cssText = "position:absolute;left:-99999em;visibility:hidden;opacity:0;" ;

			// console.log( opts, tag, value ) ;

			this.optSet() ;
			this.evtSet();

		}

		set selectIdx( idx ) {
			this.listClickHandler( idx ) ;
		}

		get crntSelectInfo(){
			return {
				idx : this.value.prevIdx ,
				title : this.value.itemArr[this.value.prevIdx].title ,
				value : this.value.itemArr[this.value.prevIdx].value ,
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

			// console.log('target이 존재합니다') ;
			[].forEach.call( target , slctBox => new SelectMenuCustom( slctBox, _selectBoxOption ) ) ;

		} else {	// DOM이 하나일 경우

			// console.log('target이 존재합니다') ;
			return new SelectMenuCustom( target, _selectBoxOption ) ;

		}



	})() ;


} ;

export { Common } ;