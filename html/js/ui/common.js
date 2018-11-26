const Common = {} ;



const CustomSelectBox = (() => {

	const comn = {
		selectBoxAll : [] ,
		activeClass : 'active' ,
	} ;

	const SelectBoxWrap = ( dom, opts ) => {

		class SelectBox{
			constructor( target, opts ){
				// console.log( 'target :', target );
				comn.selectBoxAll.push( target ) ;
				console.log( this ) ;
				// this.setTest( target ) ;
				// this.init() ;
			}

			// setTest = (( target ) => {
			// 	console.log( 'set in', target ) ;
			// })( target ) ;

			init() {
				console.log( 'init in' ) ;
			}

			// set = (( target ) => {
			// 	console.log( 'set in' , target ) ;
			// })( target ) ;

			/*// 전달받은 옵션을 저장합니다.
			setOpts = (() => {
				opts = opts || {} ;
				this.opts = {
					dir : opts.dir || 'down' ,
					scroll : opts.scroll || false ,
					viewNum : opts.viewNum || 5 ,
				}
				// console.log( 'option :', this.opts ) ;
			})( opts ); // end of setOpts

			// 사용할 태그들을 저장합니다.
			setTags = (() => {
				this.tag = {
					originSelect : target ,
					newWrapper : document.createElement('div') , // 커스텀 셀렉트 최상위 태그
					newElem : null , // 커스텀 셀렉트 버튼, 옵션 태그
					newBox : null , // 커스텀 셀렉트 옵션 부모 태그
					newBtn : null , // 커스텀 셀렉트 버튼 태그
					newOptBtn : null , // 커스텀 셀렉트 옵션 태그
					sltOpt : null ,
				}
				console.log( 'ddddddddddddd :', this.tag.originSelect ) ;
				this.tag.sltOpt = this.tag.originSelect.querySelectorAll( 'option' ) ;
				// console.log( 'tag :', this.tag ) ;
			})( target ) ;

			// 사용할 값들을 저장합니다.
			setValues = (() => {
				this.value = {
					selectOptArr : [], // 셀렉트 리스트의 옵션정보 배열
					crntSelectIdx : 0 , // 현재 선택된 옵션 인덱스
					prevSelectIdx : 0, // 선택하기 전 옵션의 인덱스
					chkOpen : false ,	// 셀렉트 박스 오픈 유무
				}
				this.value.selectOptArr = Array.from({ length : this.tag.sltOpt.length }).map( ( item, i ) => {
					if( this.tag.sltOpt[i].selected ) {
						this.value.crntSelectIdx = i
						this.value.prevIdx = i
					}
					return {
						title : this.tag.sltOpt[i].firstChild.textContent ,
						value : this.tag.sltOpt[i].value ,
						selected : this.tag.sltOpt[i].selected ,
					}
				})
				// console.log( 'value : ', this.value ) ;
			})() ;
*/


		} // end of SelectBox

		// SelectBox.prototype = {
		// 	getAllSelect(){
		// 		console.log( comn.selectBoxAll ) ;
		// 	}
		// }

		// 돔이 여러개일 경우와 한개일 경우 리턴을 어떻게 해줄 것인가?

		if( dom instanceof NodeList ) {
			[].forEach.call( dom, sltBox => {
				return new SelectBox( sltBox, opts ) ;
			}) ;
		} else {
			return new SelectBox( dom, opts ) ;
		}
		// console.log( typeof dom ) ;
		// console.log( dom.length ) ;

		// return new SelectBox ;

	}

	return SelectBoxWrap ;

})() ;


window.addEventListener('load', function(){
	// let customSelect01 = CustomSelectBox( document.querySelector('.select_rel_site') , { dir : 'up' } ) ;
	// let customSelect02 = CustomSelectBox( document.querySelector('.select_board_search') ) ;
	let customSelect03 = CustomSelectBox( document.querySelectorAll('.custom_select') ) ;

	// customSelect01.getAllSelect() ;
	// customSelect02.getAllSelect() ;

})


export { CustomSelectBox } ;