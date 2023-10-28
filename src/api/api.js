import axios from "axios";

export const AddItem = async (props) => {
    console.log("after api--"+JSON.stringify (props))
    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/add_items`,
      props
    );
    return response.data;
  };

  export const DeleteItem = async (id) => {
   
    const response = await axios.delete(
      `${process.env.REACT_APP_BASEURL}/delete_item?id=${id}`
    );
    return response.data;
  };

  export const GetItem = async () => {
   
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/get_all_items`
    );
    return response.data;
  };