import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

const Common = {} ;

class SelectBox extends Component {
	constructor( props ) {
		super( props ) ;

		this.opts = this.props.opts || {} ;

		this.state = {
			crntIdx : this.props.initSltNum || 0 ,
			menus : this.props.menus ,
			opts : {
				dir : this.opts.dir || 'down' ,
				scroll : this.opts.scroll || false ,
				viewNum : this.opts.viewNum || 5 ,
			} ,
			itemH : null ,
		} ;

		window.addEventListener('click', ( e ) => {
			if( !this.sltWrap.contains( e.target ) && this.sltWrap.classList.contains('active') ) {
				this.sltWrap.classList.remove( 'active' ) ;
			}
		}) ;

	}
	aaa = () => {}

	componentDidUpdate(){
		console.log( '리렌더링 완료____현재 선택된 메뉴 :', this.props.menus[this.state.crntIdx].title ) ;
	}

	componentDidMount() {
		this.setState({
			itemH : this.optionWrap.querySelector('.item').clientHeight ,
		});
	}

	// 타이틀 마크업
	renderValues = () => {

		let { menus, crntIdx } = this.state ;

		return(
			<button className="customSelect-title" onClick={this.evtSltOpenToggle}>
				{menus[crntIdx].title}
			</button>
		)
	}

	// 커스텀 셀렉트 박스 리스트 마크업
	rendermenus = ( item, idx ) => {

		let classNames = idx == this.state.crntIdx ? 'item active' : 'item' ;

		return (
			<li key={idx} data-value={item.value} className={ classNames } onClick={ () => this.evtOptionClick( idx )  }>
				{item.title}
			</li>
		)
	}

	// 셀렉트 박스 show/hide 토글 이벤트
	evtSltOpenToggle = () => {
		this.sltWrap.classList.contains( 'active' ) ? this.sltWrap.classList.remove( 'active' ) : this.sltWrap.classList.add( 'active' ) ;
	}

	// 셀렉트 박스 메뉴 클릭 이벤트
	evtOptionClick = ( crntIdx ) => {
		this.setState({ crntIdx : crntIdx }) ;
		this.evtSltOpenToggle() ;
	}

	render(){

		console.log( '>>>>>>>>>>>>>>>>>>>>> render' ) ;

		let menuWrapStyle = {}
		,	 wrapClassNames = null
		,	 { menus , opts , crntIdx } = this.state ;

		if( opts.scroll ) {
			menuWrapStyle.overflowY = 'scroll' ;
			menuWrapStyle.height = this.state.itemH * this.state.opts.viewNum ;
		}

		wrapClassNames = opts.dir == 'up' ? 'dirUp customSelect' : 'customSelect' ;

		return(
			<div className={ wrapClassNames } ref={ ref => this.sltWrap = ref } >
				{ this.renderValues() }
				<ul className="customSelect-option" ref={ ref => this.optionWrap = ref } style={menuWrapStyle}>
			   	{ menus.map( ( item, idx, arr ) => this.rendermenus( item, idx ) ) }
				</ul>
			</div>
		)
	}
}

export { SelectBox} ;