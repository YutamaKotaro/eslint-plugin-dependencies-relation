// No error import
import {
  mysql as indirectly_mysql,
  settings as indirectly_settings,
} from '../infrastracture'

// Error import
import {
  mysql as direct_mysql,
  settings as direct_settings,
} from '../infrastracture/mysql'

indirectly_mysql()
console.log(indirectly_settings)

direct_mysql()
console.log(direct_settings)

import { mysql } from '../infrastracture'
export const repository = mysql
