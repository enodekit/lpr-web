/**
 * Created by lifeng on 19/03/21.
 * 这是一个用于敏捷开发的简单route生成器
 * 旨在将统一模式的rest api结构CRUD 统一生成路由
 */
const express = require('express')
const asyncHandler = require('express-async-handler')

module.exports = class GeneratorRoute {
  constructor(name, ctrl) {
    if (typeof ctrl !== 'object') {
      throw new Error('传入的controller参数错误')
    }
    this.name = name
    this.ctrl = ctrl
    this.needCtrl = []
    this.router = express.Router()
  }

  listRoute() {
    this.needCtrl.push(this.ctrl.list)
    this.router.route('/').get(asyncHandler(async(req, res) => {
      req.query.creator = req.user._id
      const list = await this.ctrl.list(req.query)
      res.json(list)
    }))
  }

  insertRoute() {
    this.needCtrl.push(this.ctrl.insert)
    this.router.route('/').post(asyncHandler(async(req, res) => {
      req.body.creator = req.user
      const model = await this.ctrl.insert(req.body)
      res.json(model)
    }))
  }

  deletesRoute() {
    this.needCtrl.push(this.ctrl.removes)
    this.router.route('/').delete(asyncHandler(async(req, res) => {
      await this.ctrl.removes(req.body)
      res.json({ message: 'complete' })
    }))
  }

  getOneRoute() {
    this.router.route('/:id').get((req, res) => {
      res.json(req.useModel)
    })
  }

  updateOneRoute() {
    this.needCtrl.push(this.ctrl.update)
    this.router.route('/:id').put(asyncHandler(async(req, res) => {
      const model = this.ctrl.update(req.useModel, req.body)
      res.json(model)
    }
    ))
  }

  deleteOneRoute() {
    this.needCtrl.push(this.ctrl.remove)
    this.router.route('/:id').delete(asyncHandler(async(req, res) => {
      if (req.useModel != null) await this.ctrl.remove(req.useModel)
      res.json(req.useModel)
    }))
  }

  paramId() {
    this.needCtrl.push(this.ctrl.getById)
    this.router.param('id', asyncHandler(async(req, res, next, id) => {
      req.useModel = await this.ctrl.getById(id)
      next()
    }))
  }

  /**
   * 放在所有路由之前
   */
  addBeforeRoute() {

  }
  /**
   * 放在/ 路由之后 /:id路由之前
   */
  addRoute() {

  }

  /**
   * 放在所有路由之后
   */
  addAfterRoute() {

  }

  /**
   * 添加新的Param解析
   */
  addParam() {

  }
  build() {
    this.addBeforeRoute()
    this.listRoute()
    this.insertRoute()
    this.deletesRoute()
    this.addRoute()
    this.getOneRoute()
    this.updateOneRoute()
    this.deleteOneRoute()
    this.addAfterRoute()
    this.addParam()
    this.paramId()
    this.needCtrl.map(ctrl => {
      if (ctrl == null || typeof ctrl !== 'function') {
        throw new Error('您传入的controller函数中没有包含所有我需要的函数。请确认传入函数里是否有list.insert,removes,update,remove,getById')
      }
    })
  }
}
