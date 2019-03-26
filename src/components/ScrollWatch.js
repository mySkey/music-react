import React from 'react'

export default class ScrollWatch extends React.PureComponent{
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }
  constructor(props){
    super(props)
    this.handleScroll = ()=>{
      const scrollTop = window.scrollY;
      const offsetHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;
      if (scrollTop + offsetHeight >= scrollHeight - 1) {
        props.onReachBottom();
      }
    }
  }
  render(){
    return null
  }
}