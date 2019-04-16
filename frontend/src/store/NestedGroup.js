import { observable, extendObservable, flow, computed } from 'mobx'
import pluralize from 'pluralize'

class NestedGroup {
  @observable parents = {}
  @observable children = {}
  parentsLoaded = false
  parentsLoading = false

  constructor (fetchParentsApi, fetchChildrenApi, parentName, childrenName) {
    this.parentName = parentName
    this.childrenName = childrenName
    this.parentNameSingular = pluralize.singular(parentName)
    this.childrenNameSingular = pluralize.singular(childrenName)
    this.fetchParentsApi = fetchParentsApi
    this.fetchChildrenApi = fetchChildrenApi
    this[`fetch${parentName}`] = this.fetchParents
    this[`fetch${childrenName}`] = this.fetchChildren
    Object.defineProperty(this, `sorted${_.capitalize(parentName)}`, {
      get () {
        return this.sortedParents
      }
    })
    Object.defineProperty(this, _.camelCase(parentName), {
      get () {
        return this.parents
      }
    })
    Object.defineProperty(this, _.camelCase(childrenName), {
      get () {
        return this.children
      }
    })
    this[`get${this.childrenNameSingular}`] = (parentId, childId) => {
      return this.parents[parentId] && this.parents[parentId].children && this.parents[parentId].children.find(child => child.id == childId)
    }
  }

  @computed
  get sortedParents () {
    return Object.keys(this.parents)
      .filter(id => this.parents[id].id)
      .sort((a, b) => this.parents[a].name.localeCompare(this.parents[b].name))
      .map(id => this.parents[id])
  }

  fetchParents = flow(function* () {
    if (this.parentsLoaded || this.parentsLoading) return
    this.parentsLoading = true
    const parents = yield this.fetchParentsApi().then(res => res.data)
    _.each(parents, parent => {
      if (this.parents[parent.id]) {
        this.parents[parent.id] = {
          ...this.parents[parent.id],
          ...parent,
        }
      } else {
        this.parents[parent.id] = parent
      }
    })
    this.parentsLoaded = true
    this.parentsLoading = false
  })

  fetchChildren = flow(function* (parentIds) {
    if (!parentIds) throw new Error('Missing parentId')
    parentIds = _.castArray(parentIds)
    parentIds.forEach(id => {
      if (!this.parents[id]) {
        extendObservable(this.parents, { 
          [id]: {
            children: null,
            childrenLoading: false,
          },
        })
      }
    })
    parentIds = parentIds.filter(id => !this.parents[id].children && !this.parents[id].childrenLoading)
    if (!parentIds.length) return
    parentIds.forEach(id => {
      this.parents[id].childrenLoading = true 
    })
    const childrens = yield this.fetchChildrenApi(...parentIds).then(res => res.data)
    parentIds.forEach(id => {
      this.parents[id].children = childrens.filter(child => child[`${this.parentNameSingular}Id`] == id)
      extendObservable(this.parents[id], {
        [_.camelCase(this.childrenName)]: this.parents[id].children
      })
      this.parents[id].childrenLoading = false
    })
    extendObservable(this.children, childrens.reduce((obj, x) => {
      obj[x.id] = x
      return obj
    }, {}))
  })
}

export default NestedGroup