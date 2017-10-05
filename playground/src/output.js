import React from 'react';
import './output.css';
export default class AwesomeComponent extends React.Component{
  render(){
      return (<div className="row">
              {/*Grid column*/}
              <div className="column">
                {/*Card*/}
                <div className="card">
                  {/*Background color*/}
                  <div className="card-up">
                  </div>
                  {/*Avatar*/}
                  <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" className="rounded-circle" />
                  </div>
                  <div className="card-body">
                    {/*Name*/}
                    <h4 className="card-title">John Doe</h4>
                    <hr />
                    {/*Quotation*/}
                    <p><i className="fa fa-quote-left" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci.</p>
                  </div>
                </div>
                {/*Card*/}
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="column">
                {/*Card*/}
                <div className="card">
                  {/*Background color*/}
                  <div className="card-up">
                  </div>
                  {/*Avatar*/}
                  <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" className="rounded-circle" />
                  </div>
                  <div className="card-body">
                    {/*Name*/}
                    <h4 className="card-title">Anna Aston</h4>
                    <hr />
                    {/*Quotation*/}
                    <p><i className="fa fa-quote-left" /> Neque cupiditate assumenda in maiores repudiandae mollitia architecto.</p>
                  </div>
                </div>
                {/*Card*/}
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="column">
                {/*Card*/}
                <div className="card">
                  {/*Background color*/}
                  <div className="card-up" />
                  {/*Avatar*/}
                  <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="rounded-circle" />
                  </div>
                  <div className="card-body">
                    {/*Name*/}
                    <h4 className="card-title">Maria Kate</h4>
                    <hr />
                    {/*Quotation*/}
                    <p><i className="fa fa-quote-left" /> Delectus impedit saepe officiis ab aliquam repellat, rem totam unde ducimus.</p>
                  </div>
                </div>
                {/*Card*/}
              </div>
              {/*Grid column*/}
            </div>)
  }

};