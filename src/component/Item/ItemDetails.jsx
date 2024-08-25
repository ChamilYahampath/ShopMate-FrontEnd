
import { Divider, Drawer, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, {useState} from 'react';
import ItemCard from './ItemCard';
import ItemCards from './ItemCards';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllItems } from '../State/Item/Action';
import { useNavigate } from 'react-router-dom';
import { categories } from '../State/Category/Reducer';
import {item} from '../State/Item/Reducer';
import { getAllCategories } from '../State/Category/Action';



const ItemDetails = () => {
    const {item} = useSelector((store) => store);
    const [items, setItems] = useState(item);
    const {category} = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const [categorizedItems, setCategorizeItems] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleFilter = (e) => {
        console.log("*******************"+ e.target.value+"--"+e.target.name)
        setSelectedCategory(e.target.value);
    }

    const filteredItems = selectedCategory === 'all'
    ? item.items
    : item.items.filter(item => item.itemCategory.name === selectedCategory);

    useEffect(() => {
        dispatch(getAllItems(jwt));
        console.log("selector items --"+item);
    },[]);

    useEffect(() => {
        dispatch(getAllCategories(jwt));
    },[]);

    return (
        <div>
        <div className="pt-[2rem] lg:flex relative lg:pl-5 lg:pr-5">
            <div className="space-y-10 lg:w-[20%] filter">
                <div className="box space-y-5 lg:sticky">
                    <div>
                        <Typography variant="h5" sx={{paddingBottom:"1rem"}}>Category</Typography>
                        <FormControl className="py-10 space-y-5" component={"fieldset"}>                            
                            <RadioGroup onChange={handleFilter} name="Category">
                                {category.categories.map((item) => (
                                    <FormControlLabel key={item.id} value={item.name} control={<Radio />} label={item.name} />
                                ))}
                                <FormControlLabel key="all" value="all" control={<Radio />} label="All" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            <Divider orientation='vertical' flexItem sx={{height: '100vh'}}/>
            <div className="space-y-5 lg:w-[80%] lg:pl-10">
                {filteredItems.map((item) => <ItemCards key={item.id} item={item}/>)}
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default ItemDetails;