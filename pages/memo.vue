<template>
  <section class="container">
    <h1>memo</h1>
    <table>
      <tr>
        <th>Title</th>
        <td>
          <input type="text" name="title" v-model="title" @focus="set_flg">
          <button @click="find">find</button>
        </td>
      </tr>
      <tr>
        <th>Memo</th>
        <td>
          <textarea name="content" id cols="30" rows="10" v-model="content"></textarea>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="insert">save</button>
        </td>
      </tr>
    </table>

    <hr>

    <ul>
      <li v-for="item in page_items">
        <span @click="select(item)">{{item.title}} ( {{item.created}} )</span>
      </li>
    </ul>

    <hr>

    <div>
      <span @click="prev">prev</span> |
      <span @click="next">next</span>
    </div>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      content: '',
      num_per_page: 7,
      find_flg: false,
      sel_flg: false
    }
  },
  computed: {
    memo: function() {
      return this.$store.state.memo.memo
    },
    page_items: function() {
      if (this.find_flg) {
        var arr = []
        var data = this.$store.state.memo.memo
        data.forEach(element => {
          if (
            element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0
          ) {
            arr.push(element)
          }
        })
        return arr
      } else if (this.sel_flg != false) {
        return [this.sel_flg]
      } else {
        return this.$store.state.memo.memo.slice(
          this.num_per_page * this.$store.state.memo.page,
          this.num_per_page * (this.$store.state.memo.page + 1)
        )
      }
    },
    page: {
      get: function() {
        return this.$store.state.memo.page
      },
      set: function(p) {
        var pg =
          p > (this.$store.state.memo.memo.length - 1) / this.num_per_page
            ? Math.ceil(
                (this.$store.state.memo.memo.length - 1) / this.num_per_page
              ) - 1
            : p
        pg = pg < 0 ? 0 : pg
        this.$store.commit('memo/set_page', pg)
      }
    }
  },
  methods: {
    set_flg: function() {
      if (this.find_flg || this.sel_flg != false) {
        this.find_flg = false
        this.sel_flg = false
        this.title = ''
        this.content = ''
      }
    },
    insert: function() {
      this.$store.commit('memo/insert', {
        title: this.title,
        content: this.content
      })
      this.title = ''
      this.content = ''
    },
    select: function(item) {
      this.find_flg = false
      this.sel_flg = item
      this.title = item.title
      this.content = item.content
    },
    remove: function() {
      if (this.sel_flg == false) {
        return
      } else {
        this.$store.commit('memo/remove', this.sel_flg)
        this.set_flg()
      }
    },
    find: function() {
      this.sel_flg = false
      this.find_flg = true
    },
    next: function() {
      this.page++
    },
    prev: function() {
      this.page--
    }
  },
  created: function() {
    this.$store.commit('memo/set_page', 0)
  }
}
</script>

