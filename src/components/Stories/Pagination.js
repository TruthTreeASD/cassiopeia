import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PaginationComp extends Component {
  constructor() {
    super();

    // create data set of random length
    this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
      (a, i) => 'Record ' + (i + 1)
    );

    this.pageSize = 50;
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

    this.state = {
      currentPage: 0
    };
  }

  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  paginationRender() {
    const { currentPage } = this.state;
    return (
      <div className="pagination-wrapper">
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink
              onClick={e => this.handleClick(e, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>

          {[...Array(this.pagesCount)].map((page, i) => (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
            <PaginationLink
              onClick={e => this.handleClick(e, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }

  dataRender() {
    //console.log(this.dataSet);
    {
      this.dataSet
        .slice(
          this.state.currentPage * this.pageSize,
          (this.state.currentPage + 1) * this.pageSize
        )
        .map((data, i) => {
          console.log(data);
          return <div>{data}</div>;
        });
    }
  }

  render() {
    return (
      <div>
        <div>{this.dataRender()}</div>
        <div>{this.paginationRender()}</div>
      </div>
    );
  }
}
export default PaginationComp;
