# react-smartpicture

Crop images with a focuspoint for reactJs.

## Features
* Automatically resizes and centers an images to fit in a container
* Uses coordinates to ensure a part of an image is always shown (like a face)
* Reacts on src changes and changes in size of the container (not screen resizes)
* Offers callback when images is loaded and resized
* Works with picture element for media optimized sources
* No jQuery required

## How it works
SmartPicture creates a container div and puts an image or picture (depending on sources are used) inside it.

The prop "containerClassName" specifies the className of the container div where the dimensions should be written.

## Examples
The examples use an image-container css class which might look like: 

    .image-container {
        width: 300px;
        height: 100px; 
    }

#### Basic Example
    import SmartPicture from 'react-smartpicture';
    
    ...

    <SmartPicture
        src="/path/to/my/image.jpg"
        containerClassName="image-container"
        alt="my image"
        focus={{x: 0.8, y: 0.3}} />
            
#### Full example with callback
    import SmartPicture from 'react-smartpicture';
    
    constructor(props) {
        super(props);
        
        ...
        
        this.sources = [
            {   
                media: "min-width: 640px",
                srcSet: "/myimage-large.jpg 1x, /myimage-large@2x.jpg 2x"
            },
            {   
                media: "min-width: 320px",
                srcSet: "/myimage-small.jpg 1x, /myimage-small@2x.jpg 2x"
            }
        ];
    }
     
     ...
     
     function onResize(el) {
        console.log("image is ready", el);
     }
     
     ...
     
     <SmartPicture
             src="/path/to/my/image.jpg"
             sources={this.sources}
             containerClassName="image-container"
             alt="my image"
             id="myImageContainer"
             pivotToCenter={true}
             position="absolute"
             onResize={this.onResize.bind(this)}
             focus={{x: 0.5, y: -0.5}} />
             
             
## Properties

| Property | Type | Description | 
| ---------|------|------|
| src  | string, required | source of the image, used as \<img src="" />, for picture elements this is the default fallback src   |
| alt  | string, recommended | alt text of the image |
| id  | string | adds the attribute id to the container div |
| focus  | Object with x and y | By default, x=0 is on the left border of the image, 1 on the right and 0.5 in the center - y=0 is on the top and 1 is on the bottom. If focus is not set it defaults to the center of the image|
| pivotToCenter  | boolean, default: false | converts the coordinates, that x:0, y:0 is in the center of the image, x:-1, y:1 is on left-top and x:1, y:-1 right-bottom  |
| sources  | array | sets the sources used for optimized media handling, see this.sources in full example |
| position  | string | By default, the container div is set to "position: relative" by inline css. In some cases it may be useful to set it f.e. to "absolute". Also "relative" seems to have an issue with full-screen images (height: 100vh) as it renders the image 1px too short in height. Setting position to "absolute" fixes this.|
| onResize  | function | used as callback when image is ready (loaded and resized). As the image "jumps" after loading to get resized and centered, this is useful for overlays / hiding the image until it's ready |