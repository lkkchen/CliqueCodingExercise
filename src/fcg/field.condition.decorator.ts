
import {saveFieldConditionMetaData} from "./fcg.service"

export function FieldCondition(className: string): PropertyDecorator {
  return function(target, propertyKey) {
    saveFieldConditionMetaData(className, propertyKey.toString())
  }
}


