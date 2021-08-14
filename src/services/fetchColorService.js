import { axiosWithAuth } from '../helpers/axiosWithAuth';

const fetchColorService = (setColors) => {
    console.log('fetching');
    axiosWithAuth()
        .get("/colors")
        .then(res => {
            setColors(res.data);
        })
        .catch(err => {
            console.log("unable to fetch color palette at this time. Please try again later", err);
        })
}

export default fetchColorService;