const Common = {} ;

Common.SelectMenuCustomModule = ( target, opts ) => {

 	const comm = {
 		activeClass : 'active' ,
 		customSelectBox : [] , // localStorage. session
 	} ;

	class SelectMenuCustom {
		constructor( target, opts ){
			this.optSet( opts ) ;
			this.tagSet() ;
			this.valueSet() ;

			// this.handler = {
			// 	showHideToggle : this.showHideToggle ,
			// }

			this.init() ;

			// const { opts, tag, value } = this ;

			/*
				opts , tag , value
				handler
			*/
		}

		show(){
			console.log( 'show show' ) ;
		}

		// 태그 변수 세팅
		tagSet(){
			this.tag = {
				originSelect : target ,
				newWrapper : document.createElement('div') , // 커스텀 셀렉트 최상위 태그
				newElem : null , // 커스텀 셀렉트 버튼, 옵션 태그
				newBox : null , // 커스텀 셀렉트 옵션 부모 태그
				newBtn : null , // 커스텀 셀렉트 버튼 태그
				newOptBtn : null , // 커스텀 셀렉트 옵션 태그
				sltOpt : null ,
			}
		} ;

		// 옵션 변수 세팅
		optSet( opts ){
			this.opts = {
				dir : opts.dir || 'down' ,	// 셀렉트가 열리는 방향
				scroll : opts.scroll || false ,	// 셀렉트 리스트의 스크롤 여부
				viewNum : opts.viewNum || 5 ,	// 스크롤이 있을 경우 보여지는 리스트 갯수
			}
		}

		// 값 변수 세팅
		valueSet(){
			this.value = {
				itemArr : [], // 셀렉트 리스트를 담아놓는 배열
				crntSelectIdx : null , // 현재 선택된 셀렉트 인덱스
				prevIdx : 0, // 새로 선택되기 전 옵션의 인덱스
				activeClass : 'active' , // 활성화 클래스
				chkOpen : false ,	// 셀렉트 박스 오픈 유무
				selectTop : null ,
				pageHeight : null ,
			}
		}

		// 셀렉트 옵션 제어
		optSetUp( info ) {
			const { opts, tag, value } = info ;

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

		// 옵션 리스트 마크업 생성
		listTagSet( items ){
			let optionList = '' ;
			items.forEach(( item, idx ) => {
				if( item.selected ) this.value.crntSelectIdx = idx ;
				optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
			}) ;
			return optionList;
		}

		// 이벤트 제어
		evtSet( info ){
			let _this = this ;
			const { opts, tag, value } = info ;

			// 셀렉트 타이틀 버튼 클릭 제어
			tag.newBtn.addEventListener('click', () => _this.showHideToggle() ) ;

			// 셀렉트 옵션 리스트 클릭 제어
			[].forEach.call( tag.newOptBtn, (item, idx) =>{
				item.addEventListener('click', () => {
					_this.listClickHandler( idx ) ;
					_this.showHideToggle();
				})
			}) ;

			// 오리지널 셀렉트 박스 클릭 제어
			tag.originSelect.addEventListener('click', function(e) {
				_this.listClickHandler( _this.selectedIndex ) ;
				_this.showHideToggle();
			}) ;

			// 셀렉트 박스를 제외한 영역 클릭 제어
			/*if ( !document.body.isSelectEvt ) {

				document.body.isSelectEvt = 1 ;

				document.body.addEventListener('click', ( e ) => {
					console.log('a') ;
					console.log( e.target) ;
					console.log( tag.newBtn) ;
					console.log( value.chkOpen) ;
					if( e.target !== tag.newBtn && value.chkOpen ) {
						console.log('닫는다') ;
						tag.newWrapper.classList.remove( value.activeClass ) ;
						value.chkOpen = false ;
					}
				}) ;
			}*/
			// window.addEventListener( 'scroll', this.positionSet ) ;
		}

		positionSet( info ) {

			// console.log( 'opts : ', info.opts ) ;
			// console.log( 'tag : ', info.tag ) ;
			// console.log( 'value : ', info.value ) ;
			// console.log( 'opts : ', opts ) ;
			// console.log( 'tag : ', tag ) ;
			// console.log( 'value : ', value ) ;
			// this.value.selectTop = this.tag.newWrapper.getBoundingClientRect().top;
			// this.value.pageHeight = document.body.scrollHeight;
			// console.log( '셀렉트박스 위치 : ' , value.selectTop ) ;
			// console.log( '페이지 높이 : ' , value.pageHeight ) ;
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
			let crntSelected = null ;

			tag.newWrapper.classList.add( 'custom_select_wrapper' ) ;
			tag.sltOpt = tag.originSelect.querySelectorAll('option') ; // 셀렉트 옵션

			// 오리지널 select option 정보들을 itemArr 배열에 저장한다.
			value.itemArr = Array.from({ length : tag.sltOpt.length }).map( (item, i) => {
				if( tag.sltOpt[i].selected ) { value.prevIdx = i }
				return {
					title : tag.sltOpt[i].firstChild.textContent ,
					value : tag.sltOpt[i].value ,
					selected : tag.sltOpt[i].selected ,
				}
			}) ;

			crntSelected = value.itemArr.filter( item => item.selected ) ;

			tag.newElem =
				`<button class="btn_select">
					${ crntSelected.length > 0 ? crntSelected[0].title : '선택' }
				</button>
				<ul class="bx_option">
					${this.listTagSet( value.itemArr )}
				</ul>`
			;

			tag.newWrapper.innerHTML = tag.newElem;

			tag.newBtn = tag.newWrapper.querySelector('.btn_select') ;
			tag.newBox = tag.newWrapper.querySelector('.bx_option') ;
			tag.newOptBtn = tag.newBox.querySelectorAll('.item') ;

			tag.originSelect.parentNode.insertBefore( tag.newWrapper, tag.originSelect ) ;
			tag.originSelect.style.cssText = "position:absolute;visibility:hidden;" ;

			// console.log( '?' , comm.customSelectBox ) ;
			comm.customSelectBox.push( tag.newWrapper ) ;
			// console.log( comm.customSelectBox ) ;

			(( opts ) => {
				this.optSetUp(opts) ;
				this.evtSet(opts) ;
				this.positionSet(opts) ;
			})({ opts , tag , value }) ;
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

		/*window.addEventListener( 'click' , ( e ) => {
			console.log( 'aaaaaaaaaaaaaaaaaa' , comm.customSelectBox ) ;

			[].forEach.call( comm.customSelectBox , slct => {
				if ( !slct.contains( e.target ) ) }{
					slct.classList.remove( comm.activeClass ) ;
				}
			}) ;
		})*/

		let _selectBoxOption = opts || {} ;

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



/*
const App = (() => {

	let elem = [] ;

	const insideYaho = () => {
		class Yaho{
			constructor(){
				this.a = 'a' ;
				elem.push( this ) ;
			}
		}

		Yaho.prototype = {
			getApp (){
				console.log( 'elem :', elem ) ;
			} ,
			aa() {
				console.log( this ) ;
			} ,
			bb() {
				console.log( 'bb' ) ;
			}
		}
		return new Yaho ;
	}
	return insideYaho ;
})() ;

let y = App() ;
let z = App() ;
y.getApp() ;
*/













export { Common } ;