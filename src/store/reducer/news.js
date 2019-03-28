
//定义reducer：用switch来匹配发出的操作信息并改变state

let news = (state, action) => {
  if (typeof state === 'undefined') {
    return {
      news: [],
      page: {}
    };
  }
  switch (action.type) {
    case 'add':
      let { news, page } = action.value;
      news = state.news.concat(news)
      return { news, page }
    case 'set':
      return action.value
    default:
      return state
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    page: state.news.page
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add(value) {
      dispatch({ type: 'add', value });
    },
    set(value) {
      dispatch({ type: 'set', value })
    }
  };
}
export { news, mapStateToProps, mapDispatchToProps }