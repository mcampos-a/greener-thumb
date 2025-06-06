import React, {useState} from "react";

const FormSection = ({setPlants, setMessage }) => {
    const [formData, setFormData] = useState({
        edible: '',
        pets_kids: '',
        lifespan: '',
        water_schedule: '',
        sunlight: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const shuffleArray= (array) => { //this function takes an array and swamps values 
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() //this disables the default behavier of a form submission. Since we are building with React we dont want the whole page to reload. We are managing the state.
        const params = new URLSearchParams()
        const apiUrl = `https://perenual.com/api/species-list?key=${import.meta.env.VITE_PERENUAL_API_KEY}&indoor=1${params}`;

        try{
            const response = await fetch(apiUrl);
            const data = await response.json();
            const validData = data.data.filter(item => 
                !(item.cycle.includes("Upgrade") ||
                    item.watering.includes("Upgrade") ||
                    item.sunlight.includes("Upgrade"))
            );
        } catch (err){
            
        }
    }

}

