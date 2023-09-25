import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';



const CreateCategory = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
 
  const [formData, setFormData] = useState({
    categoryName: '',
    restaurantId: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data={
        name:formData.categoryName,
        restaurant:{
            id
        }
    }
    dispatch(createCategoryAction(data))
    alert("Added Category!")
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='lg:px-20 flex items-center justify-center min-h-screen'>
        <Card className='p-5'>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
      <TextField
        label="Category Name"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Restaurant Id"
        name="restaurantName"
        value={id}
        onChange={handleInputChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Card>
    </div>
  );
};

export default CreateCategory;
