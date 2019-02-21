import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import TimeSeriesChart from './TimeSeriesChart';
import '../../styles/TimeSeries.css';

//   { src: '1',altText: 'Slide 1',caption: 'Slide 1' }

const items = [
  { src: 'Att1' },
  { src: 'Att2' },
  { src: 'Att3' },
  { src: 'Att4' }
];

class CarouselTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [
        { year: '1967', location1: 400, location2: 1200, location0: 200 },
        { year: '1969', location1: 200, location2: 2400, location0: 100 },
        { year: '1971', location1: 700, location2: 2000, location0: 50 },
        { year: '1973', location1: 300, location2: 3000, location0: 25 },
        { year: '1975', location1: 300, location2: 3000, location0: 25 },
        { year: '1977', location1: 300, location2: 3000, location0: 25 },
        { year: '1979', location1: 300, location2: 3000, location0: 25 },
        { year: '1981', location1: 300, location2: 3000, location0: 25 },
        { year: '1983', location1: 300, location2: 3000, location0: 25 },
        { year: '1985', location1: 300, location2: 3000, location0: 25 },
        { year: '1987', location1: 300, location2: 3000, location0: 25 },
        { year: '1989', location1: 300, location2: 3000, location0: 25 }
      ]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          className="CarouselItem"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <TimeSeriesChart data={this.state.data} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          className="CarouselControl"
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          className="CarouselControl"
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default CarouselTest;
