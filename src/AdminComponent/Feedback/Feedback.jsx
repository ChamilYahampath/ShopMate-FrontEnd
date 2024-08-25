import React, { useEffect, useState } from "react";
import { Card, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import {AdminFeedbackTable} from "./AdminFeedbackTable";
import { getAllFeedbacks } from '../../ApiService/Api';

const FeedbackValue=[
    {label:"1.0",value:"1"},
    {label:"2.0",value:"2"},
    {label:"3.0",value:"3"},
    {label:"4.0",value:"4"},
    {label:"5.0",value:"5"},
    {label:"All",value:"ALL"}
]

export const Feedback = () => {const [filterValue, setFilterValue] = useState("ALL"); // Default to showing all feedbacks
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllFeedbacks();
                console.log("feedbacks"+response.data);
                if (Array.isArray(response.data)) {
                    setAllFeedbacks(response.data);
                    setFilteredFeedbacks(response.data); // Initialize filtered feedbacks with all feedbacks
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (e) {
                setError(e.message || "An error occurred while fetching feedbacks");
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };
        fetchData();
    }, []);

   

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <div className='px-2'>
            <Card className='p-5'>
                <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>Feedbacks</Typography>
                <FormControl>
                    <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
                        {FeedbackValue.map((item) => (
                            <FormControlLabel
                                key={item.label}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <AdminFeedbackTable allFeedbacks={filteredFeedbacks} filterValue={filterValue} /> {/* Pass filtered feedbacks and filterValue */}
        </div>
    );
}