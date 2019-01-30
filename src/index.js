/**
 * Created by christian.lorenz.hh@gmail.com on 17.09.18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SmartPicture extends Component {
    constructor(props) {
        super(props);

        this.pivotToCenter = (props.pivotToCenter) ? props.pivotToCenter : false;
        this.position = (props.position) ? props.position : "relative";

        this.containerElement = React.createRef();
        this.imgElement = React.createRef();

        this.currentContainerWidth = this.currentContainerHeight = 0;
        this.forceResize = false;

        this.startLoop = this.startLoop.bind(this);
        this.checkChanges = this.checkChanges.bind(this);
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.frameId);
    }

    startLoop() {
        this.forceResize = true;

        if (!this.frameId) {
            this.frameId = window.requestAnimationFrame(this.checkChanges);
        }
    }

    checkChanges() {
        let containerWidth = this.containerElement.current.clientWidth;
        let containerHeight = this.containerElement.current.clientHeight;

        if (this.imgElement.current.complete && (containerWidth !== this.currentContainerWidth
            || containerHeight !== this.currentContainerHeight || this.forceResize)
        ) {
            this.resizeImage();
            this.forceResize = false;
            this.currentContainerWidth = containerWidth;
            this.currentContainerHeight = containerHeight;
        }

        this.frameId = window.requestAnimationFrame(this.checkChanges)
    }

    resizeImage() {
        let cX, cY, ratio, xOffset, yOffset, newImageWidth, newImageHeight;

        let containerWidth = this.containerElement.current.clientWidth;
        let containerHeight = this.containerElement.current.clientHeight;
        let imageWidth = this.imgElement.current.clientWidth;
        let imageHeight = this.imgElement.current.clientHeight;
        let ratioX = containerWidth / imageWidth;
        let ratioY = containerHeight / imageHeight;

        ratio = (ratioX > ratioY) ? ratioX : ratioY;
        newImageWidth = Math.ceil(imageWidth * ratio);
        newImageHeight = Math.ceil(imageHeight * ratio);

        if (this.pivotToCenter) {
            cX = (this.props.focus && this.props.focus.x) ? (1 + this.props.focus.x) / 2 : 0.5;
            cY = (this.props.focus && this.props.focus.y) ? (1 - this.props.focus.y) / 2 : 0.5;
        } else {
            cX = (this.props.focus && this.props.focus.x) ? this.props.focus.x : 0.5;
            cY = (this.props.focus && this.props.focus.y) ? this.props.focus.y : 0;
        }

        xOffset = (containerWidth - newImageWidth) * cX;
        yOffset = (containerHeight - newImageHeight) * cY;

        this.imgElement.current.style.left = xOffset + "px";
        this.imgElement.current.style.top = yOffset + "px";
        this.imgElement.current.style.width = newImageWidth + "px";

        if (this.props.onResize) {
            this.props.onResize(this);
        }
    }

    render() {
        if (this.props.sources) {
            return (
                <div ref={this.containerElement} id={this.props.id} className={this.props.containerClassName}
                     style={{position: this.position, "overflow": "hidden"}}>
                    <picture>
                        {this.props.sources.map(( item, index) => (
                            <source key={index}
                                    media={"(" + item.media + ")"}
                                    srcSet={item.srcSet}
                            />
                        ))}
                        <img
                            style={{position: "absolute", verticalAlign: "top"}}
                            ref={this.imgElement}
                            src={this.props.src}
                            alt={this.props.alt}
                            onLoad={this.startLoop}
                        />
                    </picture>
                </div>
            );
        } else {
            return (
                <div ref={this.containerElement} id={this.props.id} style={{position: this.position, "overflow": "hidden"}}
                     className={this.props.containerClassName}>
                    <img onLoad={this.startLoop}
                         ref={this.imgElement}
                         style={{position: "absolute"}}
                         src={this.props.src}
                         alt={this.props.alt}
                    />
                </div>
            );
        }
    }
}

SmartPicture.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    position: PropTypes.string,
    containerClassName: PropTypes.string,
    sources: PropTypes.array,
    onResize: PropTypes.func,
    pivotToCenter: PropTypes.bool
};

export default SmartPicture;