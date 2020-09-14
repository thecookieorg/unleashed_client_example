import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Unleashed extends Component {
  state = {
    apiKey: '',
    apiId: '',
    isLoading: false,
    unleashedData: {},
    foundData: false
  }

  renderUnleashedContent() {
    if (this.state.foundData) {
      return (
        <div className="card bs-box mt-5">
          <div className="card-body">
            <h5 className="card-title">Your Unleashed data</h5>
            <hr />

            <p className="lead">Number of pages: {this.state.unleashedData.number_of_pages}</p>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        <ToastContainer autoClose={5000} />
        
        <div className="card bs-box">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>API Key</label>
                  <input
                    disabled={this.state.isLoading}
                    className="form-control"
                    type="text"
                    value={this.state.apiKey}
                    onChange={(event) => this.setState({apiKey: event.target.value})}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>API ID</label>
                  <input
                    disabled={this.state.isLoading}
                    className="form-control"
                    type="text"
                    value={this.state.apiid}
                    onChange={(event) => this.setState({apiId: event.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              className="btn btn-success"
              disabled={this.state.isLoading}
              onClick={() => {
                this.setState({isLoading: true});

                if (!this.state.apiKey || !this.state.apiId) {
                  toast.warning("🥴 You missed a field or two...", {
                    position: toast.POSITION.TOP_RIGHT
                  });

                  this.setState({isLoading: false});
                  
                  return;
                }

                toast.info("🥳 Unleashed data requested!", {
                  position: toast.POSITION.TOP_RIGHT
                });

                axios.get('/api/unleashed/get_some_data', {
                  params: {
                    api_key: this.state.apiKey,
                    api_id: this.state.apiId
                  }
                })
                .then((res) => {
                  toast.success("🤩 Got the data!!!", {
                    position: toast.POSITION.TOP_RIGHT
                  });

                  this.setState({
                    foundData: true,
                    unleashedData: res.data,
                    isLoading: false
                  });
                })
                .catch((err) => {
                  toast.error("😭 Something ain't working right...", {
                    position: toast.POSITION.TOP_RIGHT
                  });

                  this.setState({
                    foundData: false,
                    isLoading: false
                  });
                });
              }}
            >
              Click me
            </button>

            {
              this.state.isLoading ? (
                <div className="alert alert-primary mt-3 text-center" role="alert">
                  Please wait.... <br />
                  <strong>Running format C:\ on your computer...</strong>
                </div>
              ) : null
            }
          </div>
        </div>

        {this.renderUnleashedContent()}
      </>
    )
  }
}