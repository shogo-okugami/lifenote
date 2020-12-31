import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';


const Note = (props) => {

    const [index, setIndex] = useState({
        notes: [],
        page: 0,
        nextPage: 20,
    })

    const [hasMore, setHasMore] = useState(true)

    const loadMore = async (pageStart) => {

        console.log(hasMore)
        console.log(index.page)
        console.log(index.nextPage)
        if (hasMore) {
            try {
                const res = await fetch(`api/home?user_id=${props.userId}&page=${index.page}&nextPage=${index.nextPage}`)
                const resp = await res.json()
                console.log(resp)
                if (resp.data.length > 0) {
                    setIndex({
                        notes: [...index.notes,...resp.data],
                        page: index.page + 20,
                        nextPage: 20,
                    })
                } else if (resp.data.length < 1) {
                    setHasMore(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getNoteDate = (date) => {
        let str = date.substr(0, 10)
        str = str.split('-')
        date = str.map(value => parseInt(value))
        date = new Date(date[0], date[1] - 1, date[2])
        //date = date.substr(0,16)
        return str
    }

    const loader = <div className="loader" key={0}>Loading ...</div>

    const items = (
        <>
            {index.notes.map(note => {
                return (
                    <div key={note.id} className="c-card">
                        <div className="c-card__body">
                            <div className="c-card__date">
                                <div className="c-card__date__inner">
                                    <span>{getNoteDate(note.created_at)}</span>
                                </div>
                            </div>
                            <div className="c-card__text">
                                <p>
                                    {note.text}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )

    return (
        <>
            <InfiniteScroll
                pageStart={index.page}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}>
                {items}
            </InfiniteScroll>
        </>
    )
}

const Element = document.getElementById('note');
if (Element) {
    const userId = Element.getAttribute('userId');
    const parsedUserId = JSON.parse(userId);
    ReactDOM.render(<Note userId={parsedUserId} />, Element);
}
