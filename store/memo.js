export const state = () => ({
  memo: [],
  page: 0
})

export const mutations = {

  insert: function (state, obj) {
    var d = new Date()
    var fmt = d.getFullYear() + '-' + (d.getMonth() + 1)
      + '-' + d.getDate() + ' ' + d.getHours() + ':'
      + d.getMinutes();
    state.memo.push({
      title: obj.title,
      content: obj.content,
      created: fmt
    })
  },

  set_page: function (state, p) {
    state.page = p
  }
}