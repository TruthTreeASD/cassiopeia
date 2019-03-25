export const TYPE_CODE = {
  0: 'states',
  1: 'counties',
  2: 'cities'
};

export const getSuggestionLabel = suggestion => {
  let label = suggestion.name;
  const parent = suggestion.parent;
  label += !parent
    ? ''
    : !parent.parent
    ? `, ${parent.name}`
    : `, ${parent.name}, ${parent.parent.name}`;
  return label;
};

export const getSuggestionUrl = suggestion => {
  const url = `/explore/${
    TYPE_CODE[suggestion.typeCode]
  }/${suggestion.name.toLowerCase().replace(' ', '-')}/${suggestion.id}`;
  return url;
};
