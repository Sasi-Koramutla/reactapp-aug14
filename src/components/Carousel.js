import React, { Component} from 'react';
import Img1 from "./Img1.jpg";
import Img2 from "./img2.jpg";
import Img3 from "./img3.jpg";
import Img4 from "./img4.jpg";

const baseURL = process.env.REACT_APP_BACKEND_URL  || "http://localhost:3003" ;
var imageId = 1;
export default class Carousel extends Component {
    state = {
        baseURL: baseURL,
        img: Img1
      }

      nextClick = (event)=> {
        event.preventDefault();   
        console.log("here");
        if (imageId < 4)
        {
          imageId+=1;
        }
            
        else
        imageId=1;

        switch(imageId){
          case 1:return this.setState({img:Img1}); 
          case 2:return this.setState({img:Img2});
          case 3:return this.setState({img:Img3});
          case 4:return this.setState({img:Img4});
        }
    
      }
      
      //carousel prev button click function
      prevClick = (event)=> {
        event.preventDefault();
        if (imageId > 1)
        imageId-=1;
      
        else
        imageId=4;
      
        switch(imageId){
          case 1:return this.setState({img:Img1}); 
          case 2:return this.setState({img:Img2});
          case 3:return this.setState({img:Img3});
          case 4:return this.setState({img:Img4});
        }
      
      }

    render() {
      return (
        <div>
          <div className="carousel">

            <img className="img-carousel" src={this.state.img} alt="img"/>

            <button id="prev" onClick={this.prevClick}>&#10094;</button>
            <button id="next" onClick={this.nextClick}>&#10095;</button>
            </div>
        </div>
      )
    }
  }