import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) =>{
        //console.log('Returned With Results');
        try 
        {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
        
            setResults(response.data.businesses);
        
        }
        
        catch(err) 
        {
            setErrorMessage('Something went wrong');
        }
    };

    //searchApi('Pasta');
    // Calling searchApi when component first loaded/rendered
    // causes it to go on a infinity loop
    // due to it fires setResults() which causes the component to re-render
    // so, it is a BAD APPROACH

    //firing searchApi() once automatically when app loads
    useEffect(() => {
        searchApi('pasta');
    }, []);
    
    return [searchApi, results, errorMessage];

};