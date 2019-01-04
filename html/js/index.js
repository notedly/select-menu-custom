import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { CustomSelectBox , SelectBox } from './ui/common' ;

class App extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {} ;
	}
	render(){

		let sltArgs = {
			conts : [
				{ value : 'title' , title : '제목' } ,
				{ value : 'number' , title : '번호' } ,
				{ value : 'writer' , title : '작성자' } ,
				{ value : 'date' , title : '날짜' } ,
			]
		}

		return(
			<div>
				<SelectBox {...sltArgs} />
			</div>
		)
	}
}

window.addEventListener('load', function(){

	let div = document.querySelector('.wrapSlt') ;
	render( <App /> , div ) ;

}) ;