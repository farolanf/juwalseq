import { observable, flow, computed } from 'mobx'
import pluralize from 'pluralize'

class NestedGroup {
  @observable parents = {}
  parentsLoaded = false
  parentsLoading = false

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
    this[`get${pluralize.singular(childrenName)}`] = (parentId, childId) => {
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

  fetchChildren = flow(function* (parentId) {
    if (!parentId) throw new Error('Missing parentId')
    if (!this.parents[parentId]) {
      this.parents[parentId] = {}
    }
    if (this.parents[parentId].children || this.parents[parentId].childrenLoading) return
    this.parents[parentId].childrenLoading = true
    this.parents[parentId].children = yield this.fetchChildrenApi(parentId).then(res => res.data)
    Object.defineProperty(this.parents[parentId], _.camelCase(this.childrenName), {
      get () {
        return this.children
      }
    })
    this.parents[parentId].childrenLoading = false
  })
}

export default NestedGroup