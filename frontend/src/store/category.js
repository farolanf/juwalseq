import NestedGroup from './NestedGroup'
import { fetchDepartments, fetchCategories } from '$api/category'

export default new NestedGroup(fetchDepartments, fetchCategories, 'Departments', 'Categories')