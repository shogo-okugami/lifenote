import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import InfiniteScroll from 'react-infinite-scroller'
import ReactLoading from 'react-loading'
import Note from './Note'

const NoteList = (props) => {

    const [index, setIndex] = useState({
        notes: [],
        page: 0,
        nextPage: 20,
    })

    const [hasMore, setHasMore] = useState(true)

    const loadMore = async (pageStart) => {

        if (hasMore) {
            try {
                const res = await fetch(`api/home?user_id=${props.userId}&page=${index.page}&nextPage=${index.nextPage}`)
                const resp = await res.json()
                if (resp.data.length > 0) {
                    setIndex({
                        notes: [...index.notes, ...resp.data],
                        page: index.page + 20,
                        nextPage: 20,
                    })
                } else {//if (resp.data.length < 1) {
                    setHasMore(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const loader = <ReactLoading key={0} type={'spokes'} color={'#444'} delay={5000} />

    const items = (
        <>
            {index.notes.map(note => {
                return (
                    <Note key={note.id} note={note} />
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

export default NoteList
