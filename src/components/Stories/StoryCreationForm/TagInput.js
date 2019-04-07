import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

const TagInput = ({
  inputValue,
  tagsWithLabels,
  onChange,
  onInputChange,
  onKeyDown
}) => (
  <CreatableSelect
    components={{ DropdownIndicator: null }}
    inputValue={inputValue}
    isClearable
    isMulti
    menuIsOpen={false}
    onChange={onChange}
    onInputChange={onInputChange}
    onKeyDown={onKeyDown}
    placeholder="Tags"
    value={tagsWithLabels}
  />
);

export default TagInput;
