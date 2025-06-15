// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  todosDataValidator,
  todosPatchValidator,
  todosQueryValidator,
  todosResolver,
  todosExternalResolver,
  todosDataResolver,
  todosPatchResolver,
  todosQueryResolver
} from './todos.schema'

import type { Application } from '../../declarations'
import { TodosService, getOptions } from './todos.class'
import { todosPath, todosMethods } from './todos.shared'

export * from './todos.class'
export * from './todos.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const todos = (app: Application) => {
  // Register our service on the Feathers application
  app.use(todosPath, new TodosService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: todosMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(todosPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(todosExternalResolver), schemaHooks.resolveResult(todosResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(todosQueryValidator), schemaHooks.resolveQuery(todosQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(todosDataValidator), schemaHooks.resolveData(todosDataResolver)],
      patch: [schemaHooks.validateData(todosPatchValidator), schemaHooks.resolveData(todosPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [todosPath]: TodosService
  }
}
