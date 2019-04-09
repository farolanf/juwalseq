import { observable, flow, computed } from 'mobx'
import { fetchProvinsis, fetchKabupatens } from '$api/region'

class RegionStore {
  @observable provinsis = {}

  @computed
  get sortedProvinsis () {
    return Object.keys(this.provinsis)
      .filter(id => this.provinsis[id].id)
      .sort((a, b) => this.provinsis[a].name.localeCompare(this.provinsis[b].name))
      .map(id => this.provinsis[id])
  }

  fetchProvinsis = _.debounce(flow(function* () {
    const provinsis = yield fetchProvinsis().then(res => res.data)
    _.each(provinsis, provinsi => {
      if (this.provinsis[provinsi.id]) {
        this.provinsis[provinsi.id] = {
          ...this.provinsis[provinsi.id],
          ...provinsi,
        }
      } else {
        this.provinsis[provinsi.id] = provinsi
      }
    })
    this.provinsis = _.clone(this.provinsis)
  }), 300)

  fetchKabupatens = _.debounce(flow(function* (provinsiId) {
    const provinsi = this.provinsis[provinsiId] || {}
    if (provinsi.kabupatens) return
    provinsi.kabupatens = yield fetchKabupatens(provinsiId).then(res => res.data)
    this.provinsis[provinsiId] = provinsi
    this.provinsis = _.clone(this.provinsis)
  }), 300)
}

export default RegionStore