// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Todos, TodosData, TodosPatch, TodosQuery } from './todos.schema'

export type { Todos, TodosData, TodosPatch, TodosQuery }

export interface TodosParams extends KnexAdapterParams<TodosQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TodosService<ServiceParams extends Params = TodosParams> extends KnexService<
  Todos,
  TodosData,
  TodosParams,
  TodosPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'todos'
  }
}
