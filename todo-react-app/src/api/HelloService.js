import axios from 'axios';

class HelloService{
   

    executeHelloService(name){        
        return axios.get(`http://localhost:8080/hello/${name}`
    
        );
    }
}

export default new HelloService();