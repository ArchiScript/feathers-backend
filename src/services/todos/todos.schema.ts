import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TodosService } from './todos.class'

// Main data model schema
export const todosSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    completed: Type.Boolean(),
    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String()),
  },
  { $id: 'Todos', additionalProperties: false }
)
export type Todos = Static<typeof todosSchema>
export const todosValidator = getValidator(todosSchema, dataValidator)
export const todosResolver = resolve<Todos, HookContext<TodosService>>({})

export const todosExternalResolver = resolve<Todos, HookContext<TodosService>>({})

// Schema for creating new entries
export const todosDataSchema = Type.Pick(todosSchema, ['text', 'completed'], {
  $id: 'TodosData'
})
export type TodosData = Static<typeof todosDataSchema>
export const todosDataValidator = getValidator(todosDataSchema, dataValidator)
export const todosDataResolver = resolve<TodosData, HookContext<TodosService>>({})

// Schema for updating existing entries
export const todosPatchSchema = Type.Partial(todosSchema, {
  $id: 'TodosPatch'
})
export type TodosPatch = Static<typeof todosPatchSchema>
export const todosPatchValidator = getValidator(todosPatchSchema, dataValidator)
export const todosPatchResolver = resolve<TodosPatch, HookContext<TodosService>>({})

// Schema for allowed query properties
export const todosQueryProperties = Type.Pick(todosSchema, [
  'id',
  'text',
  'completed',
  'created_at',
  'updated_at'
])
export const todosQuerySchema = Type.Intersect(
  [
    querySyntax(todosQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TodosQuery = Static<typeof todosQuerySchema>
export const todosQueryValidator = getValidator(todosQuerySchema, queryValidator)
export const todosQueryResolver = resolve<TodosQuery, HookContext<TodosService>>({})
