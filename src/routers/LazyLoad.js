import React from 'react'
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return loadingComponent(); // 全局loading组件，页面加载时
  } else if (error) {
    console.log(error)
    return <div>Sorry, there was a problem loading the page.</div>;   // 全局
  } else {
    return null;
  }
};

const loadingStyle = {
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  background: '#fff'
}
const loadingComponent = ()=>{
  return(
    <div style={loadingStyle} className="df-j-c">
      <img src="http://img.22family.com/mySkey/loading.gif" alt="loading" />
    </div>
  )
}

export { Loadable, MyLoadingComponent }