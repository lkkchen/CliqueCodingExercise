
// key: className, value = properties
export const classDataFieldMap = new Map<string,  Array<string>>;

export const saveFieldConditionMetaData = (className: string, property: string) => {
  if(!classDataFieldMap.has(className)){
    classDataFieldMap.set(className, []);
  }

  const properties = classDataFieldMap.get(className);
  if(properties.indexOf(property) === -1){
    properties.push(property);
  }

};
