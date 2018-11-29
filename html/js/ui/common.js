const Common = {} ;



const CustomSelectBox = (() => {

	const comn = {
		selectBoxAll : [] ,
		activeClass : 'active' ,
		num : 0 ,
	} ;

	const SelectBoxWrap = ( dom, opts ) => {

		class SelectBox{

			static data = {};

			constructor( tg, opts ){

				comn.num++ ;
				console.log( 'select num :', comn.num ) ;

				// 전달받은 옵션을 저장합니다.
				let options = opts || {} ;
				this.opts = {
					dir : options.dir || 'down' ,
					scroll : options.scroll || false ,
					viewNum : options.viewNum || 5 ,
				}

				// 사용할 태그들을 저장합니다.
				this.tags = {
					orgSlt : tg ,
					newWrap : document.createElement('div') , // 커스텀 셀렉트 최상위 태그
					newElem : null , // 커스텀 셀렉트 버튼, 옵션 태그
					newBox : null , // 커스텀 셀렉트 옵션 부모 태그
					newBtn : null , // 커스텀 셀렉트 버튼 태그
					newOptBtn : null , // 커스텀 셀렉트 옵션 태그
					sltOpt : null ,
				}
				this.tags.sltOpt = this.tags.orgSlt.querySelectorAll( 'option' ) ;

				// 사용할 값들을 저장합니다.
				this.value = {
					sltOptArr : [], // 셀렉트 리스트의 옵션정보 배열
					crtSltIdx : 0 , // 현재 선택된 옵션 인덱스
					prvSltIdx : 0, // 선택하기 전 옵션의 인덱스
					chkOpen : false ,	// 셀렉트 박스 오픈 유무
					isBodyEvt : false ,
				}

				this.value.sltOptArr = Array.from({ length : this.tags.sltOpt.length }).map( ( item, i ) => {
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
				this.value.itemArr = Array.from({ length : this.tags.sltOpt.length }).map( (item, i) => {
					if( this.tags.sltOpt[i].selected ) { this.value.prvSltIdx = i }
					return {
						title : this.tags.sltOpt[i].firstChild.textContent ,
						value : this.tags.sltOpt[i].value ,
						selected : this.tags.sltOpt[i].selected ,
					}
				}) ;

				this.init() ;

			}

			aa = () => {}

			// 이벤트 모음
			setEvt = () => {
				let _this = this ,f ;

				// 셀렉트 타이틀 버튼 클릭 제어
				SelectBox.data.tags.newBtn.addEventListener('click', () => this.showHideToggle() ) ;

				// 셀렉트 옵션 리스트 클릭 제어
				[].forEach.call( SelectBox.data.tags.newOptBtn, (item, idx) =>{
					item.addEventListener('click', () => {
						this.optsClickHandler( idx ) ;
						this.showHideToggle();
						// SelectBox.data.tags.newWrap.removeEventListener('focusout', this.showHideToggle) ;
					})
				}) ;

				// 오리지널 셀렉트 박스 클릭 제어
				SelectBox.data.tags.orgSlt.addEventListener('click', function(){
					_this.optsClickHandler( this.selectedIndex ) ;
					_this.showHideToggle();
				}) ;


				// SelectBox.data.tags.newWrap.addEventListener('focusout', this.showHideToggle ) ;

				/*SelectBox.data.tags.newWrap.addEventListener('focusout', function(e){
					if( SelectBox.data.value.chkOpen ) {
						SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
						SelectBox.data.value.chkOpen = false ;
					}
				} ) ;*/


						// SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
						// SelectBox.data.value.chkOpen = false ;

				/*SelectBox.data.tags.newWrap.addEventListener('blur', function(){
					if( SelectBox.data.value.chkOpen ) {
						SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
						SelectBox.data.value.chkOpen = false ;
					}
				}) ;

				console.log( SelectBox.data.tags.newWrap ) ;*/

				// document.body.addEventListener('click', () => {
				// 	console.log( comn.selectBoxAll ) ;
				// }) ;

				// if ( !document.body.isSelectEvt ) {

				// 	document.body.isSelectEvt = 1 ;

				// 	document.body.addEventListener('click', ( e ) => {
				// 		if( e.target !== SelectBox.data.tags.newBtn && SelectBox.data.value.chkOpen ) {
				// 			console.log('닫는다') ;
				// 			SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
				// 			SelectBox.data.value.chkOpen = false ;
				// 		}
				// 		console.log('************ : ', comn.selectBoxAll ) ;
				// 		// console.log( 'body 클릭!', e.target , SelectBox.data.tags.newBtn , SelectBox.data.value.chkOpen ) ;
				// 	}) ;
				// }

				/*if( !SelectBox.data.value.isBodyEvt ){
					console.log( 'in' ) ;

					SelectBox.data.value.isBodyEvt = 1 ;

					document.body.addEventListener('click', function(){
						// console.log('************ : ', comn.selectBoxAll ) ;
						// console.log( 'body 이벤트 :', SelectBox.data.value.isBodyEvt ) ;
						console.log( 'body click in' ) ;
					}) ;
				}*/

				/*if ( !comn.chkOpen ) {

					comn.chkOpen = 1 ;

					document.body.addEventListener('click', ( e ) => {
						// console.log( 'tg :', e.target ) ;
						if( e.target !== SelectBox.data.tags.newBtn && SelectBox.data.value.chkOpen ) {
							console.log('닫는다') ;
							SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
							SelectBox.data.value.chkOpen = false ;
						}
						console.log( '열려있나 ? ', SelectBox.data.value.chkOpen ) ;

					}) ;
				}*/

			}

			optsClickHandler = ( crntIdx ) => {
				SelectBox.data.tags.orgSlt.selectedIndex = crntIdx ;
				SelectBox.data.value.itemArr[SelectBox.data.value.prvSltIdx].selected = false ;
				SelectBox.data.tags.newOptBtn[SelectBox.data.value.prvSltIdx].classList.remove( comn.activeClass ) ;
				SelectBox.data.tags.newOptBtn[crntIdx].classList.add( comn.activeClass ) ;
				SelectBox.data.value.itemArr[crntIdx].selected = true ;
				SelectBox.data.tags.newBtn.textContent = SelectBox.data.value.itemArr[crntIdx].title ;
				SelectBox.data.value.prvSltIdx = crntIdx ;
			}

			showHideToggle = () => {
				if( SelectBox.data.tags.newWrap.classList.contains( comn.activeClass ) ){
					SelectBox.data.tags.newWrap.classList.remove( comn.activeClass ) ;
					SelectBox.data.value.chkOpen = false ;
					SelectBox.data.value.isBodyEvt = false ;
				} else {
					SelectBox.data.tags.newWrap.classList.add( comn.activeClass ) ;
					SelectBox.data.value.chkOpen = true ;
					SelectBox.data.value.isBodyEvt = true ;
				}
			}

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

			setOptionList = () => {
				let optionList = '' ;
				SelectBox.data.value.itemArr.forEach(( item, idx ) => {
					optionList += `<li data-value="${item.value}" class="${item.selected ? 'item active' : 'item'}">${item.title}</li>` ;
				}) ;
				return optionList ;
			}

			setCustomMarkUp = () => {
				let crntSelected = null ;
				// 커스텀 마크업 생성
				SelectBox.data.tags.newWrap.classList.add( 'custom_select_wrapper' ) ;
				crntSelected = SelectBox.data.value.itemArr.filter( item => item.selected ) ;
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

		SelectBox.prototype = {
			viewSelectBoxAll(){
				console.log( '전체 커스텀 셀렉트 박스 : ', comn.selectBoxAll ) ;
			}
		}

		return new SelectBox( dom, opts ) ;
	};

	/*document.body.addEventListener('click', function(){
		console.log( comn.selectBoxAll ) ;
	}) ;*/

	return ( dom, opts ) => {
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

	// let a = CustomSelectBox() ;
	// console.log( a ) ;

	// customSelect02.viewSelectBoxAll() ;
	// customSelect01.getAllSelect() ;
	// customSelect02.getAllSelect() ;


}) ;


export { CustomSelectBox } ;