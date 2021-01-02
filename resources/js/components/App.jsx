import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Calendar from './Calendar'

const App = (props) => {

    const content = () => {

        switch (props.content) {

            case 'note':
                return <NoteList userId={1} />
                break;
            case 'calendar':
                return <Calendar />
                break
            case 'diary':
                return <Diary />
                break
            default:
                return <NoteList userId={1} />
                break
        }

    }

    return (
        <>
            <header id="header" className="l-header">
                <div className="l-header__inner">
                    <h1 className="c-heading--large">lifenote</h1>
                    <div>
                        login/register
        </div>
                </div>
            </header>

            <main id="main" className="l-wrapper">
                <Nav />
                <div className="l-wrapper__inner">
                    {content()}
                </div>
            </main>
        </>
    )
}

const Element = document.getElementById('app');
if (Element) {
    const content = Element.getAttribute('content');
    const parsedContent = JSON.parse(content);
    ReactDOM.render(<App content={parsedContent} />, Element);
}
