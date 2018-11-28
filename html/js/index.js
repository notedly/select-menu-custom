import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { CustomSelectBox } from './ui/common' ;

window.addEventListener('load', function(){
/*
	let customSelect01 = CustomSelectBox(
		document.querySelector('.select_rel_site') ,
	) ;

	let customSelect02 = Common.SelectMenuCustomModule( document.querySelector('.select_board_search') , {
			dir : 'down' ,
			scroll : true ,
			viewNum : 3 ,
		}
	) ;
*/
/*
	let customSelect03 = Common.SelectMenuCustomModule(
		document.querySelector('.select_board_search2') ,
	) ;

	document.querySelector('.btn_set_select').addEventListener('click', () => {
		customSelect01.selectIdx = 0 ;
	}) ;
	document.querySelector('.btn_get_value').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.value ) ;
	}) ;
	document.querySelector('.btn_get_idx').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.idx ) ;
	}) ;
	document.querySelector('.btn_get_title').addEventListener('click', () => {
		console.log( customSelect01.crntSelectInfo.title ) ;
	}) ;


*/
	/*const Yaho = (() => {
		console.log('aaaa');
		var a = [] ;

		class Yaho {
			constructor () {
				a.push( 'aaaa' ) ;
				a.push( 'aaaa' ) ;
				a.push( 'aaaa' ) ;
				a.push( 'aaaa' ) ;
			}
		}

		Yaho.prototype.aa = () => {
			console.log( a ) ;
		}

		return new Yaho ;
	})() ;

	let a = Yaho ;
	let b = Yaho ;
	let c = Yaho ;
	window.a = a ;
	window.b = b ;
	window.c = c ;*/

   // const Yaho = (() => {

   //    let arr = [] ;
   //    /*
			// 공통적으로 쓰이는 코드는 여기에!
   //    */


   //    // 고유적인 코드!
   //    const InsideYaho = () => {
   //       class Yaho {
   //          constructor () {
   //             console.log( 'abc' ) ;
   //             arr.push( 'aaaaaa' ) ;
   //          }

   //       }
   //       clkck {
   //          aasdasd( this ) ;
   //       }

   //       Yaho.prototype = {
   //          getYaho : () => {
   //             console.log( 'getYaho' ) ;
   //             console.log( arr ) ;
   //          }
   //       }

   //       return new Yaho ;
   //    }

   //    return InsideYaho ;
   // })() ;

   // let tmp1 = Yaho() ;
   // let tmp2 = Yaho() ;
   // let tmp3 = Yaho() ;
   // let tmp4 = Yaho() ;
   // console.log( tmp4.getYaho() ) ;
   // console.log( tmp1.getYaho() ) ;
   // window.tmp1 = tmp1 ;



   // var a = new Yaho() ;
   // 이렇게 선언하게 되면
   // 1:1 로 실행된다.
   // 여러개의 돔을 전달할 경우에는 하나의 인스턴스에 여러개 돔이 들어가기때문에 올바르지 못하다.

   // 그래서 return new Yaho 이렇게 받는 구조로 짠다.

   // class Yaho {
   //    constructor () {
   //       console.log( 'abc' ) ;
   //       arr.push( 'aaaaaa' ) ;
   //    }

   // }
   // clkck {
   //    aasdasd( this ) ;
   // }

   // Yaho.prototype = {
   //    getYaho : () => {
   //       console.log( 'getYaho' ) ;
   //       console.log( arr ) ;
   //    }
   // }

   // return new Yaho ;

   // 이렇게 작성하게 되는데,
   // 독립적으로 코드를 관리하기 위해서 한번 더 감싸서 관리해주면 좋겟다.

   // const InsideYaho = () => {
   // 	class Yaho {
	  //     constructor () {
	  //        console.log( 'abc' ) ;
	  //        arr.push( 'aaaaaa' ) ;
	  //     }

	  //  }
	  //  clkck {
	  //     aasdasd( this ) ;
	  //  }

	  //  Yaho.prototype = {
	  //     getYaho : () => {
	  //        console.log( 'getYaho' ) ;
	  //        console.log( arr ) ;
	  //     }
	  //  }

	  //  return new Yaho ;
   // }

   // 그러면 InsideYaho가 하나의 모듈이 되겠다.
   // 그러면 개별적으로 각각의 인스턴스로 관리할수가 있는데,

   // 공용적으로 사용하게되는기능이 있을 경우 밖으로 빼야되는 경우가 생긴다.

   // 그래서 한번 더 감싸게 되는데

   // const Yaho = (() => {

   // 	const comm = [] ;
   // 	// 공용적으로 사용하는 코드

   //  const InsideYaho = () => {
   // 	class Yaho {
	  //     constructor () {
	  //        console.log( 'abc' ) ;
	  //        arr.push( 'aaaaaa' ) ;
	  //     }

	  //  }
	  //  clkck {
	  //     aasdasd( this ) ;
	  //  }

	  //  Yaho.prototype = {
	  //     getYaho : () => {
	  //        console.log( 'getYaho' ) ;
	  //        console.log( arr ) ;
	  //     }
	  //  }

	  //  return new Yaho ;
   // }
   //  })() ;

     /* const Yaho = (() => {

      let arr = [] ;

      const InsideYaho = () => {
         class Yaho {
            constructor () {
               console.log( 'abc' ) ;
               arr.push( 'aaaaaa' ) ;
            }

         }
         clkck {
            aasdasd( this ) ;
         }

         Yaho.prototype = {
            getYaho : () => {
               console.log( 'getYaho' ) ;
               console.log( arr ) ;
            }
         }

         return new Yaho ;
      }

      return InsideYaho ;
   })() ;

   let tmp1 = Yaho() ;
   let tmp2 = Yaho() ;
   let tmp3 = Yaho() ;
   let tmp4 = Yaho() ;
   console.log( tmp4.getYaho() ) ;
   console.log( tmp1.getYaho() ) ;
   window.tmp1 = tmp1 ; */


   // set = (( target ) => {
			// 	console.log( 'set in' , target ) ;
			// })( target ) ;


			/*// 전달받은 옵션을 저장합니다.
			setOpts = ( opts ) => {
				// console.log( 'opts :', opts ) ;
				opts = opts || {} ;
				this.opts = {
					dir : opts.dir || 'down' ,
					scroll : opts.scroll || false ,
					viewNum : opts.viewNum || 5 ,
				}
				// console.log( 'option :', this.opts ) ;
			}; // end of setOpts

			// 사용할 태그들을 저장합니다.
			setTags = ( t ) => {
				this.tags = {
					originSelect : t ,
					newWrapper : document.createElement('div') , // 커스텀 셀렉트 최상위 태그
					newElem : null , // 커스텀 셀렉트 버튼, 옵션 태그
					newBox : null , // 커스텀 셀렉트 옵션 부모 태그
					newBtn : null , // 커스텀 셀렉트 버튼 태그
					newOptBtn : null , // 커스텀 셀렉트 옵션 태그
					sltOpt : null ,
				}
				this.tags.sltOpt = this.tags.originSelect.querySelectorAll( 'option' ) ;
				// console.log( 'tags :', this.tags ) ;
			} ;*/

			/*
			setOpts = (() => {
				opts = opts || {} ;
				this.opts = {
					dir : opts.dir || 'down' ,
					scroll : opts.scroll || false ,
					viewNum : opts.viewNum || 5 ,
				}
				// console.log( 'option :', this.opts ) ;
			})( opts ); // end of setOpts

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
}) ;