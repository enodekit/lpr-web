<template>
  <div class="nk-header">
    <nav class="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-white-text-on-top nk-navbar-solid">
      <div class="container">
        <div class="nk-nav-table">
          <a href="/" class="nk-nav-logo">
            <img src="../../assets/images/logo.jpg" alt="" width="45" style="margin:20px 0">
          </a>
          <el-menu :default-active="$route.path" router class="el-menu-demo" style="float:right;" mode="horizontal"><!--@select="handleSelect"-->
            <el-menu-item index="/">Home</el-menu-item>
            <el-submenu index="2">
              <template slot="title">Products</template>
              <div v-for="pc in productCs" :key="pc.value">
                <el-menu-item v-if="pc.children===undefined" :index="resolvePath(pc.value)">{{ pc.label }}</el-menu-item>
                <el-submenu v-if="pc.children!=undefined" index="2-2">
                  <template slot="title">{{ pc.label }}</template>
                  <el-menu-item v-for="child in pc.children" :key="child.value" :index="resolvePath(child.value)">{{ child.label }}</el-menu-item>
                </el-submenu>
              </div>
            </el-submenu>
            <!--<el-submenu index="3">-->
            <!--<template slot="title">Company Profile</template>-->
            <!--<el-menu-item index="3-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="3-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="3-3">选项3</el-menu-item>-->
            <!--</el-submenu>-->
            <el-menu-item index="4">Contacs</el-menu-item>
          </el-menu>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'
import { list } from '@/api/productClasss'
export default {
  components: {
    // Breadcrumb,
    // Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // LangSelect,
    // Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  data() {
    return {
      activeIndex: '1',
      productCs: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getList() {
      list({ status: true }).then(response => {
        const datas = response.data.rows
        const productC = []
        datas.forEach(item => {
          if (item.father === undefined || item.father == null) {
            const v = this.recurTree(item)
            if (v)productC.push(v)
          }
        })
        this.productCs = productC
        // console.log(this.productCs)
      })
    },
    recurTree(data) { // 重新解析树,把空结尾的树枝去掉
      if (data.children.length > 0) {
        const t = []
        let d = {}
        d.value = data._id
        d.label = data.name
        data.children.forEach(item => {
          const v = this.recurTree(item)
          if (v)t.push(v)
        })
        if (t.length > 0) {
          d.children = t
        } else {
          d = null
        }
        return d
      } else {
        return { label: data.name, value: data._id }
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resolvePath(routePath) {
      return '/products/' + routePath
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
