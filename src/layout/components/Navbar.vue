<template>
  <div class="nk-header">
    <nav class="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-white-text-on-top nk-navbar-solid">
      <div class="nk-nav-table">
        <h2 style="font-family: 'Microsoft YaHei';text-align: center;padding:30px 0px 15px;font-size:2.8em">NINGBO TONSIN CRAFTS COMPANY LIMITED.</h2>
      </div>
      <div class="nk-nav-table_bottom">
        <p class="nk-nav-table_bottom_p">
          <i class="icondasha iconcss iconfont project_icon" />
          Rich experience
        </p>
        <p class="nk-nav-table_bottom_p">
          <i class="icondamuzhi iconcss iconfont project_icon" />
          OEM/ODM Service
        </p>
        <p class="nk-nav-table_bottom_p">
          <i class="iconxiaoshi iconcss iconfont project_icon" />
          24-hours online service
        </p>
      </div>
      <div style="clear: both;" />
      <div style="background-color:#545c64">
        <div style="width: 70%;margin:0 auto">
          <el-menu
            :default-active="$route.path"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            mode="horizontal"
          >
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
            <el-menu-item index="/">Company Profile</el-menu-item>
            <el-menu-item index="/">Contacs</el-menu-item>
            <el-menu-item index="/">Video</el-menu-item>
            <el-menu-item index="/">Feeds</el-menu-item>
            <div style="float:right;width: 20%;line-height:60px;" class="el-div-input">
              <el-input slot="prepend" v-model="input" size="mini" prefix-icon="el-icon-search" placeholder="Please" />
            </div>
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

.nk-nav-table_bottom{
  margin: auto;
  width: 50%;
  text-align: center;
}
.nk-nav-table_bottom_p{
  width:33%;
  float: left;
  font-size: 18px;
  font-weight: 400
}
.project_icon{
  color:#bc6c6c;
  font-weight: 400;
  font-size:22px;
  margin-right:5px
}
</style>
