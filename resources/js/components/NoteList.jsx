import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import InfiniteScroll from 'react-infinite-scroller'
import Note from './Note'

const NoteList = (props) => {

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
                        notes: [...index.notes, ...resp.data],
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

    const loader = <div className="loader" key={0}>Loading ...</div>

    const items = (
        <>
            {index.notes.map(note => {
                return (
                    <Note note={note} />
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
    ReactDOM.render(<NoteList userId={parsedUserId} />, Element);
}
