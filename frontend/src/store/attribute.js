import NestedGroup from './NestedGroup'
import { fetchAttributes, fetchAttributeValues } from '$api/attribute'

export default new NestedGroup(fetchAttributes, fetchAttributeValues, 'Attributes', 'AttributeValues')