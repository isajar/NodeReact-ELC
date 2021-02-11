/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchResult: []
        };
        
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        const query =  e.target.value;
        console.log('query ' + query);
        var url = 'http://localhost:3035/search';
        var data = {text: query};
        // check if the query is empty or has withespace in that case early return.
        if(query === null || query.match(/^ *$/) !== null){
            this.setState({
            searchResult: []
            });
            return;
        }
        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
            this.setState({
            searchResult: response.data
            });
            console.log(this.state.searchResult);
        })
        .catch(err => {
            console.log(err);
         });
        // Start Here
        // ...
     
  }

  
        

    

    

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
               
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div>
                        <div className="row">
                            {this.state.searchResult.map(function(item) {
                               return <div key={item._id} className="card">
                                <h3>{item.name}</h3>
                                <img src={item.picture} ></img>
                                <p className="card-price">${item.price}</p>
                                <p>{item.about}</p>
                                <p><button >Add to Cart</button></p>
                            </div>;
                            })}
                        </div>
                    </div>
                </div>
        
               
            </header>
            
        );
    }


}

// Export out the React Component
module.exports = Menu;

