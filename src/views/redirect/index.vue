<script>
export default {
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
    console.log(this.$router)
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
