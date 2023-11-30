import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../State/Customers/Menu/menu.action";
import { useParams } from "react-router-dom";
import { Box, Chip, InputAdornment, OutlinedInput } from "@mui/material";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../State/Customers/Restaurant/restaurant.action";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  category: Yup.string().required("Category is required"),
  imageUrl: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
  vegetarian: Yup.boolean().required("Is Vegetarian is required"),
  seasonal: Yup.boolean().required("Is Gluten Free is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must be greater than or equal to 0"),
});
const initialValues = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  imageUrl: "",
  restaurantId: "",

  vegetarian: true,
  seasonal: false,
  quantity: 0,
  ingredients: [
    {
      categoryName: "",
      ingredientName: "",
    },
  ],
};

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([
    { categoryName: "", ingredientName: "" },
  ]);
  const { restaurant } = useSelector((store) => store);
  const addIngredientField = () => {
    setIngredients([...ingredients, { categoryName: "", ingredientName: "" }]);
  };

  const removeIngredientField = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleIngredientCategoryChange = (index, event) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].categoryName = event.target.value;
    setIngredients(updatedIngredients);
  };

  const handleIngredientChange = (index, event) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredientName = event.target.value
    setIngredients(updatedIngredients);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = id;
      values.ingredients = ingredients;
      dispatch(createMenuItem(values));
      alert("Menu Item Created Successfully!")
      console.log("values ----- ", values); // Replace this with your form submission code
    },
  });

  useEffect(() => {
    dispatch(getRestaurantsCategory(id));
  }, [id]);

  return (
    <>
      <div className="lg:px-32 px-5 lg:flex  justify-center min-h-screen items-center pb-5">
        <div>
          <h1 className="font-bold text-2xl text-center py-2">
            Add New Menu Item
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="categoryId">Food Category</InputLabel>
                  <Select
                    id="categoryId"
                    name="categoryId"
                    label="Food Category"
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                  >
                    {restaurant.categories.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="flex items-center space-x-5" item xs={12}>
                <h2>Ingredients</h2>
                <Button color="primary" onClick={addIngredientField}>
                  Add
                </Button>
              </Grid>

              {ingredients.map((ingredient, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      name={`ingredients[${index}].categoryName`}
                      label="Category"
                      variant="outlined"
                      value={ingredient.categoryName}
                      onChange={(event) => handleIngredientCategoryChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      name={`ingredients[${index}].ingredientName`}
                      label="Ingredients"
                      variant="outlined"
                      value={ingredient.ingredientName}
                      onChange={(event) => handleIngredientChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => removeIngredientField(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="imageUrl"
                  name="imageUrl"
                  label="Image URL"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.imageUrl}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="vegetarian">Is Vegetarian</InputLabel>
                  <Select
                    id="vegetarian"
                    name="vegetarian"
                    label="Is Vegetarian"
                    onChange={formik.handleChange}
                    value={formik.values.vegetarian}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="seasonal">Is Seasonal</InputLabel>
                  <Select
                    id="seasonal"
                    name="seasonal"
                    label="Is Seasonal"
                    onChange={formik.handleChange}
                    value={formik.values.seasonal}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="isVegan">Is Vegan</InputLabel>
                <Select
                  id="isVegan"
                  name="isVegan"
                  label="Is Vegan"
                  onChange={formik.handleChange}
                  value={formik.values.isVegan}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Create Menu Item
            </Button>
          </form>
        </div>
      </div>

      {/* <div className="lg:px-32 lg:flex  justify-center min-h-screen items-center">
        <div>
          <h1 className="font-bold text-2xl text-center py-2">
            Add New Menu Item
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>Ingredients</h2>
              </Grid>
              {ingredients.map((ingredient, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      name={`ingredients[${index}].category`}
                      label="Category"
                      variant="outlined"
                      value={ingredient.category}
                onChange={(event) => handleCategoryChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      name={`ingredients[${index}].items`}
                      label="Ingredients"
                      variant="outlined"
                      value={ingredient.items.join(',')}
                      onChange={(event) => handleItemsChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => removeIngredientField(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={2}>
                <Button color="primary" onClick={addIngredientField}>
                  Add
                </Button>
              </Grid>

              <Grid>
                <Button type="submit">Submit</Button>
              </Grid>
            
            </Grid>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default AddMenuForm;
