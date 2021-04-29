import React, { useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ReactLoading from 'react-loading'
import NoteCard from './NoteCard'

const NoteList = ({ userId, isDark, mediaScreenL }) => {

    const [index, setIndex] = useState({
        notes: [],
        page: 0,
    })

    const [hasMore, setHasMore] = useState(true)

    const loadMore = async () => {

        if (hasMore) {
            try {
                const res = await fetch(`api/home?user_id=${userId}&page=${index.page}`)
                const resp = await res.json()
                if (resp.data.length > 0) {
                    setIndex({
                        notes: [...index.notes, ...resp.data],
                        page: index.page + 20,
                    })
                } else {
                    setHasMore(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const loader = <ReactLoading key={0} type={'spokes'} color={'#444'} delay={5000} />

    const dateRef = useRef(null)

    const items = index.notes.map((note,i) => <NoteCard key={i} userId={userId} note={note} isDark={isDark} mediaScreenL={mediaScreenL} index={i} monthlyHeading={dateRef} />)

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
