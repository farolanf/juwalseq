import { observable, flow, computed } from 'mobx'

class NestedGroup {
  @observable parents = {}
  parentsLoaded = false

  constructor (fetchParentsApi, fetchChildrenApi, parentName, childrenName) {
    this.parentName = parentName
    this.childrenName = childrenName
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
  }

  @computed
  get sortedParents () {
    return Object.keys(this.parents)
      .filter(id => this.parents[id].id)
      .sort((a, b) => this.parents[a].name.localeCompare(this.parents[b].name))
      .map(id => this.parents[id])
  }

  fetchParents = flow(function* () {
    if (this.parentsLoaded) return
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
    this.parents = _.clone(this.parents)
    this.parentsLoaded = true
  })

  fetchChildren = flow(function* (parentId) {
    if (!parentId) throw new Error('Missing parentId')
    const parent = this.parents[parentId] || {}
    if (parent.children) return
    if (parent.childrenLoading) return
    parent.childrenLoading = true
    this.parents[parentId] = parent
    parent.children = yield this.fetchChildrenApi(parentId).then(res => res.data)
    Object.defineProperty(parent, _.camelCase(this.childrenName), {
      get () {
        return this.children
      }
    })
    this.parents = _.clone(this.parents)
    delete parent.childrenLoading
  })
}

export default NestedGroup