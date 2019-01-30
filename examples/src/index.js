import React, {Component} from 'react';
import {render} from 'react-dom';
import SmartPicture from '../../src';
import './styles.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            src: "https://i.imgur.com/SOR9ZUN.jpg",
            sources: [
                {
                    media: "min-width: 640px",
                    srcSet: "https://i.imgur.com/SOR9ZUN.jpg"
                },
                {
                    media: "min-width: 320px",
                    srcSet: "https://i.imgur.com/SOR9ZUN.jpg"
                }
            ],
            focus: {x: 0.55, y: -0.15}
        };
    }

    /**
     * Simple Callback of onResize for example 3
     */
    imageIsResized() {
        this.setState({width: document.getElementById("example3").clientWidth});
        this.setState({height: document.getElementById("example3").clientHeight});
    }

    /**
     * random container sizes for example 3
     */
    resizeImage() {
        let width = Math.round(Math.random() * 400) + 50;
        let height = Math.round(Math.random() * 400) + 50;
        document.getElementById("example3").style.width = width + "px";
        document.getElementById("example3").style.height = height + "px";
    }

    /**
     * Switching the source for example 3
     */
    changeSource() {
        if (this.state.src === "https://i.imgur.com/SOR9ZUN.jpg") {
            this.setState({focus: {x: 0.25, y: 0.4}});
            this.setState({
                sources: [
                    {
                        media: "min-width: 640px",
                        srcSet: "https://i.imgur.com/k5mrdF2.png"
                    },
                    {
                        media: "min-width: 320px",
                        srcSet: "https://i.imgur.com/k5mrdF2.png"
                    }
                ]
            });
            this.setState({src: "https://i.imgur.com/k5mrdF2.png"});
        } else {
            this.setState({focus: {x: 0.55, y: -0.15}});
            this.setState({
                sources: [
                    {
                        media: "min-width: 640px",
                        srcSet: "https://i.imgur.com/SOR9ZUN.jpg"
                    },
                    {
                        media: "min-width: 320px",
                        srcSet: "https://i.imgur.com/SOR9ZUN.jpg"
                    }
                ]
            });
            this.setState({src: "https://i.imgur.com/SOR9ZUN.jpg"});
        }
    }

    render() {
        return (


            <div className="app-container">
                <div>
                    <h2>Original images</h2>
                    <img src="https://i.imgur.com/k5mrdF2.png" height="200" alt="cat"/><br />
                    <img src="https://i.imgur.com/SOR9ZUN.jpg" height="200" alt="bear"/>
                </div>
                <div>
                    <h2>Example 1</h2>
                    <SmartPicture
                        src="https://i.imgur.com/k5mrdF2.png"
                        alt="cat"
                        containerClassName="image-container"
                    />
                    <p>Basic without setting a focuspoint</p>
                </div>
                <div>
                    <h2>Example 2</h2>
                    <SmartPicture
                        src="https://i.imgur.com/SOR9ZUN.jpg"
                        alt="bear"
                        containerClassName="image-container"
                        focus={{x: 0.85, y: 0.6}}
                    />
                    <p>Setting a custom focus point</p>
                </div>
                <div>
                    <h2>Example 3</h2>
                    <p>
                        <button onClick={this.changeSource.bind(this)}>Change source</button>
                        <button onClick={this.resizeImage.bind(this)}>Resize</button>
                    </p>
                    <p>
                        {this.state.src} - {this.state.width} x {this.state.height}
                    </p>
                    <SmartPicture
                        src={this.state.src}
                        sources={this.state.sources}
                        containerClassName="image-container"
                        id="example3"
                        pivotToCenter={true}
                        focus={this.state.focus}
                        onResize={this.imageIsResized.bind(this)}
                        position="relative"
                        alt="cat or bear"
                    />
                    <p>Dynamic full example with callback</p>
                </div>
            </div>

        )
    }
}

render(<App/>, document.getElementById("root"));