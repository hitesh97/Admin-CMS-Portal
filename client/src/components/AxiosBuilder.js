import axios from 'axios';

class AxiosBuilder {
  constructor(params) {
    // axios params for ajax call
    this.params = params;
  }

  callAxios(params,callback) {  
    // axios params for ajax call
    this.params = params;
    // Send a request
    axios({
      method: this.params.method,
      url: this.params.url,
      data: this.params.payload
    })    
    .then((result) => {
      callback(result.data);      
    });    
  }
  
}

export default AxiosBuilder;