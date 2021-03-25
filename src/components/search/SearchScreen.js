import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/custom-hooks/useForm/useForm';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation(); //Llamo al hook para obtener el prop Location del componente router

    const { q = '' } = queryString.parse( location.search );

    const initialForm = {
        searchText: q
    };
    
    const [ formValues, handleInputChange ] = useForm( initialForm );
    
    const { searchText } = formValues;

    const heroFiltered = useMemo( () => getHeroesByName( q ), [ q ]);

    const handleSearch = (e) => {

        e.preventDefault();
        history.push(`?q=${ searchText }`);

    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search</h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input
                            autoCapitalize="off"
                            type="text"
                            placeholder="Write a hero"
                            className="form-control"
                            name="searchText"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"    
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    { 
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search
                            </div>
                    }
                    { 
                        (q !== '' && heroFiltered.length === 0 )
                            &&
                            <div className="alert alert-danger">
                                There is no a hero whit { q }
                            </div>
                    }
                        {
                            heroFiltered.map( hero => (
                                <HeroCard 
                                    key={ hero.id }
                                    { ...hero }
                                />
                            ))
                        }
                </div>
            </div>
        </div>
    )
}
