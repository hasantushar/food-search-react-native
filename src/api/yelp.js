import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer DYvNLeO5hBB_g_Q-1dlTMTyceFcCzP88CAWOT0nDUWhswCjYQHI4DNT-fckRrEftNAJCEG3fmGW7aV-u0soc3n0-aVtwtgwtqPmYlVF27mn7kRF8nRL7e4boMw6HXnYx'
    }
});