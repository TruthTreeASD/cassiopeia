import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

const createOption = label => ({
  label,
  value: label
});

class TagInput extends Component {
  state = {
    inputValue: '',
    tagsWithLabels: []
  };

  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleChange = tagsWithLabels => {
    this.setState(
      {
        tagsWithLabels
      },
      () =>
        this.props.onNewTag(
          tagsWithLabels.map(tagWithLabel => tagWithLabel.value)
        )
    );
  };

  handleKeyDown = event => {
    const { inputValue, tagsWithLabels } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!tagsWithLabels.some(tag => tag.value === inputValue)) {
          const newTagsWithLabels = [
            ...tagsWithLabels,
            createOption(inputValue)
          ];
          this.setState(
            {
              inputValue: '',
              tagsWithLabels: newTagsWithLabels
            },
            () =>
              this.props.onNewTag(
                newTagsWithLabels.map(tagWithLabel => tagWithLabel.value)
              )
          );
        } else {
          this.setState({ inputValue: '' });
        }
        event.preventDefault();
        break;
      default:
    }
  };

  render() {
    const { inputValue, tagsWithLabels } = this.state;

    return (
      <CreatableSelect
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        // inputValue="akdfjkasdlfjklajfklda"
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Tags"
        value={tagsWithLabels}
      />
    );
  }
}

export default TagInput;
