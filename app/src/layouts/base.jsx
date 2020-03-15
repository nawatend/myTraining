import React from 'react';
import Nav from '../components/Nav'
import Header from '../components/Header'


const BaseLayout = (Page) => {

    return () => (
        <div className="App main__app">

            <Header />
            <main className="main__content">
                
                <Page />
            </main>
            <Nav />
        </div>
    )

}

BaseLayout.displayName = "Base Layout"
export default BaseLayout