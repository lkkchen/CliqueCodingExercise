
import {saveFieldConditionMetaData} from "./field.condition.metadata"

export function FieldCondition(className: string): PropertyDecorator {
  return function(target, propertyKey) {
    saveFieldConditionMetaData(className, propertyKey.toString())
  }
}


