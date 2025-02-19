import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

console.log("token",token)
export const SigunUpUser = async ({email, password}:any) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fullstack-crup-app-node-react-api.vercel.app/api/users/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ email, password })
    };
    
    const response = await axios.request(config);

    return response.data;
  } catch (error:any) {
    return error;
  }
};

export const SignInUser = async ({email, password}:any) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fullstack-crup-app-node-react-api.vercel.app/api/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ email, password })
    };
    
    const response = await axios.request(config);
    return response.data;
  } catch (error:any) {
    console.error('API Request Error:', error.response ? error.response.data : error.message);
    return error;
  }
};


export const Getalltasks = async (params:any) => {
  try {
    const config = {
      method: 'get',
      url: 'https://fullstack-crup-app-node-react-api.vercel.app/api/v1/tasks/getalltasks',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Replace with actual token securely
      },
      params: params, // Dynamically set parameters
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async (taskdetails:any, status = "pending") => {

  try {
    const data = JSON.stringify({
      title:taskdetails.title,
      status:taskdetails.completed,
      description:"new",
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fullstack-crup-app-node-react-api.vercel.app/api/v1/tasks/taskcreate',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      data,
    };

    const response = await axios.request(config);
    return response.data;

  } catch (error) {
    return error
  }
};

export const DeleteTask = async (taskId:string) => {  // taskId as a parameter
  try {
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://fullstack-crup-app-node-react-api.vercel.app/api/v1/tasks/deletetask/${taskId}`, // Use template literal for dynamic URL
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.request(config);
    return response.data;

  } catch (error) {
   return error
  
  }
};

export const updateTaskStatus = async (taskId:any, status:string) => {
  try {
    const data = JSON.stringify({
      status: status,
    });

    const config = {
      method: 'post', // or 'put' if your API uses PUT for updates
      maxBodyLength: Infinity,
      url: `https://fullstack-crup-app-node-react-api.vercel.app/api/v1/tasks/taskupdate/${taskId}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;

  } catch (error) {
   return error
  }
};



