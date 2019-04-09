import NestedGroup from './NestedGroup'
import { fetchProvinsis, fetchKabupatens } from '$api/region'

export default new NestedGroup(fetchProvinsis, fetchKabupatens, 'Provinsis', 'Kabupatens')